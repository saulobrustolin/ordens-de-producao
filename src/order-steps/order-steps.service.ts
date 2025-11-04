import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStep } from "./dto/create-step.dto";
import { UpdateStep } from "./dto/update-step.dto";

@Injectable()
export class StepsService {
    constructor(
        private prisma: PrismaService
    ) {}

    async criar(id: string, data: CreateStep) {
        const step = await this.prisma.orderStep.create({
            data: {
                orderId: id,
                name: data.name,
                sequence: data.sequence,
                completedAt: data.completedAt,
            }
        });

        return step;
    }

    async atualizar(id: string, orderId: string, data: UpdateStep) {
        await this.prisma.orderStep.update({
            where: { id, orderId },
            data: {
                name: data.name,
                sequence: data.sequence,
                completedAt: data.completedAt
            }
        })
    }
}