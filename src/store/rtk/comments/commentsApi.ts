import { IComment, ICreateComment } from "./../../../types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
interface Iids {
  postId: string
  commentId: string
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `${localStorage.getItem("token")}`)
    },
  }),
  endpoints: (build) => ({
    fetchComments: build.query<IComment[], string>({
      query: (id) => ({
        url: `/posts/comments/${id}`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments" as const, id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),

    fetchCreateComment: build.mutation<IComment, ICreateComment>({
      query: (comment) => {
        return {
          url: `/comments/${comment.postId}`,
          method: "POST",
          body: comment,
        }
      },
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    fetchDeleteComment: build.mutation<IComment, Iids>({
      query: (values) => {
        return {
          url: `/comments/${values.postId}/${values.commentId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
})

export const {
  useFetchCommentsQuery,
  useFetchCreateCommentMutation,
  useFetchDeleteCommentMutation,
} = commentsApi
