// import { addPostRecentToLS } from "./../../utils/addPostToLS"
import { IPost } from "../../../models/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { getRecentsPostsFromLS } from "../../utils/getDataFromLS"

interface IHelpersState {
  recents: IPost[]
}

const initialState: IHelpersState = {
  recents: [],
}

const helperSlice = createSlice({
  name: "utils",
  initialState,

  reducers: {
    setRecents(state, action: PayloadAction<IPost>) {
      state.recents.unshift(action.payload)
    },
  },
})

export const { setRecents } = helperSlice.actions

export const helperReducer = helperSlice.reducer
