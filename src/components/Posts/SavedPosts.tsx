import React, { FC } from "react"
import { IPost } from "../../models/models"
import { RootState } from "../../store/store"
import { useAppSelector } from "../../hooks/hooks"
import { Post } from "./Post/Post"

const SavedPosts: FC = () => {
  const { posts, findedPosts } = useAppSelector(
    (state: RootState) => state.posts
  )

  return (
    <>
      <section className="flex justify-between flex-wrap w-full">
        {findedPosts.length !== 0 && true
          ? findedPosts.map((obj: IPost, index: number) => (
              <Post key={index} obj={obj} />
            ))
          : posts.map((obj: IPost, index: number) => (
              <Post key={index} obj={obj} />
            ))}
      </section>
    </>
  )
}

export { SavedPosts }
