import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Middleware to enable CORS
   * Middleware to secure the app by setting various HTTP headers
   */
  app.use(helmet());
  app.enableCors();

  /**
   * Global validation pipe
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * 
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Book API')
    .setDescription('The Nest Book API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
