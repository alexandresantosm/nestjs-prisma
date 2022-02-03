import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto,
    });
    return createdProduct;
  }

  async findAll() {
    const publishedProducts = await this.prisma.product.findMany({
      where: {
        published: true,
      },
    });
    return publishedProducts;
  }

  async findAllDrafts() {
    const draftsProducts = await this.prisma.product.findMany({
      where: {
        published: false,
      },
    });
    return draftsProducts;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id },
    });
    return deletedProduct;
  }
}
