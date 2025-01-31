import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  createUser(user: Partial<User>): User {
    return this.userRepository.create(user);
  }

  saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAllUsers(page: number, limit: number): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });
  }

  findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  deleteUserById(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  preloadUser(user: Partial<User>): Promise<User | null> {
    return this.userRepository.preload(user);
  }
}
