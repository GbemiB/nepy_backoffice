import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  createPermission(permission: Partial<Permission>): Permission {
    return this.permissionRepository.create(permission);
  }

  savePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }

  async findAllPermissions(page: number, limit: number): Promise<[Permission[], number]> {
    return this.permissionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findPermissionById(id: number): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { id } });
  }

  async findPermissionsByIds(ids: number[]): Promise<Permission[]> {
    return this.permissionRepository.find({
      where: { id: In(ids) },
    });
  }

  findPermissionByName(name: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { name } });
  }

  deletePermissionById(id: number): Promise<DeleteResult> {
    return this.permissionRepository.delete(id);
  }

  preloadPermission(permission: Partial<Permission>): Promise<Permission | null> {
    return this.permissionRepository.preload(permission);
  }
}
