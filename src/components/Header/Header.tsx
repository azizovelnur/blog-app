import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isAuthSelector, logout } from "../../store/async/login/loginSlice"
import { Profile } from "./Profile"
import { Modal } from "../Modal/Modal"
import { Login } from "../Login/Login"
import { Registration } from "../Registration/Registration"

const Header: FC = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const [modalActive, setModalActive] = useState<Boolean>(false)
  const [loginActive, setLoginActive] = useState<Boolean>(false)
  const [registrationActive, setRegistationActive] = useState<Boolean>(false)

  const onClicklogOut = () => {
    dispatch(logout())
    localStorage.removeItem("token")
  }

  const onClickRegistration = () => {
    setLoginActive(false)
    setRegistationActive(true)
    setModalActive(true)
  }

  const onClickLogin = () => {
    setRegistationActive(false)
    setLoginActive(true)
    setModalActive(true)
  }

  return (
    <header
      className={
        "headerGrid fixed w-full text-[16px] bg-[#fff] text-[#000] border-b-[1px] border-b-[#e0e0e0]"
      }
    >
      <div className={"container mx-auto max-w-[1480px]"}>
        <div className={"flex justify-between items-center h-[50px]"}>
          <Link to={"/"}>
            <div className={"flex items-center"}>
              <h2
                className={
                  "text-[#fff] font-black bg-black text-[22px] rounded-[4px] px-[4px]"
                }
              >
                Portfolio
              </h2>
            </div>
          </Link>

          <div className={"flex justify-between w-[160px] items-center"}>
            {isAuth ? (
              <button
                onClick={() => onClicklogOut()}
                className={
                  "bg-black text-white cursor-pointer rounded-[4px] p-[2px]"
                }
              >
                Log Out
              </button>
            ) : (
              <div
                onClick={() => onClickLogin()}
                className={
                  "bg-black text-white cursor-pointer h-[30px] rounded-[4px] p-[2px]"
                }
              >
                <span>Log In</span>
              </div>
            )}

            {!isAuth && (
              <div
                onClick={() => onClickRegistration()}
                className={
                  "bg-black text-white cursor-pointer h-[30px] rounded-[4px] p-[2px]"
                }
              >
                <span>Register</span>
              </div>
            )}

            <Modal active={modalActive} setActive={setModalActive}>
              {loginActive && (
                <Login active={modalActive} setActive={setModalActive} />
              )}
              {registrationActive && (
                <Registration active={modalActive} setActive={setModalActive} />
              )}
            </Modal>

            <Profile />
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }
