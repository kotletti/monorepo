import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserContext, AuthUserContext } from '../utils';

@Controller('/api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('/getMe')
  async getMe(
    @Res() res: any,
    @UserContext() { clientId }: AuthUserContext
  ): Promise<any> {
    const resp = await this.authService.getMe(clientId);

    return res.json(resp);
  }

  @Post('/sign-in-email')
  async signIn(
    @Body() payload: SignDTO.SignIn,
    @Res() res: any
  ): Promise<SignDTO.Response> {
    console.log('Sign in payload:', payload);

    const token = await this.authService.signIn(payload);

    res.setHeader('Authorization', token);

    return res.json({ token });
  }

  @Post('/sign-up-email')
  async signUp(
    @Body() payload: SignDTO.SignUp,
    @Res() res: any
  ): Promise<SignDTO.Response> {
    console.log('Sign up payload:', payload);

    const token = await this.authService.signUp(payload);

    res.setHeader('Authorization', token);

    return res.json({ token });
  }

  @Delete('/delete-all')
  async deleteAll(): Promise<any> {
    if (process.env.NODE_ENV === 'test') {
      await this.authService.deleteAllClients();

      await this.authService.deleteAllTokens();

      return 'All clients & tokens are deleted.';
    }

    return 'Method is deprecated.';
  }
}
