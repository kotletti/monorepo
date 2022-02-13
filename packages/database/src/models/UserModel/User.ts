import { Document, model, Schema } from 'mongoose';
import {
  UserProfile,
  UserExpectationSalary,
  UserExpectation,
  UserJob,
  User,
  JobGradeList,
  SalaryCurrencyList,
  JobScheduleList,
} from '@kotletti/types';

export type UserProfileDoc = UserProfile & Document;

export type UserExpectationSalaryDoc =
  UserExpectationSalary & Document;

export type UserExpectationDoc = UserExpectation & Document;

export type UserJobDoc = UserJob & Document;

export type UserDoc = User & Document;

const [required, unique] = [true, true];

const userProfileSchema = new Schema<UserProfileDoc>({
  firstName: String,
  lastName: String,
  location: String,
  experience: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: Date,
});

const userExpectationSalarySchema =
  new Schema<UserExpectationSalaryDoc>(
    {
      currency: {
        type: String,
        enum: SalaryCurrencyList,
        required,
      },
      amount: {
        type: Number,
        required,
      },
    },
    { _id: false }
  );

const userExpectationSchema =
  new Schema<UserExpectationDoc>({
    position: {
      type: String,
      required,
    },
    grade: {
      type: String,
      enum: JobGradeList,
      required,
    },
    salary: userExpectationSalarySchema,
    schedule: {
      type: String,
      enum: JobScheduleList,
      required,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    deletedAt: Date,
  });

const userJobSchema = new Schema<UserJobDoc>({
  position: {
    type: String,
    required,
  },
  grade: {
    type: String,
    enum: JobGradeList,
    required,
  },
  company: {
    type: String,
    required,
  },
  period: {
    type: [String, String],
    required,
  },
  tools: {
    type: [String],
    required,
  },
  softSkills: {
    type: [String],
    required,
  },
  hardSkills: {
    type: [String],
    required,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: Date,
});

const userSchema = new Schema<UserDoc>({
  authClientId: {
    type: String,
    required,
    unique,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  expectation: {
    type: Schema.Types.ObjectId,
    ref: 'UserExpectation',
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserJob',
    },
  ],
});

export const UserProfileModel = model<UserProfileDoc>(
  'UserProfile',
  userProfileSchema
);

export const UserExpectationModel =
  model<UserExpectationDoc>(
    'UserExpectation',
    userExpectationSchema
  );

export const UserJobModel = model<UserJobDoc>(
  'UserJob',
  userJobSchema
);

export const UserModel = model<UserDoc>('User', userSchema);
