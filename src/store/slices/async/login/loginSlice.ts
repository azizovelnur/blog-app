import { IRegistration } from "../../../../models/models"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ILogin, IUserState, Status } from "../../../../models/models"
import axios from "../../../../axios/axiosConf"
import { RootState } from "../../../store"

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData: ILogin) => {
    const { data } = await axios.post("/auth/login", userData)
    return data
  }
)

export const fetchRegistration = createAsyncThunk(
  "login/fetchRegistration",
  async (userData: IRegistration) => {
    const { data } = await axios.post("/auth/register", userData)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk("login/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me")
  return data
})

const initialState: IUserState = {
  data: null,
  status: Status.LOADING,
}

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    logout: function (state) {
      state.data = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = Status.LOADED
      state.data = action.payload
    })

    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR
    })

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = Status.LOADED
      state.data = action.payload
    })

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR
    })

    builder.addCase(fetchRegistration.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })

    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.status = Status.LOADED
      state.data = action.payload
    })

    builder.addCase(fetchRegistration.rejected, (state) => {
      state.status = Status.ERROR
    })
  },
})

export const isAuthSelector = (state: RootState) => Boolean(state.login.data)
export const data = (state: RootState) => state.login.data
export const isAuthRegistration = (state: RootState) =>
  Boolean(state.login.data)
export const loginReducer = loginSlice.reducer

export const { logout } = loginSlice.actions
