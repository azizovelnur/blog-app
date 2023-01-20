import { createSlice } from "@reduxjs/toolkit"
import { getDataFromLocalStorage } from "../../utils/getDataFromLS"
import { addPostToLS } from "../../utils/addPostToLS"

const initialState = {
  posts: getDataFromLocalStorage(),
  findedPosts: [],
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
      state.findedPosts = state.findedPosts.filter(
        (item: any) => item._id !== action.payload
      )
      addPostToLS(state.posts)
    },
    findPosts(state, action) {
      const searchValue = action.payload.toLowerCase()

      state.findedPosts = state.posts.filter((obj: any) => {
        if (obj.title.toLowerCase().includes(searchValue)) {
          return true
        } else {
          return false
        }
      })
    },
  },
})

export const { addItem, removeItem, findPosts } = postsSlice.actions

export const postsReducer = postsSlice.reducer
