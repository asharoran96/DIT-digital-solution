import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { docConfig } from './doc/doc-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  const documentFactory = ()=> SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('doc',app, documentFactory);
  await app.listen(port);
}

bootstrap();
