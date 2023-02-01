import React, { FC, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { data } from "../../store/slices/async/auth/authSlice"
import { Profile } from "./Profile"
import { Modal } from "../Modal/Modal"
import { Login } from "../Login/Login"
import { Registration } from "../Registration/Registration"
import { BiHome } from "react-icons/bi"
import { FaBlog } from "react-icons/fa"
import { AddPost } from "../AddPost/AddPost"
import { IoCloseSharp } from "react-icons/io5"
import { GiHamburgerMenu } from "react-icons/gi"
import { setOpenMenu } from "../../store/slices/postsSlice/postsSlice"
import { RootState } from "../../store/store"
import { ReactComponent as Moon } from "../../assets/images/moon.svg"

const Header: FC = () => {
  const isAuth = useAppSelector(data)
  const dispatch = useAppDispatch()

  const { openMenu } = useAppSelector((state: RootState) => state.posts)

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
    <header
      className={
        openMenu
          ? "z-30 fixed w-full text-[16px] bg-[#fff] border-b-0 border-[#d0cdcd50]"
          : "z-30 fixed w-full text-[16px] bg-[#fff] border-b-2"
      }
    >
      <div className={"container mx-auto max-w-5xl"}>
        <div className={"flex justify-between items-center h-[50px]"}>
          <div className="flex">
            <button
              onClick={() => dispatch(setOpenMenu(!openMenu))}
              className={"md:hidden block w-[30px] h-[30px] max-md:ml-3"}
            >
              {openMenu ? (
                <IoCloseSharp className={"fill-black h-[30px] w-[30px]"} />
              ) : (
                <GiHamburgerMenu className={"fill-black h-[30px] w-[30px]"} />
              )}
            </button>
            <Link to={"/"} className="max-md:hidden">
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
          </div>

          <nav
            className={
              openMenu
                ? "md:hidden absolute w-full z-30 top-[50px] bg-white text-black text-[24px] border-b-2 border-[#d0cdcd50]"
                : "md:block hidden"
            }
          >
            <ul
              className={
                openMenu
                  ? "flex flex-col items-center justify-between"
                  : "flex justify-between w-[200px]"
              }
            >
              <li>
                <NavLink onClick={() => dispatch(setOpenMenu(false))} to={"/"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => dispatch(setOpenMenu(false))}
                  to={"/saved"}
                >
                  Saved
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => dispatch(setOpenMenu(false))}
                  to={"/recents"}
                >
                  Recents
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="text-[30px] w-8">
            <Moon />
          </div>
          {isAuth ? (
            <div className="flex justify-between  items-center">
              <Profile />
            </div>
          ) : (
            <div className="flex justify-between w-[120px] items-center">
              <div
                onClick={() => onClickLogin()}
                className={
                  "text-black cursor-pointer h-[30px] rounded-[4px] p-[2px]"
                }
              >
                <span>Login</span>
              </div>
              <div
                onClick={() => onClickRegistration()}
                className={
                  "text-black cursor-pointer h-[30px] rounded-[4px] p-[2px]"
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
