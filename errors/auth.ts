export class InvalidEmailError extends Error {
  constructor() {
    super('The email is invalid')
    this.name = 'InvalidEmailError'
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super('The password is invalid')
    this.name = 'InvalidPasswordError'
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.name = 'UserNotFoundError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials')
    this.name = 'InvalidCredentialsError'
  }
}
