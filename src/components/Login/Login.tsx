import React, { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { ILogin } from "../../models/models"
import { fetchLogin, isAuthSelector } from "../../store/async/login/loginSlice"
import { useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"
import { ModalButton, ModalInput } from "../StyledComponents/StyledComponents"

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
      email: "admin@gmail.com",
      password: "admin",
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

  return (
    <div>
      <div className="text-center mb-5 font-black text-2xl">Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-bold text-base">Email</div>
            <ModalInput
              placeholder={"email"}
              type="email"
              {...register("email", { required: "need your email" })}
            />
          </div>
          <div>
            <div className="font-bold text-base">Password</div>
            <ModalInput
              placeholder={"password"}
              type="text"
              {...register("password", { required: "need your password" })}
            />
          </div>
          <ModalButton type={"submit"}>Submit</ModalButton>
        </div>
      </form>
    </div>
  )
}

export { Login }
