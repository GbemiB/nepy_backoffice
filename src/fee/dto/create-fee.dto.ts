import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { FeeCategory } from "src/enum/fee-category.enum";
export class CreateFeeDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Name must have at least 3 characters.' })
    name: string;

    @IsString()
    @MinLength(8, { message: 'Description must have atleast 8 characters.' })
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(FeeCategory)
    category: FeeCategory;

    @IsString()
    @IsNotEmpty()
    amount: string;
}
