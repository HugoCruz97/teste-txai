import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";

@Controller('product')

export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() CreateProductDTO: ProductDto) {
    await this.productService.create(CreateProductDTO)
  }

  @Get()
  async list() {
    return await this.productService.list()
  }

  @Delete(':user_id/:id')
  async remove(
    @Param('user_id') user_id: string,
    @Param('id') id: string,) {
    await this.productService.remove(Number(id), Number(user_id))
  }

  @Put(':user_id/:id')
  async update(
    @Param('user_id') user_id: string,
    @Param('id') id: string,
    @Body() updateProductDTO: ProductDto,
  ) {
    return await this.productService.update(Number(user_id), Number(id), updateProductDTO);
  }
}