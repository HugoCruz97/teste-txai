import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ProductDto } from "../dto/product.dto";

@Injectable()

export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async list() {
    const products = await this.prisma.products.findMany()

    return products
  }

    async create(createProductDTO: ProductDto) {
      await this.prisma.products.create({
        data: createProductDTO
      })
    }

    async update(user_id: number, id: number, updateProductDTO: ProductDto) {
      const user = await this.prisma.users.findUnique({
        where: {
          id: user_id
        }
      })

      if (user) {
        if (user.role === "admin") {
          await this.prisma.products.update({
            where: {
              id
            },
            data: updateProductDTO
          })
        } else {
          await this.prisma.products.update({
            where: {
              id,
              userId: user_id
            },
            data: updateProductDTO
          })
        }
      }
    }

    async remove(id: number, userId: number) {
      const user = await this.prisma.users.findUnique({
        where: {
          id
        }
      })

      if (user) {
        if (user.role === "admin") {
          await this.prisma.products.delete({
            where: {
              id
            }
          })
        } else {
          await this.prisma.products.delete({
            where: {
              id,
              userId
            }
          })
        }
      }
    }
}