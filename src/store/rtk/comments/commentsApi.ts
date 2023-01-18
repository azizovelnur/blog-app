import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `${localStorage.getItem("token")}`)
    },
  }),
  endpoints: (build) => ({
    fetchComments: build.query({
      query: (id) => ({
        url: `/posts/comments/${id}`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Comments", id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),

    fetchCreateComment: build.mutation({
      query: (postIdAndComment) => {
        return {
          url: `/comments/${postIdAndComment.postId}`,
          method: "POST",
          body: postIdAndComment,
        }
      },
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
})

export const { useFetchCommentsQuery, useFetchCreateCommentMutation } =
  commentsApi
