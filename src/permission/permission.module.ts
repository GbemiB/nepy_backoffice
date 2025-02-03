import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './Permission.repository';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]),
    PermissionModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports:[PermissionRepository]
})
export class PermissionModule { }
