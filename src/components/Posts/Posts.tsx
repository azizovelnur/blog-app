import React, { FC } from "react"
import { useFetchPostsQuery } from "../../store/rtk/posts/postsApi"
import { IPost } from "../../models/models"
import { Post } from "./Post/Post"

interface ISearchProps {
  searchPosts: string
}

const Posts: FC<ISearchProps> = ({ searchPosts }) => {
  const { isLoading, isError, data: postsData } = useFetchPostsQuery()

  const findedPosts = postsData?.filter((obj: IPost) => {
    if (obj.title.toLowerCase().includes(searchPosts)) {
      return true
    } else {
      return false
    }
  })

  return (
    <>
      {findedPosts?.length !== 0 && searchPosts
        ? findedPosts?.map((obj: IPost, index: number) => (
            <Post obj={obj} postsData={postsData} allPosts={true} />
          ))
        : postsData?.map((obj: IPost, index: number) => (
            <Post obj={obj} postsData={postsData} allPosts={true} />
          ))}
    </>
  )
}

export { Posts }
