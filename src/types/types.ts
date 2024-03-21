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

export interface IStatePosts {
  saved: IPost[]
  recents: IPost[]
  searchValue: string
}

export interface IComment {
  user: IUser
  _id: string
  comment: string
  createdAt: string
}

export interface ICreateComment {
  comment: string
  postId: string
}
