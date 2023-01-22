import { IComment, ICreateComment } from "./../../storeModels/storeModels"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
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
              ...result.map(({ _id }) => ({ type: "Comments" as const, _id })),
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
  }),
})

export const { useFetchCommentsQuery, useFetchCreateCommentMutation } =
  commentsApi
