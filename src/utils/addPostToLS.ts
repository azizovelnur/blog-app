import { IPost } from "./../models/models"
export const addPostToLS = function (value: IPost) {
  localStorage.setItem("postsLS", JSON.stringify(value))
}

// export const addPostRecentToLS = function (value: IPost) {
//   localStorage.setItem("recentsPostsLS", JSON.stringify(value))
// }
