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
    <div>
      <div className="text-center mb-5 font-black text-2xl">Registration</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-bold text-base">Name</div>
            <input
              className={
                "rounded-[4px] w-full mb-10 border-fuchsia-700 border-4 outline-none p-2"
              }
              placeholder={"name"}
              type="text"
              {...register("name", { required: "need your name" })}
            />
          </div>
          <div>
            <div className="font-bold text-base">Email</div>
            <input
              placeholder={"email"}
              className={
                "rounded-[4px] w-full mb-10 border-fuchsia-700 border-4 outline-none p-2"
              }
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
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export { Registration }
