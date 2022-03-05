import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  AuthClientContext,
  AuthContext,
} from '@kotletti/types';
import { UserContext } from '../utils';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('/my')
  async my(
    @Res() res: any,
    @UserContext() client: AuthClientContext
  ): Promise<any> {
    const user = await this.userService.findUserByClientId(
      client.clientId
    );

    if (!user) {
      throw new HttpException(
        'My user is not found.',
        HttpStatus.NOT_FOUND
      );
    }

    return res.json(user.toJSON());
  }

  @UseGuards(UserGuard)
  @Post('/user')
  async createUser(
    @Res() res: any,
    @Body() body: UserDTO.CreateRequest,
    @UserContext() client: AuthClientContext
  ): Promise<AuthContext> {
    const { firstName, lastName } = body;
    const { clientId } = client;

    const { _id: profileId } =
      await this.userService.createOneProfile({
        firstName,
        lastName,
      });

    const user = await this.userService.createOneUser({
      clientId,
      profile: profileId,
    });

    console.log({ user });

    const response = {
      user: user.toJSON(),
      client,
    };

    console.log(response);

    return res.json(response);
  }
}
