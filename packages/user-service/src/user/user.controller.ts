import {
  Controller,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthUserContext, UserContext } from '../utils';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('/me')
  async getMe(
    @Res() res: any,
    @UserContext() user: AuthUserContext
  ): Promise<any> {
    console.log({ user });
    return res.json({ user });
  }
}
