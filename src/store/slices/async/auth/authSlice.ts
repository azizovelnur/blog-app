import { IUser } from "../../../../models/models"
import { IRegistration } from "../../../../models/models"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ILogin, IUserState, Status } from "../../../../models/models"
import axios from "../../../../axios/axiosConf"
import { RootState } from "../../../store"

export const fetchLogin = createAsyncThunk<IUser, ILogin>(
  "auth/fetchLogin",
  async (userData) => {
    const { data } = await axios.post<IUser>("/auth/login", userData)
    return data
  }
)

export const fetchRegistration = createAsyncThunk<IUser, IRegistration>(
  "auth/fetchRegistration",
  async (userData: IRegistration) => {
    const { data } = await axios.post<IUser>("/auth/register", userData)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk<IUser>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get<IUser>("/auth/me")
    return data
  }
)

const initialState: IUserState = {
  data: null,
  status: Status.LOADING,
}

const authSlice = createSlice({
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

export const isAuthSelector = (state: RootState) => Boolean(state.auth.data)
export const data = (state: RootState) => state.auth.data
export const isAuthRegistration = (state: RootState) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
