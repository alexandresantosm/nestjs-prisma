import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '../exceptions/prisma-client-exception.filter';

export const setupHandleException = (app: INestApplication) => {
  const { httpAdapter } = app.get(HttpAdapterHost);
  const prismaClientExceptionFilter = new PrismaClientExceptionFilter(
    httpAdapter,
  );
  app.useGlobalFilters(prismaClientExceptionFilter);
};
