import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { LoginRepository } from './repository/login.repository';

@Module({
  controllers: [LoginController],
  providers: [PrismaService, LoginService, LoginRepository],
})
export class LoginModule {}