import { IsString, MinLength, IsNotEmpty, IsEmail, IsEnum } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Firstname must have atleast 2 characters.' })
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @MinLength(2, { message: 'Lastname must have atleast 2 characters.' })
  @IsNotEmpty()
  lastname: string;

  @IsString()
  middlename: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(2, { message: 'Date of birth must have atleast 2 characters.' })
  @IsNotEmpty()
  dob: string;


  @IsString()
  @MinLength(2, { message: 'Nationality must have atleast 2 characters.' })
  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Address must have at least 3 characters.' })
  address: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  username: string;

  @IsString()
  @IsEnum(['female', 'male'])
  sex: string;

  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  @IsNotEmpty()
  password: string;
}