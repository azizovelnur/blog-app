import { IUser } from "./../../models/models"
import { IPost } from "../../models/models"

export interface IStatePosts {
  posts: IPost[]
  recents: IPost[]
  findedPosts: IPost[]
  openMenu: Boolean
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
