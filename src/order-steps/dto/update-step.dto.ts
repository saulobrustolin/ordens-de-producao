import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateStep {
    @IsString()
    @MinLength(6)
    name: string;

    @IsInt()
    sequence: number;

    @IsOptional()
    completedAt?: Date | null
}