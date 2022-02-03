import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findPublishedProducts() {
    const publishedProducts = await this.prisma.product.findMany({
      where: {
        published: true,
      },
    });

    return publishedProducts;
  }
}
