import { IsString, MinLength } from "class-validator";

export class UpdateOrder {
    @IsString()
    code: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsString()
    @MinLength(0)
    status: string;
}