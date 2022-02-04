import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const configSwagger = new DocumentBuilder()
    .setTitle('NestJS Prisma')
    .setDescription('Building REST API with NestJS and Prisma')
    .setVersion('1.0')
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentSwagger);
};
