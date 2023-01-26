import { IPost } from "./../models/models"
export const getDataFromLocalStorage = () => {
  const getPosts = localStorage.getItem("postsLS")
  const posts = getPosts ? JSON.parse(getPosts) : []
  return posts as IPost[]
}

export const getRecentsPostsFromLS = () => {
  const posts = localStorage.getItem("recentsPosts")
  const recentsPosts = posts ? JSON.parse(posts) : []
  return recentsPosts as IPost[]
}
