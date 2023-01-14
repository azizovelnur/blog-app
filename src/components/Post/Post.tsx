import React from "react"
import { data } from "../../store/async/login/loginSlice"
import { useSelector } from "react-redux"
import {
  useFetchDeletePostMutation,
  useFetchPostsQuery,
} from "../../store/rtk/posts/postsApi"
import { IPost } from "../../models/models"
import { Link } from "react-router-dom"

const Post = () => {
  const { isLoading, isError, data: postsData } = useFetchPostsQuery(null)
  const [removePost] = useFetchDeletePostMutation()
  const userData = useSelector(data)

  const deletePost = async (_id: string) => {
    console.log(_id)
    await removePost(_id).unwrap()
  }
  return (
    <>
      {postsData?.map((obj: IPost, index: number) => (
        <div
          key={index}
          className={
            "mx-auto w-[600px] h-[400px] mb-[70px] rounded-[10px] bg-gray-500 shadow-cyan-500/50"
          }
        >
          <div>
            <h1 className="text-[30px] font-bold">{obj.title}</h1>
          </div>
          <div>{obj.text}</div>
          <div>{obj.user.name}</div>
          <div>{obj.viewsCount}</div>

          {obj.user._id === userData?._id && (
            <button onClick={() => deletePost(obj._id)}>delete</button>
          )}

          <button className="bg-orange-600">click me</button>
        </div>
      ))}
    </>
  )
}

export { Post }
