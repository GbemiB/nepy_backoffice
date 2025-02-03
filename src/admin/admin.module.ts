import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './Admin.repository';
import { Admin } from './entities/admin.entity';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Admin ]),
     RoleModule], 
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
