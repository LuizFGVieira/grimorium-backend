import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { BodyParserInterceptor } from './interceptors/body-parser.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'fatal', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('Grimorium Backend - API')
    .setDescription(
      'Descrição da API do sistema de gerenciador de fichas de RPG Grimorium',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(BodyParserInterceptor.create())
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(),
  );
  app.enableCors(); 
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
