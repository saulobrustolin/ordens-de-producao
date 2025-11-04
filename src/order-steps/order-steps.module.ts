import { Module } from "@nestjs/common";
import { StepsController } from "./order-steps.controller";
import { StepsService } from "./order-steps.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [],
    controllers: [StepsController],
    providers: [StepsService, PrismaService]
})
export class StepsModule {}