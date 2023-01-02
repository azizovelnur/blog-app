import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const loginApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/auth'}
  ),
  endpoints: (build ) => ({
      fetchAuth: build.mutation({
        query: (userData) => ( {
          url: `/login`,
          method: 'POST',
          userData
        } )
      })
  })
})

export const {useFetchAuthMutation} = loginApi