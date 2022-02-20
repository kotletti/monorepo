import { Connection } from 'mongoose';
import { v4 } from 'uuid';
import {
  User,
  Config,
  JobGradeList,
  SalaryCurrencyList,
  JobScheduleList,
} from '@kotletti/types';
import {
  mongoConnect,
  UserModel,
  genObjectId,
} from '../src';

const { MONGO_URI, MONGO_DB_NAME } = process.env;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is undefined.');
}

if (!MONGO_DB_NAME) {
  throw new Error('MONGO_DB_NAME is undefined.');
}

const mongoConfig: Config['database']['mongo'] = {
  uri: MONGO_URI,
  dbName: MONGO_DB_NAME,
};

const createUser = (): User => ({
  authClientId: v4(),
  profile: {
    firstName: v4(),
    lastName: v4(),
    location: v4(),
    experience: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  expectation: {
    position: v4(),
    grade: 'junior' as JobGradeList,
    salary: {
      currency: 'RUB' as SalaryCurrencyList,
      amount: 20000,
    },
    schedule: 'full-time' as JobScheduleList,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  jobs: [
    {
      position: v4(),
      grade: 'junior' as JobGradeList,
      company: v4(),
      period: [
        new Date().toDateString(),
        new Date().toDateString(),
      ],
      tools: [v4(), v4()],
      softSkills: [v4(), v4()],
      hardSkills: [v4(), v4()],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});

const defaultUser = createUser();

describe('Client model suits.', () => {
  let connect: Connection;

  beforeAll(async () => {
    connect = await mongoConnect(mongoConfig, {
      isReconnect: false,
    });

    connect.useDb(mongoConfig.dbName);
  });

  afterAll(async () => {
    await connect.close();
  });

  it('User should not be exists.', async () => {
    const user = await UserModel.findOne({
      authClientId: defaultUser.authClientId,
    });

    expect(user).toBeFalsy();
  });

  it('Should create new user.', async () => {
    const session = await connect.startSession();

    session.startTransaction();

    const _id = genObjectId();

    const [user] = await UserModel.create(
      [
        {
          ...defaultUser,
          _id,
          profile: {
            ...defaultUser.profile,
            _id,
          },
          expectation: {
            ...defaultUser.expectation,
            _id,
          },
          jobs: defaultUser.jobs.map((i) => ({
            ...i,
            _id,
          })),
        },
      ],
      {
        session,
      }
    );

    await session.abortTransaction();

    await session.endSession();

    console.log({ user });

    expect(user).toBeTruthy();

    expect(user.authClientId).toBe(
      defaultUser.authClientId
    );
  });
});
