import { IsNotEmpty, MinLength, IsString } from "class-validator";
import { Permission } from "src/permission/entities/permission.entity";

export class CreateRoleDto {

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    name: string;

    @IsString()
    @MinLength(2, { message: 'Password must have atleast 2 characters.' })
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    permissions: number[];
}
