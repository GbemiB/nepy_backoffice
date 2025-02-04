import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeeRepository {
  constructor(
    @InjectRepository(Fee) private readonly feeRepository: Repository<Fee>,
  ) { }

  createFee(Fee: Partial<Fee>): Fee {
    return this.feeRepository.create(Fee);
  }

  saveFee(Fee: Fee): Promise<Fee> {
    return this.feeRepository.save(Fee);
  }

  async findAllFees(page: number, limit: number): Promise<[Fee[], number]> {
    return this.feeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
  }

  async findFeeById(id: number): Promise<Fee | null> {
    return this.feeRepository.findOne({
      where: { id }
    });
  }

  findFeeByName(name: string): Promise<Fee | null> {
    return this.feeRepository.findOne({ where: { name } });
  }

  deleteFeeById(id: number): Promise<{ affected?: number }> {
    return this.feeRepository.delete(id);
  }

  preloadFee(Fee: Partial<Fee>): Promise<Fee | null> {
    return this.feeRepository.preload(Fee);
  }
}
