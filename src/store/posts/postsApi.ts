import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}
  ),
  endpoints: (build) => ({

    fetchPosts: build.query({
      query: () => ({
        url: `/posts`
      }),

      providesTags: (result) =>
        result
          ? [
            ...result.map(({id}: any) => ({type: 'Posts', id})),
            {type: 'Posts', id: 'LIST'}
          ]
          : [ {type: 'Posts', id: 'LIST'} ]
,
    }),

    fetchCreatePost: build.mutation({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),

     fetchDeletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    })
  })

})

export const {useFetchPostsQuery, useFetchCreatePostMutation, useFetchDeletePostMutation} = postsApi