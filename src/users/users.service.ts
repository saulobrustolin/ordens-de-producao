import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUser } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {}

    async atualizar(userId: string, data: UpdateUser) {
        const passwordHash: string = await bcrypt.hash(data.password, 10);

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                email: data.email,
                password: passwordHash
            }
        })
    }

    async pegarUsuario(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new ForbiddenException('Usuário não existe.');
        }

        return user;
    }

    async pegarUsuarios() {
        const users = await this.prisma.user.findMany();

        return { data: users }
    }
}