import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-Customer.dto';
import { UpdateCustomerDto } from './dto/update-Customer.dto';
import { CustomerRepository } from './Customer.repository';
import { Customer } from './entities/Customer.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository) { }

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { referral, firstname, lastname, middlename, dob, nationality, address, email, phoneNumber, sex } = createCustomerDto;

    const customer = await this.customerRepository.findCustomerByEmail(email);
    if (customer) {
      throw new ConflictException('Email already exists.');
    }

    const _referral = await this.userRepository.findUserById(referral);
    if (!_referral) {
      throw new NotFoundException('referral does not exist');
    }

    const Customer = this.customerRepository.createCustomer({
      firstname,
      lastname,
      middlename,
      dob,
      nationality,
      address,
      email,
      phoneNumber,
      sex,
      referral: _referral
    });

    return this.customerRepository.saveCustomer(Customer);
  }

  async findAllCustomer(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.customerRepository.findAllCustomers(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async viewCustomer(id: number): Promise<Customer> {
    const Customer = await this.customerRepository.findCustomerById(id);
    if (!Customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return Customer;
  }



  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findCustomerById(id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const _referral = await this.userRepository.findUserById(existingCustomer.referral?.id);
    if (!_referral) {
      throw new NotFoundException('referral does not exist');
    }


    const Customer = await this.customerRepository.preloadCustomer({
      id,
      ...updateCustomerDto,
      referral: _referral
    });

    if (!Customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }


    return this.customerRepository.saveCustomer(Customer);
  }

  async removeCustomer(id: number): Promise<string> {
    const result = await this.customerRepository.deleteCustomerById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return "Customer deleted successfully";
  }
}
