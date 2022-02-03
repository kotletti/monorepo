export enum ExceptionList {
  UnknownException = 'UnknownException',
  UnauthorizedException = 'UnauthorizedException',
}

export type ExceptionRet = {
  name: ExceptionList;
  message: string;
};

export const exceptionRet = (
  err: ExceptionRet
): ExceptionRet => {
  const {
    name = ExceptionList.UnknownException,
    message = 'Something went wrong.',
  } = err;

  return { name, message };
};
