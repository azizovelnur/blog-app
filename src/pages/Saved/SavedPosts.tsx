import React, { FC } from "react"
import { IPost } from "../../interfaces/interfaces"
import { RootState } from "../../store/store"
import { useAppSelector } from "../../hooks/hooks"
import { Post } from "../../components/Posts/Post/Post"
import { motion } from "framer-motion"

export const SavedPosts: FC = () => {
  const { saved } = useAppSelector((state: RootState) => state.posts)
  const postAnimantion = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
    hidden: { opacity: 0, y: 40 },
  }

  return (
    <section>
      <h1 className="dark:text-[#999] text-black text-center text-[30px] mb-5">
        Saved
      </h1>
      <div className="flex justify-between flex-wrap w-full">
        {saved.map((obj: IPost, index: number) => (
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
      </div>
    </section>
  )
}
