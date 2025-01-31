import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserRepository } from 'src/user/user.repository';
import { AccountRepository } from './account.repository';
import { AccountType } from 'src/enum/account-type.enum';

@Injectable()
export class AccountService {
  constructor(private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) { }

  async createAccount(createAccountDto: CreateAccountDto) {
    const { accountNumber, accountType, userId, balance } = createAccountDto;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const account = this.accountRepository.createAccount({
      accountNumber,
      accountType: accountType as AccountType,
      balance,
      user,
    });
    return this.accountRepository.saveAccount(account);
  }

  async findAllAccounts(page: number = 1, limit: number = 10) {
    const [accounts, total] = await this.accountRepository.findAllAccounts(page, limit);

    return {
      data: accounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOneAccount(id: number) {
    const account = this.accountRepository.findAccountById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async updateAccount(id: number, updateAccountDto: UpdateAccountDto) {
    const existingAccount = await this.accountRepository.findAccountById(id);
    if (!existingAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    const updatedAccount = await this.accountRepository.preloadAccount({
      id,
      ...updateAccountDto,
    });
  
    return this.accountRepository.saveAccount(updatedAccount);
  }

  async removeAccount(id: number) {
    const result = await this.accountRepository.deleteAccountById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }
    return "Account deleted successfully";
  }
}
