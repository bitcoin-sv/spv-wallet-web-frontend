export interface RegisterNewUserDto {
  email: string
  password: string
  passwordConfirmation: string
}

export interface User {
  email: string
  password: string
}

export interface LoggedInUser {
  email: string
  paymail: string
  balance: object
}
