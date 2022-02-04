import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSerializerInterceptor } from './config/serializerInterceptorConfig';
import { setupSwagger } from './config/swaggerConfig';
import { setupValidationPipe } from './config/validationPipeConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupValidationPipe(app);

  setupSerializerInterceptor(app);

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
