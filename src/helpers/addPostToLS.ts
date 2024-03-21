import { IPost } from "../interfaces/interfaces"
export const addPostToLS = function (value: IPost[]) {
  localStorage.setItem("savedPosts", JSON.stringify(value))
}

export const addRecentsToLS = function (value: IPost[]) {
  localStorage.setItem("recentsPosts", JSON.stringify(value))
}
