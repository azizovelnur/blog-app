import React from "react"
import { useParams } from "react-router-dom"
import { useFetchOnePostQuery } from "../../store/rtk/posts/postsApi"

const ViewPost = () => {
  const { id } = useParams()
  const { isLoading, isError, data: onePostData } = useFetchOnePostQuery(id)
  return (
    <div className="mainGrid bg-purple-500 h-20 w-[400px]">
      <div>{onePostData?.title}</div>
    </div>
  )
}

export { ViewPost }
