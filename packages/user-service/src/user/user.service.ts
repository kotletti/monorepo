import { Inject, Injectable } from '@nestjs/common';
import {
  ClientSession,
  UserDoc,
  UserExpectationDoc,
  UserExpectationModel,
  UserJobDoc,
  UserJobModel,
  UserModel,
  UserProfileDoc,
  UserProfileModel,
} from '@kotletti/database';
import { MongoProviderInstance } from './user.module';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  private session: ClientSession;

  constructor(
    @Inject('MONGO_PROVIDER')
    mongoProvider: MongoProviderInstance
  ) {
    this.session = mongoProvider.session;
  }

  async createOneUser(
    payload: UserDTO.CreatePayload
  ): Promise<UserDoc> {
    const { clientId, profile } = payload;

    const [user] = await UserModel.create([
      {
        clientId,
        profile,
      },
    ]).catch((err: Error) => {
      console.error(err);

      throw err;
    });

    return user;
  }

  async findUserById(
    userId: string
  ): Promise<UserDoc | null> {
    const user = await UserModel.findById(userId).catch(
      (err: Error) => {
        console.error(err);

        throw err;
      }
    );

    return user;
  }

  async findProfileByUserId(
    userId: string
  ): Promise<UserProfileDoc | null> {
    const profile = await UserProfileModel.findById(
      userId
    ).catch((err: Error) => {
      console.error(err);

      throw err;
    });

    return profile;
  }

  async findExpectationByUserId(
    userId: string
  ): Promise<UserExpectationDoc | null> {
    const expectation = await UserExpectationModel.findById(
      userId
    ).catch((err: Error) => {
      console.error(err);

      throw err;
    });

    return expectation;
  }

  async findJobListByUserId(
    userId: string
  ): Promise<UserJobDoc[]> {
    const jobList = await UserJobModel.find({
      _id: userId,
    }).catch((err: Error) => {
      console.error(err);

      throw err;
    });

    return jobList;
  }
}
