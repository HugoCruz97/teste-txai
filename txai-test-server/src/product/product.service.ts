import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./repository/product.repository";
import { ProductDto } from "./dto/product.dto";

@Injectable()

export class ProductService {
  constructor(private repository: ProductRepository) {}

  async list() {
    return await this.repository.list()
  }

  async create(createProductDTO: ProductDto) {
    await this.repository.create(createProductDTO)
  }

  async update(user_id: number, id: number, updateProductDTO: ProductDto) {
    await this.repository.update(user_id, id, updateProductDTO)
  }

  async remove(id: number, userId: number) {
    await this.repository.remove(id, userId)
  }
}