import React, { FC } from "react"
import { IPost } from "../../models/models"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { Post } from "./Post/Post"

const PopularPosts: FC = () => {
  const {
    isLoading,
    isError,
    data: popularPosts,
  } = useFetchPopularPostsQuery(undefined, { refetchOnMountOrArgChange: true })
  return (
    <>
      {popularPosts?.map((obj: IPost, index: number) => {
        return <Post key={index} obj={obj} />
      })}
    </>
  )
}

export { PopularPosts }
