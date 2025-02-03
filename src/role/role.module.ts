import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './Role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]),
    PermissionModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleRepository],
})
export class RoleModule { }
