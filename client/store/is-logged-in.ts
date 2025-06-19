import { makeAutoObservable } from "mobx";

class IsLoggedInState {
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLogged(logCheck: boolean) {
    this.isLogged = logCheck;
  }
}

export const loggedState = new IsLoggedInState();
