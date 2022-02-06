import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignDTO } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserContext, AuthUserContext } from 'src/utils';

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

  @Post('/sign-in')
  async signIn(
    @Body() payload: SignDTO.SignIn,
    @Res() res: any
  ) {
    console.log('Sign in payload:', payload);

    const token = await this.authService.signIn(payload);

    res.setHeader('Authorization', token);

    return res.json({ token });
  }

  @Post('/sign-up')
  async signUp(
    @Body() payload: SignDTO.SignUp,
    @Res() res: any
  ) {
    console.log('Sign up payload:', payload);

    const token = await this.authService.signUp(payload);

    res.setHeader('Authorization', token);

    return res.json({ token });
  }
}