import React, { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { ILogin } from "../../models/models"
import { fetchLogin, isAuthSelector } from "../../store/async/login/loginSlice"
import { useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"

interface IProps {
  active: Boolean
  setActive: Dispatch<SetStateAction<Boolean>>
}

const Login: FC<IProps> = ({ active, setActive }) => {
  const isAuth = useSelector(isAuthSelector)
  console.log(isAuth)

  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      email: "t@gmail.com",
      password: "t",
    },
    mode: "onChange",
  })

  const onSubmit = async (values: ILogin) => {
    setActive(false)
    const userData = await dispatch(fetchLogin(values))

    if (!userData.payload) {
      return alert("login error")
    }

    if (userData.payload.token) {
      localStorage.setItem("token", userData.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className={"mainGrid"}>
      <div>Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  )
}

export { Login }
