import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupValidationPipe = (app: INestApplication) => {
  const validationPipe = new ValidationPipe();

  app.useGlobalPipes(validationPipe);
};
