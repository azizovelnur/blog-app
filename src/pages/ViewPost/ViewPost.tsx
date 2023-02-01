import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useFetchCommentsQuery,
  useFetchCreateCommentMutation,
  useFetchDeleteCommentMutation,
} from "../../store/rtk/comments/commentsApi"
import {
  useFetchDeletePostMutation,
  useFetchOnePostQuery,
  useFetchUpdatePostMutation,
} from "../../store/rtk/posts/postsApi"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setRecents } from "../../store/slices/postsSlice/postsSlice"
import { IComment, ICreateComment } from "../../store/storeModels/storeModels"
import { data } from "../../store/slices/async/auth/authSlice"
import { Iids, TPost } from "../../models/models"
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
import { HiOutlineUserCircle } from "react-icons/hi"
import { BsDownload } from "react-icons/bs"
import { IoArrowBack } from "react-icons/io5"

const ViewPost = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { id } = useParams()

  const {
    isLoading,
    isError,
    data: onePostData,
  } = useFetchOnePostQuery(id as string, { refetchOnMountOrArgChange: true })
  const { data: commentsData } = useFetchCommentsQuery(id as string)
  const dispatch = useAppDispatch()
  const [commentValue, setCommentValue] = useState<string>("")
  const [createComment, { isSuccess: isSuccessComments }] =
    useFetchCreateCommentMutation()
  const [removePost] = useFetchDeletePostMutation()
  const [updatePost, { isSuccess }] = useFetchUpdatePostMutation()
  const [deleteComment, { isSuccess: isSuccessComment }] =
    useFetchDeleteCommentMutation()
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

  const onClickCreateComment = async ({ postId, comment }: ICreateComment) => {
    createComment({ postId, comment })
    setCommentValue("")
  }

  useEffect(() => {
    if (onePostData) {
      dispatch(setRecents(onePostData))
    }
  }, [onePostData])
  return (
    <div className="relative bg-white min-h-[600px] w-full mt-[40px] rounded-3xl p-20 max-md:p-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center mr-2 justify-between w-[100px] bg-black rounded-md text-white px-2 h-10"
        >
          <div>Back</div>
          <div>
            <IoArrowBack color={"white"} size={"30px"} />
          </div>
        </button>
        {onePostData?.user._id === userData?._id && (
          <div className="flex justify-between top-7 right-7 w-[220px] h-10 rounded-md">
            <button
              className="flex items-center justify-between bg-black text-white rounded-md p-1 w-[100px] h-10"
              onClick={() => onCLickEdit()}
            >
              <div>Update</div>
              <div>
                <FiEdit2 color="white" size={"30px"} />
              </div>
            </button>
            <button
              onClick={() => deletePost(id as string)}
              className="flex items-center justify-between bg-black text-white rounded-md p-1 w-[100px] h-10"
            >
              <div>Delete</div>
              <div>
                <TbTrash color="white" size={"30px"} />
              </div>
            </button>
          </div>
        )}
      </div>
      {userData && active && (
        <div className={"flex flex-col justify-between mb-14 mt-6"}>
          <div>
            <div className="font-bold text-base">Title</div>
            <input
              className="text-black bg-[#ccc] rounded h-10 w-full p-2 mb-10 outline-none"
              value={newPost.title}
              name={"title"}
              onChange={changeHandler}
              placeholder={"title"}
              type="text"
            />
          </div>
          <div>
            <div className="font-bold text-base">Text</div>
            <textarea
              className="text-blakc bg-[#ccc] rounded w-full p-2 mb-10 min-h-[100px] max-h-[200px] outline-none"
              value={newPost.text}
              name={"text"}
              onChange={changeHandler}
              placeholder={"text..."}
            />
          </div>
          <input
            ref={inputFileRef}
            className="hidden"
            onChange={handlerChangeFile}
            type="file"
          />

          <button
            onClick={() => inputFileRef.current?.click()}
            className="bg-black text-white w-[200px] mx-auto mb-8 px-3 flex justify-between items-center  rounded-md p-1"
          >
            <div>Download Image</div>
            <div>
              <BsDownload size={"40px"} />
            </div>
          </button>
          {imageUrl && (
            <img
              className="w-full rounded-xl mb-10"
              src={`http://localhost:5000${imageUrl}`}
              alt="postImage"
            />
          )}
          <button
            className="text-white bg-black rounded-md w-[50%] h-10 mx-auto"
            onClick={() => onClickUpdatePost(id as string)}
          >
            Update
          </button>
        </div>
      )}

      <h1 className="text-[34px] font-bold mt-8">{onePostData?.title}</h1>
      <div className="text-[12px] text-gray-400 mb-9">
        {onePostData?.createdAt}
      </div>
      <div className="mb-4">
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
      <p className="text-[18px] mb-7">{onePostData?.text}</p>
      <div className="mb-14">
        {commentsData?.map((obj: IComment, index: number) => {
          return (
            <div key={index} className="relative bg-[#e4e3e3] mb-7 rounded-md">
              <div className="flex items-center">
                <div>
                  <HiOutlineUserCircle size={"20px"} />
                </div>
                <div className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {obj.user.userName}
                </div>
              </div>
              <div className="ml-2 my-2">{obj.comment}</div>
              {userData?._id === obj.user._id && (
                <button
                  className="absolute top-3 right-2"
                  onClick={() =>
                    deleteComment({
                      postId: id as string,
                      commentId: obj._id,
                    })
                  }
                >
                  <TbTrash size={"30px"} />
                </button>
              )}
            </div>
          )
        })}
      </div>
      {userData && (
        <div className="flex justify-between max-sm:flex-col">
          <input
            className="w-[75%] pl-4 border-[#000] border-[1px] h-11 outline-none max-sm:w-full mb-4"
            value={commentValue}
            onChange={(event) => setCommentValue(event?.target.value)}
            type="text"
          />
          <button
            className="w-[20%] bg-black text-white h-11 rounded-md font-bold max-sm:w-full"
            onClick={() =>
              onClickCreateComment({
                postId: id as string,
                comment: commentValue,
              })
            }
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  )
}

export { ViewPost }
