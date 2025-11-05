import { Body, Controller, Get, HttpCode, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { UpdateUser } from "./dto/update-user.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    me(@Req() req: any) {
        return req.user;
    }

    @Patch('me')
    @HttpCode(204)
    atualizar(@Req() req: any, @Body() body: UpdateUser) {
        return this.usersService.atualizar(req.user.userId, body);
    }

    @Get(':id')
    @Roles('ADMIN')
    detalhesUsuario(@Param('id') id: string) {
        return this.usersService.pegarUsuario(id);
    }

    @Get()
    @Roles('ADMIN')
    pegarUsuarios() {
        return this.usersService.pegarUsuarios();
    }
}