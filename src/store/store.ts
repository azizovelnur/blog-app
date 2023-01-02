import {configureStore} from "@reduxjs/toolkit";
import {githubApi} from "./github/githubApi";
import {postsApi} from "./posts/postsApi";
import {loginApi} from "./login/loginApi";


export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware, postsApi.middleware, loginApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
