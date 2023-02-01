import { Link, NavLink, useLocation } from "react-router-dom"
import React, { FC, useState } from "react"
import { data } from "../../../store/slices/async/auth/authSlice"
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks"
import {
  useFetchDeletePostMutation,
  useFetchUpdatePostMutation,
} from "../../../store/rtk/posts/postsApi"
import { IPost, TPost } from "../../../models/models"
import { HiEye, HiOutlineUserCircle } from "react-icons/hi"
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
import { ReactComponent as NoImage } from "../../../assets/images/NoImage.svg"
import { FaComments } from "react-icons/fa"

interface IPostProps {
  obj: IPost
  postsData?: IPost[]
}

const Post: FC<IPostProps> = ({ obj, postsData }) => {
  const location = useLocation()
  const { posts } = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()
  const [removePost] = useFetchDeletePostMutation()
  const [updatePost, { isSuccess }] = useFetchUpdatePostMutation()
  const userData = useAppSelector(data)
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
          "lg:h-[480px] lg:w-[500px] md:h-[400px] md:w-[380px] xl:hover:scale-[102%] relative w-full h-[400px] mb-[70px] rounded-[10px] bg-white hover:scale-[100%] duration-300 origin-bottom"
        }
      >
        {obj.imageUrl ? (
          <Link to={`/blog/${obj._id}`}>
            <img
              className="w-full h-[50%] rounded-t-md object-cover object-top"
              src={`http://localhost:5000${obj.imageUrl}`}
              alt="img"
            />
          </Link>
        ) : (
          <Link to={`/blog/${obj._id}`}>
            <img
              className="w-full h-[50%] rounded-t-md object-cover object-top"
              src={`https://via.placeholder.com/800x400.jpg?text=No+Image`}
              alt="img"
            />
          </Link>
        )}
        <div className="mt-3">
          <div className="mx-2">
            <h2 className="text-[30px] font-bold">{obj.title}</h2>
          </div>

          <p className="h-[140px] mx-3 overflow-hidden overflow-ellipsis">
            {obj.text}
          </p>
        </div>
        {location.pathname !== "/saved" && (
          <div className="absolute text-lg top-4 right-4 flex items-center bg-white rounded-md p-1">
            <HiEye color="black" />
            <div className="ml-1">{obj.viewsCount}</div>
          </div>
        )}
        {posts.find((post: IPost) => post._id === obj._id) ? (
          <div className="absolute bottom-2 right-2 flex items-center justify-between w-[70px] text-[30px]">
            <Link to={`/blog/${obj._id}`}>
              <FaComments />
            </Link>
            <button onClick={() => removeItemFromPostsSaved(obj._id)}>
              <BsFillBookmarkHeartFill color="red" />
            </button>
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center justify-between w-[70px] text-[30px]">
            <Link to={`/blog/${obj._id}`}>
              <FaComments />
            </Link>

            <button onClick={() => addItemToPostsSaved(obj)}>
              <BsFillBookmarkHeartFill color="black" />
            </button>
          </div>
        )}
        <div className="text-lg font-bold absolute left-2 bottom-2 flex items-center">
          <HiOutlineUserCircle size={"22px"} />
          {obj.user.userName}
        </div>
      </div>
    </>
  )
}

export { Post }
