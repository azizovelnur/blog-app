// import { addPostRecentToLS } from "./../../utils/addPostToLS"
import { IPost } from "./../../models/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { getRecentsPostsFromLS } from "../../utils/getDataFromLS"

interface utilsState {
  recents: IPost[]
}

const initialState: utilsState = {
  recents: [],
}

const utilsSlice = createSlice({
  name: "utils",
  initialState,

  reducers: {
    setRecents(state, action: PayloadAction<IPost>) {
      state.recents.unshift(action.payload)
    },
  },
})

export const { setRecents } = utilsSlice.actions

export const utilsReducer = utilsSlice.reducer
