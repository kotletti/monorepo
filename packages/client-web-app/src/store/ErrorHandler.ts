import { makeAutoObservable, observable } from 'mobx';

export class ErrorHandler {
  private static instance: ErrorHandler;

  @observable.deep private errors: string[] = [];

  static useHandler(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
      makeAutoObservable(ErrorHandler.instance);
    }

    return ErrorHandler.instance;
  }

  add(e: string): void {
    if (!this.errors.includes(e)) {
      this.errors.push(e);
    }
  }

  remove(e: string): void {
    this.errors.splice(
      this.errors.findIndex((i) => i === e),
      1
    );
  }

  list(): ErrorHandler['errors'] {
    return this.errors;
  }

  erase(): void {
    this.errors.length = 0;
  }
}
