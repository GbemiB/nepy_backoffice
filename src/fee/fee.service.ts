import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { FeeRepository } from './fee.repository';
import { FeeCategory } from 'src/enum/fee-category.enum';

@Injectable()
export class FeeService {
  constructor(
    private readonly feeRepository: FeeRepository
  ) { }

  async createFee(createFeeDto: CreateFeeDto) {
    const { name, description, category, amount } = createFeeDto;

    const fee = await this.feeRepository.findFeeByName(name);
    if (fee) {
      throw new NotFoundException('Fee already exist');
    }

    const Fee = this.feeRepository.createFee({
      name,
      description,
      category: category as FeeCategory,
      amount
    });
    return this.feeRepository.saveFee(Fee);
  }

  async findAllFees(page: number = 1, limit: number = 10) {
    const [Fees, total] = await this.feeRepository.findAllFees(page, limit);

    return {
      data: Fees,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOneFee(id: number) {
    const Fee = this.feeRepository.findFeeById(id);
    if (!Fee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }
    return Fee;
  }

  async updateFee(id: number, updateFeeDto: UpdateFeeDto) {
    const existingFee = await this.feeRepository.findFeeById(id);
    if (!existingFee) {
      throw new NotFoundException(`Fee with ID ${id} not found`);
    }

    const updatedFee = await this.feeRepository.preloadFee({
      id,
      ...updateFeeDto,
    });

    return this.feeRepository.saveFee(updatedFee);
  }

  async removeFee(id: number) {
    const result = await this.feeRepository.deleteFeeById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fee with ID ${id} not found.`);
    }
    return "Fee deleted successfully";
  }
}
