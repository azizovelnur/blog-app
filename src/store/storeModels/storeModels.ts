import { IPost } from "../../models/models"

export interface IStatePosts {
  posts: IPost[]
  findedPosts: IPost[]
}

export interface IHelpersState {
  recents: IPost[]
}

export interface IComment {
  _id: string
  comment: string
}

export interface ICreateComment {
  comment: string
  postId: string
}
