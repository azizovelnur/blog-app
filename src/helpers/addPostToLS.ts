import { IPost } from "../models/models"
export const addPostToLS = function (value: IPost[]) {
  localStorage.setItem("postsLS", JSON.stringify(value))
}

export const addRecentsToLS = function (value: IPost[]) {
  localStorage.setItem("recentsPosts", JSON.stringify(value))
}
