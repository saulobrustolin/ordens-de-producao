import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUser {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    password?: string;
}