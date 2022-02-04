import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const setupSerializerInterceptor = (app: INestApplication) => {
  const reflectorApp = app.get(Reflector);
  const serializerInterceptor = new ClassSerializerInterceptor(reflectorApp);
  app.useGlobalInterceptors(serializerInterceptor);
};
