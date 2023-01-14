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

  // if (isAuth) {
  //   return <Navigate to={"/"} />
  // }

  return (
    <div>
      <div className="text-center mb-5 font-black text-2xl">Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-bold text-base">Email</div>
            <input
              className={
                "rounded-[4px] w-full mb-10 border-fuchsia-700 border-4 outline-none p-2"
              }
              placeholder={"email"}
              type="email"
              {...register("email", { required: "need your email" })}
            />
          </div>
          <div>
            <div className="font-bold text-base">Password</div>
            <input
              className={
                "rounded-[4px] w-full mb-10 border-fuchsia-700 border-4 outline-none p-2"
              }
              placeholder={"password"}
              type="text"
              {...register("password", { required: "need your password" })}
            />
          </div>
          <button
            className={"bg-black text-white rounded-[10px] h-8 w-2/3 mx-auto"}
            type={"submit"}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export { Login }
