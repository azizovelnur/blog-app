import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  useFetchCommentsQuery,
  useFetchCreateCommentMutation,
} from "../../store/rtk/comments/commentsApi"
import { useFetchOnePostQuery } from "../../store/rtk/posts/postsApi"
import { useAppDispatch } from "../../store/store"
import { setRecents } from "../../store/slices/helperSlice/helperSlice"
import { IComment } from "../../store/storeModels/storeModels"

const ViewPost = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const [commentValue, setCommentValue] = useState<string>("")
  const [createComment, { isSuccess }] = useFetchCreateCommentMutation()

  const { data: commentsData } = useFetchCommentsQuery(id as string)
  const {
    isLoading,
    isError,
    data: onePostData,
  } = useFetchOnePostQuery(id as string)

  useEffect(() => {
    if (onePostData) {
      dispatch(setRecents(onePostData))
    }
  }, [onePostData])
  return (
    <div className="mainGrid backdrop-blur-[1px] bg-[#29183090] min-h-[600px] w-[1000px] m-auto mt-[40px] rounded-md">
      <img
        className="w-full"
        src={`http://localhost:5000${onePostData?.imageUrl}`}
        alt="postImg"
      />
      <div>{onePostData?.title}</div>
      {commentsData?.map((obj: IComment, index: number) => {
        return <div key={index}>{obj.comment}</div>
      })}
      <div>
        <input
          value={commentValue}
          onChange={(event) => setCommentValue(event?.target.value)}
          type="text"
        />
        <button
          onClick={() =>
            createComment({ postId: id as string, comment: commentValue })
          }
        >
          add Comment
        </button>
      </div>
    </div>
  )
}

export { ViewPost }
