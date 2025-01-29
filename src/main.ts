import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationInterceptor } from './interceptor/validation.interceptor';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(
          errors.map((err) => ({
            field: err.property,
            message: Object.values(err.constraints).join(', '),
          })),
        ),
    }),
  );

  app.useGlobalInterceptors(new ValidationInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
