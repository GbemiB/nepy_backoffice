import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) { }

  createAdmin(admin: Partial<Admin>): Admin {
    return this.adminRepository.create(admin);
  }

  saveAdmin(admin: Admin): Promise<Admin> {
    return this.adminRepository.save(admin);
  }

  async findAllAdmins(page: number, limit: number): Promise<[Admin[], number]> {
    return this.adminRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['roles', 'roles.permissions']
    });
  }

  findAdminById(id: number): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { id },   relations: ['roles', 'roles.permissions'],  });
  }

  findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  deleteAdminById(id: number): Promise<DeleteResult> {
    return this.adminRepository.delete(id);
  }

  preloadAdmin(admin: Partial<Admin>): Promise<Admin | null> {
    return this.adminRepository.preload(admin);
  }
}
