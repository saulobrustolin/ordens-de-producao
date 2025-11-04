import { IsDate, IsInt, IsString, MinLength } from "class-validator";

export class CreateStep {
    @IsString()
    @MinLength(6)
    name: string;

    @IsInt()
    sequence: number;
    
    @IsDate()
    completedAt: Date
}