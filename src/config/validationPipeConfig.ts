import {
  INestApplication,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export const setupValidationPipe = (app: INestApplication) => {
  const optionsValidation: ValidationPipeOptions = {
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  };

  const validationPipe = new ValidationPipe(optionsValidation);

  app.useGlobalPipes(validationPipe);
};
