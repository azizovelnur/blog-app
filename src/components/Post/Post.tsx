import React from "react"
import { data } from "../../store/async/login/loginSlice"
import { useSelector } from "react-redux"
import {
  useFetchDeletePostMutation,
  useFetchPostsQuery,
} from "../../store/rtk/posts/postsApi"
import { IPost } from "../../models/models"

const Post = () => {
  const { isLoading, isError, data: postsData } = useFetchPostsQuery(null)
  const [removePost] = useFetchDeletePostMutation()
  const userData = useSelector(data)

  const deletePost = async (_id: string) => {
    console.log(_id)
    await removePost(_id).unwrap()
  }
  return (
    <div>
      {postsData?.map((obj: IPost, index: number) => (
        <div
          key={index}
          className={"w-[400px] h-[100px] border-[2px] border-indigo-900"}
        >
          <div>{obj.title}</div>
          <div>{obj.text}</div>
          <div>{obj.user.name}</div>

          {obj.user._id === userData?._id && (
            <button onClick={() => deletePost(obj._id)}>delete</button>
          )}
        </div>
      ))}
    </div>
  )
}

export { Post }
