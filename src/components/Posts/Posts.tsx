import React, { FC } from "react"
import { useFetchPostsQuery } from "../../store/rtk/posts/postsApi"
import { IPost } from "../../interfaces/interfaces"
import { Post } from "./Post/Post"
import { useAppSelector } from "../../hooks/hooks"
import { RootState } from "../../store/store"

import { AnimatePresence, motion } from "framer-motion"

export const Posts: FC = () => {
  const { searchValue } = useAppSelector((state: RootState) => state.posts)
  const {
    isLoading,
    isError,
    data: postsData,
  } = useFetchPostsQuery(undefined, { refetchOnMountOrArgChange: true })

  const findedPosts = postsData?.filter((obj: IPost) => {
    if (obj.title.toLowerCase().includes(searchValue)) {
      return true
    } else {
      return false
    }
  })
  const postAnimantion = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
    hidden: { opacity: 0, y: 40 },
  }

  return (
    <>
      {findedPosts?.length !== 0 && searchValue
        ? findedPosts?.map((obj: IPost, index: number) => (
            <AnimatePresence key={index}>
              <motion.div
                variants={postAnimantion}
                initial={"hidden"}
                animate="visible"
                custom={index}
                className="lg:h-[480px] lg:w-[500px] md:h-[400px] md:w-[380px] relative w-full h-[400px] mb-[70px] rounded-[10px] bg-white dark:bg-[#292a2d]"
              >
                <Post key={index} obj={obj} />
              </motion.div>
            </AnimatePresence>
          ))
        : postsData?.map((obj: IPost, index: number) => (
            <motion.div
              variants={postAnimantion}
              initial={"hidden"}
              animate="visible"
              key={index}
              custom={index}
              className="lg:h-[480px] lg:w-[500px] md:h-[400px] md:w-[380px] relative w-full h-[400px] mb-[70px] rounded-[10px] bg-white dark:bg-[#292a2d]"
            >
              <Post key={index} obj={obj} />
            </motion.div>
          ))}
    </>
  )
}
