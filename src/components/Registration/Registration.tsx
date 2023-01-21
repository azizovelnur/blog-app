import React, { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { IRegistration } from "../../models/models"
import {
  fetchRegistration,
  isAuthRegistration,
} from "../../store/slices/async/login/loginSlice"
import { useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"
import { ModalButton, ModalInput } from "../StyledComponents/StyledComponents"

interface IProps {
  active: Boolean
  setActive: Dispatch<SetStateAction<Boolean>>
}
const Registration: FC<IProps> = ({ active, setActive }) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<IRegistration>({
    defaultValues: {
      name: "admin",
      email: "admin@gmail.com",
      password: "admin",
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

  return (
    <div>
      <div className="text-center mb-5 font-black text-2xl">Registration</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-bold text-base">Name</div>
            <ModalInput
              placeholder={"name"}
              type="text"
              {...register("name", { required: "need your name" })}
            />
          </div>
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
          <ModalButton type="submit">Submit</ModalButton>
        </div>
      </form>
    </div>
  )
}

export { Registration }
