import React, { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from "../Modal/Modal"
import { TPost } from "../../models/models"
import { isAuthSelector } from "../../store/slices/async/auth/authSlice"
import { useFetchCreatePostMutation } from "../../store/rtk/posts/postsApi"
import { IoCreate } from "react-icons/io5"
import {
  ModalButton,
  ModalInput,
  ModalTextArea,
} from "../StyledComponents/StyledComponents"
import axios from "../../axios/axiosConf"

const AddPost: FC = () => {
  const [addPost, { isSuccess }] = useFetchCreatePostMutation()
  const isAuth = useSelector(isAuthSelector)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [active, setActive] = useState<Boolean>(false)

  const handlerChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files) {
        const formData = new FormData()
        const file = event.target.files[0]
        formData.append("image", file)
        const { data } = await axios.post("/upload", formData)
        setImageUrl(data.url)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const [newPost, setNewPost] = useState<TPost>({
    title: "",
    text: "",
  })

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    })
  }

  const createPost = async () => {
    await addPost({ ...newPost, imageUrl }).unwrap()
    setImageUrl("")
    setNewPost({ title: "", text: "" })
    setActive(false)
  }

  const onClickCreatePost = () => {
    setActive(!active)
  }

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

              <input
                className="cursor-pointer"
                onChange={handlerChangeFile}
                type="file"
              />
              {imageUrl && (
                <img src={`http://localhost:5000${imageUrl}`} alt="postImage" />
              )}
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
