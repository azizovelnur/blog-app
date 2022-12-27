import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}
  ),
  endpoints: (build ) => ({
      fetchAllUsers: build.query({
        query: () => ( {
          url: `/users`
        } )
      }),

      fetchDeleteUser: build.mutation({
        query: (user) => ( {
          url: `/users/`,
          method: 'POST',
          user
        } )
      })
  })

})

export const {useFetchAllUsersQuery, useFetchDeleteUserMutation} = userApi