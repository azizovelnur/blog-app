import React, { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from "../Modal/Modal"
import { TPost } from "../../models/models"
import { isAuthSelector } from "../../store/async/login/loginSlice"
import { useFetchCreatePostMutation } from "../../store/rtk/posts/postsApi"
import { IoCreate } from "react-icons/io5"
import {
  ModalButton,
  ModalInput,
  ModalTextArea,
} from "../StyledComponents/StyledComponents"

const AddPost: FC = () => {
  const [addPost, { isSuccess }] = useFetchCreatePostMutation()
  const isAuth = useSelector(isAuthSelector)
  const [newPost, setNewPost] = useState<TPost>({
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
    setActive(false)
  }

  const onClickCreatePost = () => {
    setActive(!active)
  }

  const [active, setActive] = useState<Boolean>(false)

  return (
    <>
      {isAuth && (
        <>
          <button
            onClick={() => onClickCreatePost()}
            className="fixed top-[100px] right-[100px]"
          >
            <IoCreate size={"40"} />
          </button>
          <Modal active={active} setActive={setActive}>
            <div className={"flex flex-col justify-between"}>
              <div className="text-center mb-5 font-black text-2xl">
                Create Post
              </div>
              <div>
                <div className="font-bold text-base">Title</div>
                <ModalInput
                  value={newPost.title}
                  name={"title"}
                  onChange={changeHandler}
                  placeholder={"title"}
                  type="text"
                />
              </div>
              <div>
                <div className="font-bold text-base">Text</div>
                <ModalTextArea
                  value={newPost.text}
                  name={"text"}
                  onChange={changeHandler}
                  placeholder={"text..."}
                />
              </div>
              <ModalButton onClick={() => createPost()}>
                Create Post
              </ModalButton>
            </div>
          </Modal>
        </>
      )}
    </>
  )
}

export { AddPost }
