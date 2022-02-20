import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { AuthGuard } from '../src/auth/auth.guard';
import { MongoProvider } from '../src/auth/auth.module';
import { SignDTO } from '../src/auth/auth.dto';

const response = {
  json: (body?: any) => body,
  status: (code: number) => HttpStatus.OK,
  setHeader: (header: string) => console.log(header),
};

const defaultClaims = {
  email: 'andrey@mail.ru',
  password: 'Andrey123',
};

describe('Auth controller unit suits.', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, AuthGuard, MongoProvider],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController =
      moduleRef.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    const res = await authController.deleteAll();

    console.log(res);
  });

  it('Should sign up by email.', async () => {
    const res: SignDTO.Response =
      await authController.signUp(defaultClaims, response);

    expect(res).toBeTruthy();

    expect(res.token).toBeTruthy();
  });

  it('Should sign in by email.', async () => {
    const res: SignDTO.Response =
      await authController.signIn(defaultClaims, response);

    expect(res).toBeTruthy();

    expect(res.token).toBeTruthy();
  });
});
