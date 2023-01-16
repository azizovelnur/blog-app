import { IPost } from "./../models/models"
export const addPostToLS = function (value: IPost) {
  localStorage.setItem("postsLS", JSON.stringify(value))
}
