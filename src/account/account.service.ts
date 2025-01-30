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

  async create(createAccountDto: CreateAccountDto) {
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

  async findAll() {
    return this.accountRepository.findAllAccounts();
  }

  findOne(id: number) {
    const account = this.accountRepository.findAccountById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
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

  async remove(id: number) {
    const result = await this.accountRepository.deleteAccountById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }
    return "Account deleted successfully";
  }
}
