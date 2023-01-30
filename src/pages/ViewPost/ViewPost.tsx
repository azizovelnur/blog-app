import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useFetchCommentsQuery,
  useFetchCreateCommentMutation,
} from "../../store/rtk/comments/commentsApi"
import {
  useFetchDeletePostMutation,
  useFetchOnePostQuery,
  useFetchUpdatePostMutation,
} from "../../store/rtk/posts/postsApi"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setRecents } from "../../store/slices/postsSlice/postsSlice"
import { IComment } from "../../store/storeModels/storeModels"
import { data } from "../../store/slices/async/auth/authSlice"
import { TPost } from "../../models/models"
import { Modal } from "../../components/Modal/Modal"
import {
  ModalButton,
  ModalInput,
  ModalTextArea,
} from "../../components/StyledComponents/StyledComponents"
import { TbTrash } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"
import { Navigate } from "react-router-dom"
import axios from "../../axios/axiosConf"

const ViewPost = () => {
  const { id } = useParams()

  const {
    isLoading,
    isError,
    data: onePostData,
  } = useFetchOnePostQuery(id as string)
  const { data: commentsData } = useFetchCommentsQuery(id as string)
  const dispatch = useAppDispatch()
  const [commentValue, setCommentValue] = useState<string>("")
  const [createComment, { isSuccess: isSuccessComments }] =
    useFetchCreateCommentMutation()
  const [removePost] = useFetchDeletePostMutation()
  const [updatePost, { isSuccess }] = useFetchUpdatePostMutation()
  const userData = useAppSelector(data)
  const [active, setActive] = useState<Boolean>(false)
  // const [id, setId] = useState<string>("")
  const navigate = useNavigate()

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
        console.log(event.target.files)
        const formData = new FormData()
        const file = event.target.files[0]
        console.log(file)
        formData.append("image", file)
        const { data } = await axios.post("/upload", formData)
        console.log(data)
        setImageUrl(data.url)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const onCLickEdit = () => {
    // const post = postsData?.filter(function (obj: IPost) {
    //   return obj._id === objId
    // })
    // console.log(post)
    // if (onePostData) {
    //   setNewPost({ title: post[0].title, text: post[0].text })
    // }
    if (onePostData) {
      setNewPost({ title: onePostData.title, text: onePostData.text })
    }
    // setId(objId)
    setActive(!active)
  }

  const deletePost = async (_id: string) => {
    await removePost(_id).unwrap()
    navigate("/")
  }
  const onClickUpdatePost = async (_id: string) => {
    await updatePost({ ...newPost, _id, imageUrl }).unwrap()
    setActive(false)
  }

  useEffect(() => {
    if (onePostData) {
      dispatch(setRecents(onePostData))
    }
  }, [onePostData])
  return (
    <div className="relative bg-white min-h-[600px] w-full mt-[40px] rounded-3xl p-20">
      {userData && active && (
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
            className="cursor-pointer bg-slate-700"
            onChange={handlerChangeFile}
            type="file"
          />
          {imageUrl && (
            <img src={`http://localhost:5000${imageUrl}`} alt="postImage" />
          )}
          <ModalButton onClick={() => onClickUpdatePost(id as string)}>
            Update
          </ModalButton>
        </div>
      )}
      <h1 className="text-[34px] font-bold">{onePostData?.title}</h1>
      <div>
        {onePostData?.imageUrl ? (
          <img
            className="w-full rounded-xl"
            src={`http://localhost:5000${onePostData?.imageUrl}`}
            alt="postImg"
          />
        ) : (
          <img
            className="w-full rounded-xl"
            src={`https://via.placeholder.com/800x400.jpg?text=No+Image`}
            alt="postImg"
          />
        )}
      </div>
      <p className="text-[18px]">{onePostData?.text}</p>
      <div className="mb-14">
        {commentsData?.map((obj: IComment, index: number) => {
          return (
            <div key={index}>
              <div className="bg-gray-500 my-2">{obj.comment}</div>
              <div>{obj.createdAt}</div>
            </div>
          )
        })}
      </div>
      {userData && (
        <div className="bg-gray-600 h-10">
          <input
            className="w-[75%] h-full pl-4 border-[#000] border-[1px]"
            value={commentValue}
            onChange={(event) => setCommentValue(event?.target.value)}
            type="text"
          />
          <button
            className="w-[25%] bg-black text-white h-full"
            onClick={() =>
              createComment({ postId: id as string, comment: commentValue })
            }
          >
            add Comment
          </button>
        </div>
      )}
      {onePostData?.user._id === userData?._id && (
        <>
          <div className="absolute flex justify-between top-7 right-7 w-[200px] h-10 rounded-md">
            <button
              className="flex items-center bg-gray-400 rounded-md p-1"
              onClick={() => onCLickEdit()}
            >
              <div>Update</div>
              <div>
                <FiEdit2 color="black" size={"30px"} />
              </div>
            </button>
            <button
              onClick={() => deletePost(id as string)}
              className="flex items-center bg-gray-400 rounded-md p-1"
            >
              <div>Delete</div>
              <div>
                <TbTrash color="purple" size={"30px"} />
              </div>
            </button>
          </div>

          {/* <Modal active={active} setActive={setActive}>
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
                <img src={`http://localhost:5000${imageUrl}`} alt="postImage" />
              )}
              <ModalButton onClick={() => onClickUpdatePost(id as string)}>
                Update
              </ModalButton>
            </div>
          </Modal> */}
        </>
      )}
    </div>
  )
}

export { ViewPost }
