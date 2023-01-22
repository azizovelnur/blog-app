import { IPost } from "./../models/models"
export const getDataFromLocalStorage = () => {
  const getPosts = localStorage.getItem("postsLS")
  const posts = getPosts ? JSON.parse(getPosts) : []
  return posts as IPost[]
}

// export const getRecentsPostsFromLS = () => {
//   const getRecentsPosts = localStorage.getItem("recentsPostsLS")
//   const recentsPosts = getRecentsPosts ? JSON.parse(getRecentsPosts) : []
//   return recentsPosts
// }
