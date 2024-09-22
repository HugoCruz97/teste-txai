import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { LoginDto } from "../dto/login.dto";

@Injectable()

export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  async login(loginDTO: LoginDto) {
    const userLogged = await this.prisma.users.findUnique({
      where: {
        cpf: loginDTO.cpf
      },
      select: {
        id: true,
        name: true,
        userName: true,
        password: true,
        Products: true
      }
    })

    if (!userLogged) {
      throw new NotFoundException('User not found');
    }

    if (loginDTO.password !== userLogged.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: userLogged.id,
      name: userLogged.name,
      userName: userLogged.userName,
      products: userLogged.Products
      
    };
  }
}