import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `${localStorage.getItem("token")}`)
    },
  }),
  endpoints: (build) => ({
    fetchPosts: build.query({
      query: () => ({
        url: `/posts`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    fetchOnePost: build.query({
      query: (_id) => ({
        url: `/posts/${_id}`,
      }),
    }),

    fetchCreatePost: build.mutation({
      query: (post) => {
        return {
          url: `/posts`,
          method: "POST",
          body: post,
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    fetchUpdatePost: build.mutation({
      query: (post) => {
        const postId = post._id
        delete post._id
        return {
          url: `/posts/${postId}`,
          method: "PATCH",
          body: post,
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    fetchDeletePost: build.mutation({
      query: (_id) => {
        return {
          url: `/posts/${_id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useFetchPostsQuery,
  useFetchOnePostQuery,
  useFetchCreatePostMutation,
  useFetchUpdatePostMutation,
  useFetchDeletePostMutation,
} = postsApi
