import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IRepo} from "../../models/models";


export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),

  endpoints: build => ({
      setRepos: build.query<IRepo[], null>({
        query: () => ({
          url: "users/e1nur/repos"
        })
      })
  })


})

export const {useSetReposQuery} = githubApi