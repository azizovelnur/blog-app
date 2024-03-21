import React, { Dispatch, FC, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { IRegistration, IUser } from "../../interfaces/interfaces"
import { fetchRegistration } from "../../store/slices/async/auth/authSlice"
import { useAppDispatch } from "../../hooks/hooks"
import { ModalButton, ModalInput } from "../StyledComponents/StyledComponents"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

interface IProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}
interface IFetchData {
  payload: IUser | any
}
export const Registration: FC<IProps> = ({ active, setActive }) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRegistration>({ mode: "onChange" })

  const onSubmit = async (values: IRegistration) => {
    setActive(false)
    const userData: IFetchData = await dispatch(fetchRegistration(values))

    if (!userData.payload) {
      return alert("Registration Error")
    }

    if (userData.payload.token) {
      localStorage.setItem("token", userData.payload.token)
    }
    reset()
  }
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

  return (
    <div>
      <div className="text-center mb-5 font-black text-2xl">Registration</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-between">
          <label>
            <div className="text-[12px] font-bold text-red-800">
              {errors?.name?.message}
            </div>
            <ModalInput
              placeholder={"name"}
              type="text"
              {...register("name", {
                required: "please enter the name",
                minLength: {
                  value: 3,
                  message: "min length 3 symbol",
                },
              })}
            />
          </label>
          <label>
            <div className="text-[12px] font-bold text-red-800">
              {errors?.email?.message}
            </div>
            <ModalInput
              placeholder={"email"}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: "please enter the valid email",
                },
              })}
            />
          </label>
          <label>
            <div className="text-[12px] font-bold text-red-800">
              {errors?.password?.message}
            </div>

            <div className="relative">
              <div
                onClick={() => setPasswordVisible(!isPasswordVisible)}
                className="absolute top-[10px] right-2"
              >
                {isPasswordVisible ? (
                  <AiOutlineEye size={"20px"} />
                ) : (
                  <AiOutlineEyeInvisible size={"20px"} />
                )}
              </div>
              <ModalInput
                placeholder={"password"}
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", {
                  required: "please enter the password",
                  minLength: {
                    value: 5,
                    message: "min length 5 symbol",
                  },
                })}
              />
            </div>
          </label>
          <ModalButton disabled={!isValid} type="submit">
            Submit
          </ModalButton>
        </div>
      </form>
    </div>
  )
}
