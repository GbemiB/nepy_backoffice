import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { AccountModule } from './account/account.module';
import { CustomerModule } from './customer/customer.module';
import { FeeModule } from './fee/fee.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(),
    }),
    UserModule,
    AccountModule,
    CustomerModule,
    FeeModule,
    RoleModule,
    PermissionModule,
    AdminModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
