import { Body, Controller, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { UpdateStep } from "./dto/update-step.dto";
import { CreateStep } from "./dto/create-step.dto";
import { StepsService } from "./order-steps.service";

@Controller('orders')
export class StepsController {
    constructor(private readonly stepService: StepsService) {}

    @Patch(':id/steps/:stepId')
    @HttpCode(204)
    atualizarStep(@Param('id') id: string, @Param('stepId') stepId: string, @Body() data: UpdateStep) {
        return this.stepService.atualizar(id, stepId, data);
    }
    
    @Post(':id/steps')
    criarStep(@Param('id') id: string, @Body() data: CreateStep) {
        return this.stepService.criar(id, data);
    }
}