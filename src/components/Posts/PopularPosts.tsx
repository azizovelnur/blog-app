import React, { FC } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../models/models"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { RootState } from "../../store/store"
import { Post } from "./Post/Post"

const PopularPosts: FC = () => {
  const { searchValue } = useAppSelector((state: RootState) => state.posts)
  const {
    isLoading,
    isError,
    data: popularPosts,
  } = useFetchPopularPostsQuery(undefined, { refetchOnMountOrArgChange: true })
  const findedPosts = popularPosts?.filter((obj: IPost) => {
    if (obj.title.toLowerCase().includes(searchValue)) {
      return true
    } else {
      return false
    }
  })
  return (
    <>
      {findedPosts?.length !== 0 && searchValue
        ? findedPosts?.map((obj: IPost, index: number) => (
            <Post key={index} obj={obj} />
          ))
        : popularPosts?.map((obj: IPost, index: number) => {
            return <Post key={index} obj={obj} />
          })}
    </>
  )
}

export { PopularPosts }
