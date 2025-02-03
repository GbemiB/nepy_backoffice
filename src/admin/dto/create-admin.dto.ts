import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    username: string;

    @IsString()
    @MinLength(8, { message: 'Password must have atleast 8 characters.' })
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    roles: [];
}
