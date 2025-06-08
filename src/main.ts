import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from '@/common/guards/roles.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const reflector = new Reflector();

  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
