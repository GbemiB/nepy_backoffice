import { IsString, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { AccountType } from "src/enum/account-type.enum";

export class CreateAccountDto {
    @IsEnum(AccountType)
    accountType: AccountType;

    @IsString()
    @MinLength(11, { message: 'Account number must have 11 characters.' })
    @IsNotEmpty()
    accountNumber: string;

    @IsString()
    balance: string;

    @IsNotEmpty()
    userId: number;
}
