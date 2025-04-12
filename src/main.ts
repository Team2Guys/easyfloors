import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

import cookieParser from 'cookie-parser';
import { AuthGuard } from './gaurds/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 5 }));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'https://easyfloors.vercel.app',
      
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], 
  });
  app.setGlobalPrefix('backend');

  app.use(cookieParser());
  app.useGlobalGuards(new AuthGuard(new Reflector()));

  await app.listen(process.env.PORT ?? 3200);
}

bootstrap();
