import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateOrder {
    @IsString()
    code: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsString()
    @MinLength(0)
    status: string;

    @IsArray()
    steps: string[];
}