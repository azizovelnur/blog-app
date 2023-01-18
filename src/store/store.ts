import { commentsApi } from "./rtk/comments/commentsApi"
import { configureStore } from "@reduxjs/toolkit"
import { githubApi } from "./rtk/github/githubApi"
import { postsApi } from "./rtk/posts/postsApi"
import { loginReducer } from "./async/login/loginSlice"
import { postsReducer } from "./postsSaved/postsSaved"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    login: loginReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      githubApi.middleware,
      postsApi.middleware,
      commentsApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
