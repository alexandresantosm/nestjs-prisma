import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaErrorCode } from '../constants/prismaErrorCode';
import {
  exceptionRecordNotFound,
  exceptionUniqueConstraintFailed,
  exceptionValueTooLong,
} from './handleExceptions';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    switch (exception.code) {
      case PrismaErrorCode.UNIQUE_CONSTRAINT_FAILED:
        exceptionUniqueConstraintFailed(exception, response);
        break;
      case PrismaErrorCode.VALUE_TOO_LONG:
        exceptionValueTooLong(exception, response);
        break;
      case PrismaErrorCode.RECORD_NOT_FOUND:
        exceptionRecordNotFound(exception, response);
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
