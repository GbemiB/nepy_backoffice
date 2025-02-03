import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-Permission.dto';
import { UpdatePermissionDto } from './dto/update-Permission.dto';
import { PermissionRepository } from './Permission.repository';
import { Permission } from './entities/Permission.entity';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) { }

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const { name, description } = createPermissionDto;

    const existingPermission = await this.permissionRepository.findPermissionByName(name);
    if (existingPermission) {
      throw new ConflictException('Permission already exists.');
    }

    const Permission = this.permissionRepository.createPermission({
      name,
      description
    });

    return this.permissionRepository.savePermission(Permission);
  }

  async findAllPermissions(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.permissionRepository.findAllPermissions(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async viewPermission(id: number): Promise<Permission> {
    const Permission = await this.permissionRepository.findPermissionById(id);
    if (!Permission) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }
    return Permission;
  }


  async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const Permission = await this.permissionRepository.preloadPermission({
      id,
      ...updatePermissionDto,
    });

    if (!Permission) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }

    return this.permissionRepository.savePermission(Permission);
  }

  async removePermission(id: number): Promise<string> {
    const result = await this.permissionRepository.deletePermissionById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with ID ${id} not found.`);
    }
    return "Permission deleted successfully";
  }
}
