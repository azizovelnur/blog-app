import React, { FC } from "react"
import { useFetchPostsQuery } from "../../store/rtk/posts/postsApi"
import { IPost } from "../../models/models"
import { Post } from "./Post/Post"
import { useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"

// interface ISearchProps {
//   searchPosts: string
// }

const Posts: FC = () => {
  const { searchValue } = useAppSelector((state: RootState) => state.posts)
  const {
    isLoading,
    isError,
    data: postsData,
  } = useFetchPostsQuery(undefined, { refetchOnMountOrArgChange: true })

  const findedPosts = postsData?.filter((obj: IPost) => {
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
            <Post key={index} obj={obj} postsData={postsData} />
          ))
        : postsData?.map((obj: IPost, index: number) => (
            <Post key={index} obj={obj} postsData={postsData} />
          ))}
    </>
  )
}

export { Posts }
