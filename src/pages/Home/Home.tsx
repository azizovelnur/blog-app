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
import { useLocation } from "react-router-dom"

const Home: FC = () => {
  const [activeNewPost, setActiveNewPost] = useState<Boolean>(true)
  const [activePopularPost, setActivePolularPost] = useState<Boolean>(false)

  const location = useLocation()
  const [searchPostsSaved, setSearchPostsSaved] = useState<string>("")
  const [searchPosts, setSearchPosts] = useState<string>("")
  const dispatch = useAppDispatch()

  const { recents } = useAppSelector((state: RootState) => state.posts)
  const { searchValue } = useAppSelector((state: RootState) => state.posts)

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
        <div className="md:w-[400px] mx-auto w-full mt-8 mb-7">
          <div className="text-lg dark:text-[#999] text-black text-center mb-2">
            Search Post
          </div>
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
              className="dark:bg-[#999] w-full h-10 pl-14 rounded-md outline-none bg-[#ccc]"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-around items-center rounded-lg mb-4 w-[120px] h-[44px] font-bold">
            <button
              className={`${
                activeNewPost
                  ? "bg-black h-[22px] rounded-md px-1 text-white hover:bg-black duration-300"
                  : "bg-gray-500 h-[22px] rounded-md px-1 text-white hover:bg-black duration-300"
              }`}
              onClick={() => onClickNew()}
            >
              New
            </button>
            <button
              className={`${
                activePopularPost
                  ? "bg-black h-[22px] rounded-md px-1 text-white hover:bg-black duration-300"
                  : "bg-gray-500 h-[22px] rounded-md px-1 text-white hover:bg-black duration-300"
              }`}
              onClick={() => onClickPopular()}
            >
              Popular
            </button>
          </div>

          <div>{location.pathname === "/" && <AddPost />}</div>
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
