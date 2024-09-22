import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService, ProductRepository],
})
export class ProductModule {}