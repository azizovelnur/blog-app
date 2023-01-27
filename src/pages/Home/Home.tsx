import React, { FC, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Posts } from "../../components/Posts/Posts"
import { SavedPosts } from "../../components/Posts/SavedPosts"
import { findPosts } from "../../store/slices/postsSlice/postsSlice"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { RootState } from "../../store/store"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../models/models"

const Home: FC = () => {
  const [activeAllPost, setActiveAllPost] = useState<Boolean>(true)
  const [activeSavedPost, setActiveSavedPost] = useState<Boolean>(false)

  const [searchPostsSaved, setSearchPostsSaved] = useState<string>("")
  const [searchPosts, setSearchPosts] = useState<string>("")
  const dispatch = useAppDispatch()

  const { recents } = useAppSelector((state: RootState) => state.posts)

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
        <div className="flex justify-around items-center backdrop-blur-[10px] rounded-lg bg-[#fffee5cc] w-[120px] h-[44px]">
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

        {activeSavedPost && (
          <div>
            <div>Search Post Saved</div>
            <input
              value={searchPostsSaved}
              onChange={(event) => setSearchPostsSaved(event.target.value)}
              className="w-44 h-7 rounded-sm outline-none bg-[#fffee5cc]"
              type="text"
            />
          </div>
        )}

        {activeAllPost && (
          <div>
            <div>Search Post</div>
            <input
              value={searchPosts}
              onChange={(event) => onChangeHanlder(event.target.value)}
              className="w-44 h-7 rounded-sm outline-none bg-[#fffee5cc]"
              type="text"
            />
          </div>
        )}

        <div className="mt-10">
          <div className="h-[200px] w-[200px] mb-[30px] rounded-[10px] bg-[#fffee5cc] shadow-[0px_4px_20px_4px_rgba(255,218,22,0.2)] ">
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
          <div className="h-[200px] w-[200px] rounded-[10px] bg-[#fffee5cc] shadow-[0px_4px_20px_4px_rgba(255,218,22,0.2)]">
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
        {activeSavedPost && <SavedPosts searchPostsSaved={searchPostsSaved} />}
      </section>
    </div>
  )
}

export { Home }
