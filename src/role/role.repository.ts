import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Role/entities/Role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  createRole(role: Partial<Role>): Role {
    return this.roleRepository.create(role);
  }

  saveRole(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async findAllRoles(page: number, limit: number): Promise<[Role[], number]> {
    return this.roleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['permissions'], 
    });
  }

  findRoleById(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
  }

  async findRolesByIds(ids: number[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: { id: In(ids) },
    });
  }

  findRoleByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { name } });
  }

  deleteRoleById(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }

  preloadRole(Role: Partial<Role>): Promise<Role | null> {
    return this.roleRepository.preload(Role);
  }
}
