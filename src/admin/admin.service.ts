import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-Admin.dto';
import { UpdateAdminDto } from './dto/update-Admin.dto';
import { AdminRepository } from './Admin.repository';
import { Admin } from './entities/Admin.entity';
import { hash } from 'bcryptjs';
import { RoleRepository } from 'src/role/Role.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository,
    private readonly roleRepository: RoleRepository,

  ) { }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { email, username, password, roles } = createAdminDto;

    if (!roles || roles.length === 0) {
      throw new ConflictException('An admin must have at least one role.');
    }

    const existingAdmin = await this.adminRepository.findAdminByEmail(email);
    if (existingAdmin) {
      throw new ConflictException('Email already exists.');
    }

    // ✅ Fetch Role entities by their IDs
    const roleEntities = await this.roleRepository.findRolesByIds(roles);
    if (roleEntities.length !== roles.length) {
      throw new NotFoundException('One or more roles do not exist.');
    }

    const hashedPassword = await hash(password, 10);

    const admin = this.adminRepository.createAdmin({
      email,
      username,
      password: hashedPassword,
      roles: roleEntities  // ✅ Assign role entities instead of IDs
    });

    return this.adminRepository.saveAdmin(admin);
  }


  async findAllAdmins(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.adminRepository.findAllAdmins(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async viewAdmin(id: number): Promise<Admin> {
    const Admin = await this.adminRepository.findAdminById(id);
    if (!Admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return Admin;
  }


  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    let admin = await this.adminRepository.preloadAdmin({
      id,
      username: updateAdminDto.username,
      email: updateAdminDto.email
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }

    if (updateAdminDto.roles) {
      if (updateAdminDto.roles.length === 0) {
        throw new ConflictException('An admin must have at least one role.');
      }

      // ✅ Fetch Role entities
      const roleEntities = await this.roleRepository.findRolesByIds(updateAdminDto.roles);
      if (roleEntities.length !== updateAdminDto.roles.length) {
        throw new NotFoundException('One or more roles do not exist.');
      }

      admin.roles = roleEntities;
    }

    if (updateAdminDto.password) {
      admin.password = await hash(updateAdminDto.password, 10);
    }

    return this.adminRepository.saveAdmin(admin);
  }


  async removeAdmin(id: number): Promise<string> {
    const result = await this.adminRepository.deleteAdminById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return "Admin deleted successfully";
  }
}
