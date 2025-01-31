import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(Customer) private readonly CustomerRepository: Repository<Customer>,
    ) { }

    createCustomer(Customer: Partial<Customer>): Customer {
        return this.CustomerRepository.create(Customer);
    }

    saveCustomer(Customer: Customer): Promise<Customer> {
        return this.CustomerRepository.save(Customer);
    }

    async findAllCustomers(page: number, limit: number): Promise<[Customer[], number]> {
        return this.CustomerRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['referral'],
        });
    }

    async findCustomerById(id: number): Promise<Customer | null> {
        return this.CustomerRepository.findOne({
            where: { id },
            relations: ['referral'],
        });
    }

    findCustomerByEmail(email: string): Promise<Customer | null> {
        return this.CustomerRepository.findOne({ where: { email } });
    }

    deleteCustomerById(id: number): Promise<{ affected?: number }> {
        return this.CustomerRepository.delete(id);
    }

    preloadCustomer(Customer: Partial<Customer>): Promise<Customer | null> {
        return this.CustomerRepository.preload(Customer);
    }
}
