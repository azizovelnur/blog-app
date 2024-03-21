import { AnimatePresence, motion } from "framer-motion"
import React, { FC } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { IPost } from "../../interfaces/interfaces"
import { useFetchPopularPostsQuery } from "../../store/rtk/posts/postsApi"
import { RootState } from "../../store/store"
import { Post } from "./Post/Post"

export const PopularPosts: FC = () => {
  const { searchValue } = useAppSelector((state: RootState) => state.posts)
  const {
    isLoading,
    isError,
    data: popularPosts,
  } = useFetchPopularPostsQuery(undefined, { refetchOnMountOrArgChange: true })
  const findedPosts = popularPosts?.filter((obj: IPost) => {
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
                className="lg:h-[480px] lg:w-[500px] md:h-[400px] md:w-[380px] xl:hover:scale-[102%] relative w-full h-[400px] mb-[70px] rounded-[10px] bg-white dark:bg-[#292a2d]"
              >
                <Post key={index} obj={obj} />
              </motion.div>
            </AnimatePresence>
          ))
        : popularPosts?.map((obj: IPost, index: number) => (
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
