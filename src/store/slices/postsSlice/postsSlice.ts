import { getRecentsPostsFromLS } from "./../../../helpers/getDataFromLS"
import { IPost } from "../../../interfaces/interfaces"
import { IStatePosts } from "../../../interfaces/interfaces"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getDataFromLocalStorage } from "../../../helpers/getDataFromLS"
import { addPostToLS, addRecentsToLS } from "../../../helpers/addPostToLS"

const initialState: IStatePosts = {
  saved: getDataFromLocalStorage(),
  recents: getRecentsPostsFromLS(),
  searchValue: "",
}

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<IPost>) {
      const postsArr = state.saved.filter(
        (obj) => obj._id !== action.payload._id
      )
      state.saved = [...postsArr, action.payload]
      addPostToLS(state.saved)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.saved = state.saved.filter((item) => item._id !== action.payload)
      addPostToLS(state.saved)
    },
    setRecents(state, action: PayloadAction<IPost>) {
      state.recents = state.recents.filter(({ _id }) => {
        return _id !== action.payload._id
      })
      state.recents.unshift(action.payload)
      state.recents = state.recents.slice(0, 8)
      addRecentsToLS(state.recents)
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
  },
})

export const { addItem, removeItem, setRecents, setSearchValue } =
  postsSlice.actions

export const postsReducer = postsSlice.reducer
