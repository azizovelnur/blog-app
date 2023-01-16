export const getDataFromLocalStorage = () => {
  const getPosts = localStorage.getItem("postsLS")
  const posts = getPosts ? JSON.parse(getPosts) : []
  return posts
}
