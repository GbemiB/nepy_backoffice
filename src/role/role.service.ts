import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-Role.dto';
import { UpdateRoleDto } from './dto/update-Role.dto';
import { RoleRepository } from './Role.repository';
import { Role } from './entities/Role.entity';
import { PermissionRepository } from 'src/permission/Permission.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository
  ) { }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, permissions } = createRoleDto;

    const existingRole = await this.roleRepository.findRoleByName(name);
    if (existingRole) {
      throw new ConflictException('Role name already exists.');
    }

    const permissionEntities = await this.permissionRepository.findPermissionsByIds(permissions);
    if (permissionEntities.length !== permissions.length) {
      throw new NotFoundException('One or more permissions do not exist.');
    }

    const role = this.roleRepository.createRole({
      name,
      description,
      permissions: permissionEntities,
    });

    return this.roleRepository.saveRole(role);
  }


  async findAllRoles(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.roleRepository.findAllRoles(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async viewRole(id: number): Promise<Role> {
    const Role = await this.roleRepository.findRoleById(id);
    if (!Role) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    return Role;
  }


  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    let role = await this.roleRepository.preloadRole({
      id,
      name: updateRoleDto.name,
      description: updateRoleDto.description,
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    const permissionEntities = await this.permissionRepository.findPermissionsByIds(updateRoleDto?.permissions);
    if (permissionEntities.length !== updateRoleDto?.permissions.length) {
      throw new NotFoundException('One or more permissions do not exist.');
    }

    role.permissions = permissionEntities;

    return this.roleRepository.saveRole(role);
  }


  async removeRole(id: number): Promise<string> {
    const result = await this.roleRepository.deleteRoleById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found.`);
    }
    return "Role deleted successfully";
  }
}
