import { commentsApi } from "./rtk/comments/commentsApi"
import { configureStore } from "@reduxjs/toolkit"
import { githubApi } from "./rtk/github/githubApi"
import { postsApi } from "./rtk/posts/postsApi"
import { authReducer } from "./slices/async/auth/authSlice"
import { postsReducer } from "./slices/postsSlice/postsSlice"
import { helperReducer } from "./slices/helperSlice/helperSlice"

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    auth: authReducer,
    posts: postsReducer,
    helper: helperReducer,
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
