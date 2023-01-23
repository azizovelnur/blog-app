import React, { FC } from "react"
import { BsFillBookmarkHeartFill } from "react-icons/bs"
import { IPost } from "../../models/models"
import { removeItem } from "../../store/slices/postsSlice/postsSlice"
import { RootState } from "../../store/store"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Post } from "./Post"

interface searchValue {
  searchPostsSaved: string
}

const PostSaved: FC<searchValue> = ({ searchPostsSaved }) => {
  const { posts } = useAppSelector((state: RootState) => state.posts)
  const { findedPosts } = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()
  return (
    <div>
      {findedPosts.length !== 0 && searchPostsSaved
        ? findedPosts.map((obj: IPost, index: number) => (
            <div
              key={index}
              className={
                "relative mx-auto w-[600px] h-[400px] mb-[70px] rounded-[10px] shadow-[0px_4px_20px_4px_rgba(119,53,136,0.459)]"
              }
            >
              <img
                className="w-full"
                src={`http://localhost:5000${obj?.imageUrl}`}
                alt="postImg"
              />
              <div>
                <h1 className="text-[30px] font-bold">{obj.title}</h1>
              </div>
              <div>{obj.text}</div>

              {posts.find((post: IPost) => post._id === obj._id) && (
                <button
                  onClick={() => dispatch(removeItem(obj._id))}
                  className="absolute bottom-8 right-8"
                >
                  <BsFillBookmarkHeartFill color="red" size={"30px"} />
                </button>
              )}

              <div className="text-lg font-bold">@{obj.user.userName}</div>
            </div>
          ))
        : posts.map((obj: IPost, index: number) => (
            <div
              key={index}
              className={
                "relative mx-auto w-[600px] h-[400px] mb-[70px] rounded-[10px] shadow-[0px_4px_20px_4px_rgba(119,53,136,0.459)]"
              }
            >
              <img
                className="w-full"
                src={`http://localhost:5000${obj?.imageUrl}`}
                alt="postImg"
              />
              <div>
                <h1 className="text-[30px] font-bold">{obj.title}</h1>
              </div>
              <div>{obj.text}</div>

              {posts.find((post: IPost) => post._id === obj._id) && (
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
