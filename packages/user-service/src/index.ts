import sourceMapSupport from 'source-map-support';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';

sourceMapSupport.install();

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(UserModule);

  app.enableCors();

  await app.listen(3381);
};

bootstrap().then(() => {
  console.log(
    `User service started at http://localhost:3381`
  );
});
