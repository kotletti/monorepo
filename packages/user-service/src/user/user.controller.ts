import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthClientContext } from '@kotletti/types';
import { UserContext } from '../utils';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('/me')
  async getMe(
    @Res() res: any,
    @UserContext() client: AuthClientContext
  ): Promise<any> {
    console.log({ client });
    return res.json(client);
  }

  @UseGuards(UserGuard)
  @Post('/user')
  async createUser(
    @Res() res: any,
    @Body() body: UserDTO.CreateRequest,
    @UserContext() client: AuthClientContext
  ): Promise<any> {
    const { firstName, lastName } = body;
    const { clientId } = client;

    const payload: UserDTO.CreatePayload = {
      clientId,
      profile: { firstName, lastName },
    };

    const user = await this.userService.createOneUser(
      payload
    );

    return res.json({ user, client });
  }
}
