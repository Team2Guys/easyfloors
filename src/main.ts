import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({maxFileSize:1000000, maxFiles: 5}))
  app.enableCors({origin:"*"});


  await app.listen(process.env.PORT ?? 3200);
}
bootstrap();
