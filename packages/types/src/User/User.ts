export enum JobGradeList {
  junior = 'junior',
  middle = 'middle',
  senior = 'senior',
}

export enum JobScheduleList {
  fullTime = 'full-time',
  partTime = 'part-time',
  temporary = 'temporary',
  remote = 'remote',
}

export enum SalaryCurrencyList {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
}

export type UserProfile = {
  firstName: string;
  lastName: string;
  location: string;
  experience: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type UserExpectationSalary = {
  currency: SalaryCurrencyList;
  amount: number;
};

export type UserExpectation = {
  position: string;
  grade: JobGradeList;
  salary: UserExpectationSalary;
  schedule: JobScheduleList;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type UserJob = {
  position: string;
  grade: JobGradeList;
  company: string;
  period: [string, string];
  tools: string[];
  softSkills: string[];
  hardSkills: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type User = {
  authClientId: string;
  profile: UserProfile;
  expectation: UserExpectation;
  jobs: UserJob[];
};
