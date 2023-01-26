import { addRecentsToLS } from "./../../../helpers/addPostToLS"
import { IPost } from "../../../models/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IHelpersState } from "../../storeModels/storeModels"
import { getRecentsPostsFromLS } from "../../../helpers/getDataFromLS"

const initialState: IHelpersState = {
  recents: getRecentsPostsFromLS(),
}

const helperSlice = createSlice({
  name: "utils",
  initialState,

  reducers: {
    setRecents(state, action: PayloadAction<IPost>) {
      state.recents = state.recents.filter(({ _id }) => {
        return _id !== action.payload._id
      })
      state.recents.unshift(action.payload)
      state.recents = state.recents.slice(0, 8)
      addRecentsToLS(state.recents)
    },
  },
})

export const { setRecents } = helperSlice.actions

export const helperReducer = helperSlice.reducer
