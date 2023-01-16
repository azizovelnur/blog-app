import React, { FC, useState } from "react"
import { AddPost } from "../../components/AddPost/AddPost"
import { Post } from "../../components/Post/Post"
import { PostSaved } from "../../components/Post/PostSaved"

const Blog: FC = () => {
  const [activeAllPost, setActiveAllPost] = useState<Boolean>(true)
  const [activeSavedPost, setActiveSavedPost] = useState<Boolean>(false)

  const onClickAll = () => {
    setActiveAllPost(true)
    setActiveSavedPost(false)
  }

  const onClickSaved = () => {
    setActiveSavedPost(true)
    setActiveAllPost(false)
  }

  return (
    <>
      <aside className={"asideGrid "}>
        <div className="flex justify-center">
          <div className="flex justify-around items-center backdrop-blur-[10px] rounded-lg bg-[#29183090] w-[120px] h-[44px]">
            <button
              className={`${
                activeAllPost
                  ? "bg-purple-500 h-[22px] rounded-md px-1"
                  : "bg-purple-900 h-[22px] rounded-md px-1"
              }`}
              onClick={() => onClickAll()}
            >
              All
            </button>
            <button
              className={`${
                activeSavedPost
                  ? "bg-purple-500 h-[22px] rounded-md px-1"
                  : "bg-purple-900 h-[22px] rounded-md px-1"
              }`}
              onClick={() => onClickSaved()}
            >
              Saved
            </button>
          </div>
        </div>

        <div className="mt-3 flex justify-center ">
          <input
            className="w-44 h-7 rounded-sm backdrop-blur-[3px] outline-none bg-[#29183090]"
            type="text"
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-10">
          <div className="h-[200px] w-[200px] mb-[30px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]"></div>
          <div className="h-[200px] w-[200px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]"></div>
        </div>
      </aside>
      <section className="mainGrid">
        {activeAllPost && <Post />}
        {activeAllPost && <AddPost />}
        {activeSavedPost && <PostSaved />}
      </section>
    </>
  )
}

export { Blog }
