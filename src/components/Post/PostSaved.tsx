import React from "react"
import { BsFillBookmarkHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { IPost } from "../../models/models"
import { removeItem } from "../../store/postsSaved/postsSaved"
import { RootState, useAppDispatch } from "../../store/store"
import { Post } from "./Post"

const PostSaved = () => {
  const { posts } = useSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()
  return (
    <div>
      {posts.map((obj: IPost, index: number) => (
        <div
          key={index}
          className={
            "relative mx-auto w-[600px] h-[400px] mb-[70px] rounded-[10px] shadow-[0px_4px_20px_4px_rgba(119,53,136,0.459)]"
          }
        >
          <div>
            <h1 className="text-[30px] font-bold">{obj.title}</h1>
          </div>
          <div>{obj.text}</div>

          {posts.find((post: any) => post._id === obj._id) && (
            <button
              onClick={() => dispatch(removeItem(obj._id))}
              className="absolute bottom-8 right-8"
            >
              <BsFillBookmarkHeartFill color="red" size={"30px"} />
            </button>
          )}

          <div className="text-lg font-bold">@{obj.user.userName}</div>
        </div>
      ))}
    </div>
  )
}

export { PostSaved }
