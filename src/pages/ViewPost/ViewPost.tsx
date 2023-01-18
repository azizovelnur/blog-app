import React from "react"
import { useParams } from "react-router-dom"
import { useFetchOnePostQuery } from "../../store/rtk/posts/postsApi"

const ViewPost = () => {
  const { id } = useParams()
  const { isLoading, isError, data: onePostData } = useFetchOnePostQuery(id)
  return (
    <div className="mainGrid backdrop-blur-[1px] bg-[#29183090] min-h-[600px] w-[1000px] m-auto mt-[40px] rounded-md">
      <img
        className="w-full"
        src={`http://localhost:5000${onePostData?.imageUrl}`}
        alt="postImg"
      />
      <div>{onePostData?.title}</div>
    </div>
  )
}

export { ViewPost }
