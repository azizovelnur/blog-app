import {configureStore} from "@reduxjs/toolkit";
import {userApi} from "./userApi";
import {githubApi} from "./github/githubApi";
import {postsApi} from "./posts/postsApi";


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, githubApi.middleware, postsApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
