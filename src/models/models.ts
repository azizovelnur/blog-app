//user
export interface IUser {
  _id: string
  userName: string
  email: string
  passwordHash: string
  token: string
}

//post
export interface IPost {
  _id: string
  title: string
  text: string
  viewsCount: number
  user: IUser
  imageUrl?: string
  createdAt: string
}

export interface IPostMutation {
  _id?: string
  title: string
  text: string
  viewsCount?: number
  user?: IUser
  imageUrl?: string
}

export type TPost = {
  title: string
  text: string
  imageUrl?: string
}

export interface ILogin {
  email: string
  password: string
}
export enum Status {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

export interface IUserState {
  data: IUser | null
  status: Status
}

export interface IRegistration {
  name: string
  email: string
  password: string
}
export interface Iids {
  postId: string
  commentId: string
}
