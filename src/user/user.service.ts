import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstname, lastname, middlename, dob, nationality, address, email, phoneNumber, username, password, sex } = createUserDto;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists.');
    }

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.createUser({
      firstname,
      lastname,
      middlename,
      dob,
      nationality,
      address,
      email,
      phoneNumber,
      username,
      password: hashedPassword,
      sex,
    });

    return this.userRepository.saveUser(user);
  }

  async findAllUsers(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.userRepository.findAllUsers(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async viewUser(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

 
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preloadUser({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    if (updateUserDto.password) {
      user.password = await hash(updateUserDto.password, 10);
    }

    return this.userRepository.saveUser(user);
  }

  async removeUser(id: number): Promise<string> {
    const result = await this.userRepository.deleteUserById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return "User deleted successfully";
  }
}
