import React, { FC, useRef, useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { Modal } from "../Modal/Modal"
import { IPostMutation } from "../../types/types"
import { data } from "../../store/slices/async/auth/authSlice"
import { useFetchCreatePostMutation } from "../../store/rtk/posts/postsApi"
import {
  ModalButton,
  ModalInput,
  ModalTextArea,
} from "../StyledComponents/StyledComponents"
import axios from "../../axios/axiosConf"
import { BsDownload } from "react-icons/bs"

export const AddPost: FC = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [addPost, { isSuccess }] = useFetchCreatePostMutation()
  const isAuth = useAppSelector(data)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [active, setActive] = useState<boolean>(false)

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

  const [newPost, setNewPost] = useState<IPostMutation>({
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
            className="bg-black font-bold rounded-md text-white w-28 h-8 px-2"
            onClick={() => onClickCreatePost()}
          >
            Create Post
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
                ref={inputFileRef}
                className="cursor-pointer hidden"
                onChange={handlerChangeFile}
                type="file"
              />
              <button
                onClick={() => inputFileRef.current?.click()}
                className="bg-black text-white dark:bg-gray-500 w-full mx-auto mb-5 px-3 flex justify-between items-center  rounded-md p-1"
              >
                <div>Download Image</div> <BsDownload size={"40px"} />
              </button>
              {imageUrl && (
                <img
                  className="mb-2 h-36"
                  src={`http://localhost:5000${imageUrl}`}
                  alt="postImage"
                />
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
