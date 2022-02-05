import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export const exceptionValueTooLong = (
  exception: Prisma.PrismaClientKnownRequestError,
  response: Response,
) => {
  const status = HttpStatus.BAD_REQUEST;
  const message = exception.message.replace(/\n/g, '');
  response.status(status).json({
    statusCode: status,
    message,
  });
};
