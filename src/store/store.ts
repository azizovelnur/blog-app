import {configureStore} from "@reduxjs/toolkit";
import {githubApi} from "./rtk/github/githubApi";
import {postsApi} from "./rtk/posts/postsApi";
import {loginReducer} from "./async/login/loginSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware, postsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
