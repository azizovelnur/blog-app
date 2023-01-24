import { Link } from "react-router-dom"
import React, { FC, useState } from "react"
import { data } from "../../../store/slices/async/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks"
import {
  useFetchDeletePostMutation,
  useFetchUpdatePostMutation,
} from "../../../store/rtk/posts/postsApi"
import { IPost, TPost } from "../../../models/models"
import { HiEye } from "react-icons/hi"
import { TbTrash } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"
import { BsFillBookmarkHeartFill } from "react-icons/bs"
import {
  addItem,
  removeItem,
} from "../../../store/slices/postsSlice/postsSlice"
import { Modal } from "../../Modal/Modal"
import {
  ModalButton,
  ModalInput,
  ModalTextArea,
} from "../../StyledComponents/StyledComponents"
import { RootState } from "../../../store/store"
import axios from "../../../axios/axiosConf"

interface IPostProps {
  obj: IPost
  postsData?: IPost[]
  allPosts?: Boolean
}

const Post: FC<IPostProps> = ({ obj, postsData, allPosts }) => {
  const dispatch = useAppDispatch()
  const [removePost] = useFetchDeletePostMutation()
  const userData = useAppSelector(data)
  const [updatePost, { isSuccess }] = useFetchUpdatePostMutation()
  const { posts } = useAppSelector((state: RootState) => state.posts)
  const [active, setActive] = useState<Boolean>(false)
  const [id, setId] = useState<string>("")

  const [imageUrl, setImageUrl] = useState<string>("")

  const [newPost, setNewPost] = useState<TPost>({
    title: "",
    text: "",
  })
  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    })
  }

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
  const onCLickEdit = (objId: string) => {
    const post = postsData?.filter(function (obj: IPost) {
      return obj._id === objId
    })
    console.log(post)
    if (post) {
      setNewPost({ title: post[0].title, text: post[0].text })
    }
    setId(objId)
    setActive(true)
  }

  const deletePost = async (_id: string) => {
    await removePost(_id).unwrap()
  }
  const onClickUpdatePost = async (_id: string) => {
    await updatePost({ ...newPost, _id, imageUrl }).unwrap()
    setActive(false)
  }

  const addItemToPostsSaved = (obj: IPost) => {
    dispatch(addItem(obj))
  }

  const removeItemFromPostsSaved = (id: string) => {
    dispatch(removeItem(id))
  }
  return (
    <>
      <div
        key={obj._id}
        className={
          "relative mx-auto w-[600px] h-[400px] mb-[70px] rounded-[10px] shadow-[0px_4px_20px_4px_rgba(119,53,136,0.459)]"
        }
      >
        <Link to={`/blog/${obj._id}`}>
          <img
            className="w-full h-[50%]"
            src={`http://localhost:5000${obj.imageUrl}`}
            alt="img"
          />
        </Link>
        <div>
          <h1 className="text-[30px] font-bold">{obj.title}</h1>
        </div>
        <div>{obj.text}</div>

        {allPosts && (
          <div className="flex items-center w-[40px] text-[30px]">
            {obj.viewsCount} <HiEye />
          </div>
        )}

        {posts.find((post: IPost) => post._id === obj._id) ? (
          <button
            onClick={() => removeItemFromPostsSaved(obj._id)}
            className="absolute bottom-8 right-8"
          >
            <BsFillBookmarkHeartFill color="red" size={"30px"} />
          </button>
        ) : (
          <button
            onClick={() => addItemToPostsSaved(obj)}
            className="absolute bottom-8 right-8"
          >
            <BsFillBookmarkHeartFill color="white" size={"30px"} />
          </button>
        )}

        {allPosts && obj.user._id === userData?._id && (
          <>
            <div className="absolute flex justify-between top-5 right-4 w-16 h-10 rounded-md">
              <button onClick={() => onCLickEdit(obj._id)}>
                <FiEdit2 color="white" size={"30px"} />
              </button>
              <button onClick={() => deletePost(obj._id)}>
                <TbTrash color="red" size={"30px"} />
              </button>
            </div>

            <Modal active={active} setActive={setActive}>
              <div className={"flex flex-col justify-between"}>
                <div className="text-center mb-5 font-black text-2xl">
                  Update Post
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
                  <img
                    src={`http://localhost:5000${imageUrl}`}
                    alt="postImage"
                  />
                )}
                <ModalButton onClick={() => onClickUpdatePost(id)}>
                  Update
                </ModalButton>
              </div>
            </Modal>
          </>
        )}

        <div className="text-lg font-bold">@{obj.user.userName}</div>
      </div>
    </>
  )
}

export { Post }
