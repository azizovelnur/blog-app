import { IPost, IPostMutation } from "../../../types/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `${localStorage.getItem("token")}`)
    },
  }),
  endpoints: (build) => ({
    fetchPosts: build.query<IPost[], void>({
      query: () => ({
        url: `/posts`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts" as const, _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    fetchOnePost: build.query<IPost, string>({
      query: (_id) => ({
        url: `/posts/${_id}`,
      }),
      providesTags: ["Posts"],
    }),

    fetchPopularPosts: build.query<IPost[], void>({
      query: () => ({
        url: `/posts/popular`,
      }),
    }),

    fetchCreatePost: build.mutation<IPost, IPostMutation>({
      query: (post) => {
        return {
          url: `/posts`,
          method: "POST",
          body: post,
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    fetchUpdatePost: build.mutation<IPost, IPostMutation>({
      query: (post) => {
        return {
          url: `/posts/${post._id}`,
          method: "PATCH",
          body: post,
        }
      },
      invalidatesTags: ["Posts"],
    }),

    fetchDeletePost: build.mutation<IPost, string>({
      query: (_id) => {
        return {
          url: `/posts/${_id}`,
          method: "DELETE",
        }
      },
      // invalidatesTags: ["Posts"],
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useFetchPostsQuery,
  useFetchOnePostQuery,
  useFetchPopularPostsQuery,
  useFetchCreatePostMutation,
  useFetchUpdatePostMutation,
  useFetchDeletePostMutation,
} = postsApi
