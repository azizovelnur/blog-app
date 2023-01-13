import React, { FC, useState } from "react"
import { useSelector } from "react-redux"
import { TCreatePost } from "../../models/models"
import { isAuthSelector } from "../../store/async/login/loginSlice"
import { useFetchCreatePostMutation } from "../../store/rtk/posts/postsApi"

const AddPost: FC = () => {
  const [addPost, { isSuccess }] = useFetchCreatePostMutation()
  const isAuth = useSelector(isAuthSelector)
  const [newPost, setNewPost] = useState<TCreatePost>({
    title: "",
    text: "",
  })

  const changeHandler = (e: any) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    })
  }

  const createPost = async () => {
    await addPost({ ...newPost }).unwrap()
    setNewPost({ title: "", text: "" })
  }

  return (
    <div className={"flex justify-center mt-[40px]"}>
      {isAuth && (
        <div className={"border-indigo-900 border-[2px]"}>
          <input
            value={newPost.title}
            name={"title"}
            onChange={changeHandler}
            className={"rounded-[4px]"}
            placeholder={"title"}
            type="text"
          />
          <input
            value={newPost.text}
            name={"text"}
            onChange={changeHandler}
            className={"rounded-[4px]"}
            placeholder={"text"}
            type="text"
          />
          <button
            onClick={() => createPost()}
            className={"bg-black text-white"}
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  )
}

export { AddPost }
