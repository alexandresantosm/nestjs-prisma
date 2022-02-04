import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.prisma.product.create({
      data: createProductDto,
    });
    const createdProductEntity = new ProductEntity(createdProduct);
    return createdProductEntity;
  }

  async findAll() {
    const publishedProducts = await this.prisma.product.findMany({
      where: {
        published: true,
      },
    });
    const publishedProductsEntity = publishedProducts.map(
      (product) => new ProductEntity(product),
    );
    return publishedProductsEntity;
  }

  async findAllDrafts() {
    const draftsProducts = await this.prisma.product.findMany({
      where: {
        published: false,
      },
    });
    const draftsProductsEntity = draftsProducts.map(
      (product) => new ProductEntity(product),
    );
    return draftsProductsEntity;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    const productEntity = new ProductEntity(product);
    return productEntity;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });
    const updatedProductEntity = new ProductEntity(updatedProduct);
    return updatedProductEntity;
  }

  async remove(id: string) {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id },
    });
    const deletedProductEntity = new ProductEntity(deletedProduct);
    return deletedProductEntity;
  }
}
