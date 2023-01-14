import React, { FC } from "react"
import { Post } from "../../components/Post/Post"
import { AddPost } from "../../components/AddPost/AddPost"

const Home: FC = () => {
  return (
    <main className={"mainGrid"}>
      <AddPost />
      <Post />
    </main>
  )
}

export { Home }
