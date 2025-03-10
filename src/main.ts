import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);
  
  const port = configService.get<number>('port', 3000);
  await app.listen(port);
  logger.log(
    `app ready to listen  in PORT - ${port}\n`,
  );
}
bootstrap();
