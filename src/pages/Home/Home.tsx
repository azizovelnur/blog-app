import React, { FC } from "react"
import { Post } from "../../components/Post/Post"
import { AddPost } from "../AddPost/AddPost"

const Home: FC = () => {
  return (
    <main className={"mainGrid border-[#000] border-solid border-4"}>
      <AddPost />
      <Post />
    </main>
  )
}

export { Home }
