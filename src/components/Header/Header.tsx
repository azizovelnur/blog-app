import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { isAuthSelector } from "../../store/slices/async/login/loginSlice"
import { Profile } from "./Profile"
import { Modal } from "../Modal/Modal"
import { Login } from "../Login/Login"
import { Registration } from "../Registration/Registration"
import { BiHome } from "react-icons/bi"
import { FaBlog } from "react-icons/fa"
import { GoProject } from "react-icons/go"

const Header: FC = () => {
  const isAuth = useSelector(isAuthSelector)

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
    <header className={"headerGrid z-50 fixed w-full text-[16px] headerBlur"}>
      <div className={"container mx-auto max-w-[1480px]"}>
        <div className={"flex justify-between items-center h-[50px]"}>
          <Link to={"/"}>
            <div className={"flex items-center"}>
              <h2
                className={
                  "text-[#fff] font-black text-[22px] rounded-[4px] px-[4px]"
                }
              >
                Portfolio
              </h2>
            </div>
          </Link>

          <div className="flex justify-between items-center w-1/3">
            <Link to={"/"}>
              <div className="flex">
                <BiHome size={"30px"} />
                <div className="text-[24px] ml-[2px]">Home</div>
              </div>
            </Link>
            <Link to={"/blog"}>
              <div className="flex">
                <FaBlog size={"30px"} />
                <div className="text-[24px] ml-[2px]">Blog</div>
              </div>
            </Link>
            <Link to={"/projects"}>
              <div className="flex">
                <GoProject size={"30px"} />
                <div className="text-[24px] ml-[2px]">Projects</div>
              </div>
            </Link>
          </div>

          {isAuth ? (
            <Profile />
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
