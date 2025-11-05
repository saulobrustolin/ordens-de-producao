import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrder } from "./dto/create-order.dto";
import { UpdateOrder } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService
    ) {}

    async create(data: CreateOrder, userId: string) {
        const order = await this.prisma.order.create({
            data: {
                code: data.code,
                description: data.description,
                status: data.status,
                createdBy: userId,
                steps: {
                    create: data.steps?.map((name, index) => ({
                        name,
                        sequence: index + 1,
                    })) || [],
                }
            }
        })

        return { id: order.id }
    }

    async pegar() {
        const orders = await this.prisma.order.findMany();

        return { data: orders };
    }

    async pegarOrdem(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: id }
        });

        return { data: order };
    }

    async atualizarOrdem(id: string, data: UpdateOrder) {
        await this.prisma.order.update({
            where: { id },
            data
        });
    }

    async deletarOrdem(id: string) {
        await this.prisma.order.delete({
            where: { id }
        });
    }
}