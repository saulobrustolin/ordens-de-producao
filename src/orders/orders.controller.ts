import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrder } from "./dto/create-order.dto";
import { UpdateOrder } from "./dto/update-order.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    pegar() {
        return this.orderService.pegar();
    }

    @Post()
    create(@Body() data: CreateOrder) {
        return this.orderService.create(data);
    }

    @Get(':id')
    pegarOrdem(@Param('id') id: string) {
        return this.orderService.pegarOrdem(id);
    }

    @Patch(':id')
    @HttpCode(204)
    atualizarOrdem(@Param('id') id: string, @Body() data: UpdateOrder) {
        return this.orderService.atualizarOrdem(id, data);
    }
    
    @Delete(':id')
    @HttpCode(204)
    deletarOrdem(@Param('id') id: string) {
        return this.orderService.deletarOrdem(id);
    }
}