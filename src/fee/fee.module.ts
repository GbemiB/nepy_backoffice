import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { FeeRepository } from './fee.repository';
import { Fee } from './entities/fee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fee])],
  controllers: [FeeController],
  providers: [FeeService, FeeRepository],
})
export class FeeModule { }
