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
}

export interface UserDetails {
  email: string
  paymail: string
  userId: number
}
