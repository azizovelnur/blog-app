import React, { FC, useEffect, useRef, useState } from "react"
import { Posts } from "../../components/Posts/Posts"
import { SavedPosts } from "../../components/Posts/SavedPosts"
import { findPosts } from "../../store/slices/postsSlice/postsSlice"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { RootState } from "../../store/store"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../models/models"
import { PopularPosts } from "../../components/Posts/PopularPosts"
import { AddPost } from "../../components/AddPost/AddPost"
import { HiSearch } from "react-icons/hi"
import { IoCloseSharp } from "react-icons/io5"
import { setSearchValue } from "../../store/slices/postsSlice/postsSlice"

const Home: FC = () => {
  const [activeNewPost, setActiveNewPost] = useState<Boolean>(true)
  const [activePopularPost, setActivePolularPost] = useState<Boolean>(false)

  const [searchPostsSaved, setSearchPostsSaved] = useState<string>("")
  const [searchPosts, setSearchPosts] = useState<string>("")
  const dispatch = useAppDispatch()

  const { recents } = useAppSelector((state: RootState) => state.posts)
  const { searchValue } = useAppSelector((state: RootState) => state.posts)

  const { openMenu } = useAppSelector((state: RootState) => state.posts)

  // const { isLoading, isError, data: popularPosts } = useFetchPopularPostsQuery()
  const onClickNew = () => {
    setActiveNewPost(true)
    setActivePolularPost(false)
  }

  const onClickPopular = () => {
    setActivePolularPost(true)
    setActiveNewPost(false)
  }
  const onChangeHanlder = (value: string) => {
    // setSearchPosts(value)
    dispatch(setSearchValue(value))
  }

  return (
    <>
      <section>
        <div className="mx-auto w-[400px]">
          <div className="text-center mb-2">Search Post</div>
          <div className="relative">
            <HiSearch className="absolute top-1 left-3" size={"28px"} />
            {searchValue && (
              <button onClick={() => dispatch(setSearchValue(""))}>
                <IoCloseSharp
                  className="absolute top-[6px] right-3"
                  size={"28px"}
                />
              </button>
            )}
            <input
              value={searchValue}
              onChange={(event) => onChangeHanlder(event.target.value)}
              className="w-full h-10 pl-14 rounded-md outline-none bg-[#ccc]"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-around items-center backdrop-blur-[10px] rounded-lg bg-[#fffee5cc] w-[120px] h-[44px]">
          <button
            className={`${
              activeNewPost
                ? "bg-purple-500 h-[22px] rounded-md px-1"
                : "bg-purple-900 h-[22px] rounded-md px-1"
            }`}
            onClick={() => onClickNew()}
          >
            New
          </button>
          <button
            className={`${
              activePopularPost
                ? "bg-purple-500 h-[22px] rounded-md px-1"
                : "bg-purple-900 h-[22px] rounded-md px-1"
            }`}
            onClick={() => onClickPopular()}
          >
            Popular
          </button>
        </div>
      </section>
      <main className="flex justify-between flex-wrap">
        {activeNewPost && <Posts />}
        {activePopularPost && <PopularPosts />}
      </main>
    </>
  )
}

export { Home }
