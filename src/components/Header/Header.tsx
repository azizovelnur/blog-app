import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"
import { data } from "../../store/slices/async/auth/authSlice"
import { Profile } from "./Profile"
import { Modal } from "../Modal/Modal"
import { Login } from "../Login/Login"
import { Registration } from "../Registration/Registration"
import { BiHome } from "react-icons/bi"
import { FaBlog } from "react-icons/fa"
import { AddPost } from "../AddPost/AddPost"

const Header: FC = () => {
  const isAuth = useAppSelector(data)

  const [modalActive, setModalActive] = useState<Boolean>(false)
  const [loginActive, setLoginActive] = useState<Boolean>(false)
  const [registrationActive, setRegistationActive] = useState<Boolean>(false)

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
    <header className={"headerGrid z-50 fixed w-full text-[16px] bg-[#fff]"}>
      <div className={"container mx-auto max-w-7xl"}>
        <div className={"flex justify-between items-center h-[50px]"}>
          <Link to={"/"}>
            <div className={"flex items-center"}>
              <h2
                className={
                  "text-[#000] font-black text-[22px] rounded-[4px] px-[4px]"
                }
              >
                Blog
              </h2>
            </div>
          </Link>

          {isAuth ? (
            <>
              <AddPost />
              <Profile />
            </>
          ) : (
            <div className="flex justify-between w-[140px] items-center">
              <div
                onClick={() => onClickLogin()}
                className={
                  "text-white cursor-pointer h-[30px] rounded-[4px] p-[2px]"
                }
              >
                <span>Log In</span>
              </div>
              <div
                onClick={() => onClickRegistration()}
                className={
                  "text-white cursor-pointer h-[30px] rounded-[4px] p-[2px]"
                }
              >
                <span>Register</span>
              </div>
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
        </div>
      </div>
    </header>
  )
}

export { Header }
