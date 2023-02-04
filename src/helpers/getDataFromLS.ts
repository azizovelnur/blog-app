import { IPost } from "../types/types"
export const getDataFromLocalStorage = () => {
  const getPosts = localStorage.getItem("savedPosts")
  const savedPosts = getPosts ? JSON.parse(getPosts) : []
  return savedPosts as IPost[]
}

export const getRecentsPostsFromLS = () => {
  const posts = localStorage.getItem("recentsPosts")
  const recentsPosts = posts ? JSON.parse(posts) : []
  return recentsPosts as IPost[]
}
