import React, { FC, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AddPost } from "../../components/AddPost/AddPost"
import { Posts } from "../../components/Posts/Posts"
import { PostSaved } from "../../components/Posts/PostSaved"
import { findPosts } from "../../store/slices/postsSlice/postsSlice"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { RootState } from "../../store/store"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../models/models"

const Blog: FC = () => {
  const [activeAllPost, setActiveAllPost] = useState<Boolean>(true)
  const [activeSavedPost, setActiveSavedPost] = useState<Boolean>(false)

  const [searchPostsSaved, setSearchPostsSaved] = useState<string>("")
  const [searchPosts, setSearchPosts] = useState<string>("")
  const dispatch = useAppDispatch()

  const { recents } = useAppSelector((state: RootState) => state.helper)

  const { isLoading, isError, data: popularPosts } = useFetchPopularPostsQuery()
  const onClickAll = () => {
    setActiveAllPost(true)
    setActiveSavedPost(false)
  }

  const onClickSaved = () => {
    setActiveSavedPost(true)
    setActiveAllPost(false)
  }
  const onChangeHanlder = (value: string) => {
    setSearchPosts(value)
  }

  useEffect(() => {
    dispatch(findPosts(searchPostsSaved))
  }, [searchPostsSaved])

  return (
    <div className="blogGridContainer">
      <aside className={"asideGrid"}>
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

        {activeSavedPost && (
          <div className="mt-3 flex justify-center">
            <div>
              <div>Search Post Saved</div>
              <input
                value={searchPostsSaved}
                onChange={(event) => setSearchPostsSaved(event.target.value)}
                className="w-44 h-7 rounded-sm backdrop-blur-[3px] outline-none bg-[#29183090]"
                type="text"
              />
            </div>
          </div>
        )}

        {activeAllPost && (
          <div className="mt-3 flex justify-center">
            <div>
              <div>Search Post</div>
              <input
                value={searchPosts}
                onChange={(event) => onChangeHanlder(event.target.value)}
                className="w-44 h-7 rounded-sm backdrop-blur-[3px] outline-none bg-[#29183090]"
                type="text"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center mt-10">
          <div className="h-[200px] w-[200px] mb-[30px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]">
            {popularPosts?.map((popularPost: IPost, index: number) => {
              return (
                <div key={index}>
                  <Link to={`/blog/${popularPost._id}`}>
                    {popularPost.title}
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="h-[200px] w-[200px] rounded-[10px] backdrop-blur-[3px] bg-[#29183090]">
            {recents?.map((recentPost: IPost, index: number) => {
              return (
                <div key={index}>
                  <Link to={`/blog/${recentPost._id}`}>{recentPost.title}</Link>
                </div>
              )
            })}
          </div>
        </div>
      </aside>
      <section className="mainGrid">
        {activeAllPost && <Posts searchPosts={searchPosts} />}
        {activeAllPost && <AddPost />}
        {activeSavedPost && <PostSaved searchPostsSaved={searchPostsSaved} />}
      </section>
    </div>
  )
}

export { Blog }
