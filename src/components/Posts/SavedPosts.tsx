import React, { FC } from "react"
import { IPost } from "../../models/models"
import { RootState } from "../../store/store"
import { useAppSelector } from "../../hooks/hooks"
import { Post } from "./Post/Post"

interface searchValue {
  searchPostsSaved: string
}

const SavedPosts: FC<searchValue> = ({ searchPostsSaved }) => {
  const { posts, findedPosts } = useAppSelector(
    (state: RootState) => state.posts
  )

  return (
    <div>
      {findedPosts.length !== 0 && searchPostsSaved
        ? findedPosts.map((obj: IPost, index: number) => (
            <Post key={index} obj={obj} />
          ))
        : posts.map((obj: IPost, index: number) => (
            <Post key={index} obj={obj} />
          ))}
    </div>
  )
}

export { SavedPosts }
