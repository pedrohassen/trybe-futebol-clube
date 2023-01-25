export interface ILogin {
  username: string,
  password: string,
}

export interface IUser extends ILogin {
  id: number,
  email: string,
  role: string,
}
