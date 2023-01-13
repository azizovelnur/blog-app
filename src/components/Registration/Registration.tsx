import React, { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { IRegistration } from "../../models/models"
import {
  fetchRegistration,
  isAuthRegistration,
} from "../../store/async/login/loginSlice"
import { useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"

interface IProps {
  active: Boolean
  setActive: Dispatch<SetStateAction<Boolean>>
}
const Registration: FC<IProps> = ({ active, setActive }) => {
  const isRegistration = useSelector(isAuthRegistration)

  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<IRegistration>({
    defaultValues: {
      name: "elnur",
      email: "t@gmail.com",
      password: "t",
    },
    mode: "onChange",
  })

  const onSubmit = async (values: IRegistration) => {
    setActive(false)
    const userData = await dispatch(fetchRegistration(values))

    if (!userData.payload) {
      return alert("login error")
    }

    if (userData.payload.token) {
      localStorage.setItem("token", userData.payload.token)
    }
  }

  if (isRegistration) {
    return <Navigate to={"/"} />
  }

  return (
    <div className={"mainGrid"}>
      <div>Registration</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder={"name"}
          type="text"
          {...register("name", { required: "need your name" })}
        />
        <input
          placeholder={"email"}
          type="email"
          {...register("email", { required: "need your email" })}
        />
        <input
          placeholder={"password"}
          type="text"
          {...register("password", { required: "need your password" })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export { Registration }
