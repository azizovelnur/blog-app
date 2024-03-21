import { Link, useLocation } from "react-router-dom"
import React, { FC } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks"
import { IPost } from "../../../types/types"
import { HiEye, HiOutlineUserCircle } from "react-icons/hi"
import { BsFillBookmarkHeartFill } from "react-icons/bs"
import {
  addItem,
  removeItem,
} from "../../../store/slices/postsSlice/postsSlice"
import { RootState } from "../../../store/store"
import { FaComments } from "react-icons/fa"
interface IPostProps {
  obj: IPost
}

export const Post: FC<IPostProps> = ({ obj }) => {
  const location = useLocation()
  const { saved } = useAppSelector((state: RootState) => state.posts)
  const dispatch = useAppDispatch()

  const addItemToPostsSaved = (obj: IPost) => {
    dispatch(addItem(obj))
  }

  const removeItemFromPostsSaved = (id: string) => {
    dispatch(removeItem(id))
  }

  return (
    <>
      {obj.imageUrl ? (
        <Link to={`/blog/${obj._id}`}>
          <img
            className="w-full h-[50%] rounded-t-md object-cover object-top"
            src={`${process.env.REACT_APP_BACKEND_URL}${obj.imageUrl}`}
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
      <div className="mt-3 dark:text-[#999999]">
        <div className="mx-2">
          <h2 className="text-[30px] font-bold">{obj.title}</h2>
        </div>

        <p className="h-[140px] mx-3 overflow-hidden overflow-ellipsis">
          {obj.text}
        </p>
      </div>
      {location.pathname !== "/saved" && (
        <div className="absolute text-lg top-4 right-4 flex items-center bg-white rounded-md p-1 dark:text-[#999999] dark:bg-[#292a2d]">
          <HiEye />
          <div className="ml-1">{obj.viewsCount}</div>
        </div>
      )}
      {saved.find((post: IPost) => post._id === obj._id) ? (
        <div className="dark:text-[#999] text-black absolute bottom-2 right-2 flex items-center justify-between w-[70px] text-[30px]">
          <Link to={`/blog/${obj._id}`}>
            <FaComments />
          </Link>
          <button onClick={() => removeItemFromPostsSaved(obj._id)}>
            <BsFillBookmarkHeartFill color={"green"} />
          </button>
        </div>
      ) : (
        <div className="dark:text-[#999] absolute bottom-2 right-2 flex items-center justify-between w-[70px] text-[30px]">
          <Link to={`/blog/${obj._id}`}>
            <FaComments />
          </Link>

          <button onClick={() => addItemToPostsSaved(obj)}>
            <BsFillBookmarkHeartFill />
          </button>
        </div>
      )}
      <div className="text-lg font-bold absolute left-2 bottom-2 flex items-center dark:text-[#999999]">
        <HiOutlineUserCircle size={"22px"} />
        {obj.user.userName}
      </div>
    </>
  )
}