import React, { FC } from "react"
import { AddPost } from "../../components/AddPost/AddPost"
import { Post } from "../../components/Post/Post"

const Blog: FC = () => {
  return (
    <>
      <aside
        className={
          "asideGrid  overflow-y-scroll flex flex-col justify-center items-center"
        }
      >
        <div className="h-[200px] w-[200px] mb-[30px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]"></div>
        <div className="h-[200px] w-[200px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]"></div>
      </aside>
      <section className="mainGrid">
        <AddPost />
        <Post />
      </section>
    </>
  )
}

export { Blog }
