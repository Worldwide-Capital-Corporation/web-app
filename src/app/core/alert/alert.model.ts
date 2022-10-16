/**
 * Alert model.
 */
export interface Alert {
  type: string;
  message: string;
  duration?: number;
}

export class SystemAlert implements Alert {
  constructor(public type: string, public message: string, public duration?: number) {
    this.type = type;
    this.message = message;
    this.duration = duration;
  }
}

export class SystemErrorAlert implements Alert {
  constructor(public type: string, public message: string, public duration?: number) {
    this.type = type;
    this.message = message;
    this.duration = duration;
  }
}

export class AuthenticationErrorAlert implements Alert {
  constructor(public type: string, public message: string, public duration?: number) {
    this.type = type;
    this.message = message;
    this.duration = duration;
  }
}

