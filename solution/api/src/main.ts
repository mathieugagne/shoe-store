import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, );
  const logger = new Logger('bootstrap');
  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors({origin: '*'})
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  logger.log(`App listening on port ${port}`);
}
bootstrap();
