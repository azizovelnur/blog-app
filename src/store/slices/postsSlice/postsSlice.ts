import { getRecentsPostsFromLS } from "./../../../helpers/getDataFromLS"
import { IPost } from "./../../../models/models"
import { IStatePosts } from "./../../storeModels/storeModels"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getDataFromLocalStorage } from "../../../helpers/getDataFromLS"
import { addPostToLS, addRecentsToLS } from "../../../helpers/addPostToLS"

const initialState: IStatePosts = {
  posts: getDataFromLocalStorage(),
  findedPosts: [],
  recents: getRecentsPostsFromLS(),
}

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<IPost>) {
      const postsArr = state.posts.filter(
        (obj) => obj._id !== action.payload._id
      )
      state.posts = [...postsArr, action.payload]
      console.log(state.posts)
      addPostToLS(state.posts)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((item) => item._id !== action.payload)
      state.findedPosts = state.findedPosts.filter(
        (item) => item._id !== action.payload
      )
      addPostToLS(state.posts)
    },
    setRecents(state, action: PayloadAction<IPost>) {
      state.recents = state.recents.filter(({ _id }) => {
        return _id !== action.payload._id
      })
      state.recents.unshift(action.payload)
      state.recents = state.recents.slice(0, 8)
      addRecentsToLS(state.recents)
    },
    findPosts(state, action: PayloadAction<string>) {
      const searchValue = action.payload.toLowerCase()

      state.findedPosts = state.posts.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue)) {
          return true
        } else {
          return false
        }
      })
    },
  },
})

export const { addItem, removeItem, setRecents, findPosts } = postsSlice.actions

export const postsReducer = postsSlice.reducer
