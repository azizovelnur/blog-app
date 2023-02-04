import React, { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { ILogin, IUser } from "../../types/types"
import { fetchLogin, data } from "../../store/slices/async/auth/authSlice"
import { useAppDispatch } from "../../hooks/hooks"
import { useAppSelector } from "../../hooks/hooks"
import { ModalButton, ModalInput } from "../StyledComponents/StyledComponents"

interface IProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

interface IFetchData {
  payload: IUser | any
}

export const Login: FC<IProps> = ({ active, setActive }) => {
  const isAuth = useAppSelector(data)
  console.log(isAuth)

  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (values: ILogin) => {
    setActive(false)
    const userData: IFetchData = await dispatch(fetchLogin(values))
    console.log(userData)

    if (!userData.payload) {
      return alert("auth error")
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
