import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/Account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
  ) {}

  createAccount(Account: Partial<Account>): Account {
    return this.accountRepository.create(Account);
  }

  saveAccount(Account: Account): Promise<Account> {
    return this.accountRepository.save(Account);
  }

  async findAllAccounts(page: number, limit: number): Promise<[Account[], number]> {
    return this.accountRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'], 
    });
  }

  async findAccountById(id: number): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  findAccountByAccountNumber(accountNumber: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { accountNumber } , relations: ['user']});
  }

  deleteAccountById(id: number): Promise<{ affected?: number }> {
    return this.accountRepository.delete(id);
  }

  preloadAccount(Account: Partial<Account>): Promise<Account | null> {
    return this.accountRepository.preload(Account);
  }
}
