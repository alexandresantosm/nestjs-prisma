import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const prismaErrorCodeUniqueConstraintFailed = 'P2002';

    switch (exception.code) {
      case prismaErrorCodeUniqueConstraintFailed:
        const status = HttpStatus.CONFLICT;
        const message = exception.message.replace(/\n/g, '');
        response.status(status).json({
          statusCode: status,
          message,
        });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
