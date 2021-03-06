import sourceMapSupport from 'source-map-support';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

sourceMapSupport.install();

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AuthModule);

  app.enableCors();

  await app.listen(3380);
};

bootstrap().then(() => {
  console.log(
    `Auth service started at http://localhost:3380`
  );
});
