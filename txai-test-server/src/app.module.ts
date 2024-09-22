import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, ProductModule, LoginModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
