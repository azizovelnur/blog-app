import React, { FC } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../models/models"
import { RootState } from "../../store/store"
import { Post } from "./Post/Post"

const RecentsPosts: FC = () => {
  const { recents } = useAppSelector((state: RootState) => state.posts)
  return (
    <section className="flex justify-between flex-wrap w-full">
      {recents?.map((obj: IPost, index: number) => {
        return <Post key={index} obj={obj} />
      })}
    </section>
  )
}

export { RecentsPosts }
