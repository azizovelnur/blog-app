import { createSlice } from "@reduxjs/toolkit"
import { getDataFromLocalStorage } from "../../utils/getDataFromLS"
import { addPostToLS } from "../../utils/addPostToLS"

const initialState = {
  posts: getDataFromLocalStorage(),
}

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addItem(state, action) {
      const postsArr = state.posts.filter(
        (obj: any) => obj.id !== action.payload._id
      )
      state.posts = [...postsArr, action.payload]
      console.log(state.posts)
      addPostToLS(state.posts)
    },
    removeItem(state, action) {
      state.posts = state.posts.filter(
        (item: any) => item._id !== action.payload
      )
      addPostToLS(state.posts)
    },
  },
})

export const { addItem, removeItem } = postsSlice.actions

export const postsReducer = postsSlice.reducer
