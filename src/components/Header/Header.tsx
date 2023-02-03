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
import { RootState } from "../../store/store"
import { ReactComponent as Moon } from "../../assets/images/moon.svg"
import { ReactComponent as Recents } from "../../assets/images/recents.svg"
import { ReactComponent as Saved } from "../../assets/images/saved.svg"
import { ReactComponent as Sun } from "../../assets/images/sun.svg"
import { HiOutlineHome } from "react-icons/hi"
import { BsBookmark, BsBookmarks } from "react-icons/bs"

const Header: FC = () => {
  const isAuth = useAppSelector(data)
  const dispatch = useAppDispatch()

  // const { theme } = useAppSelector((state: RootState) => state.posts)
  const [openMenu, setOpenMenu] = useState<Boolean>(false)
  const [theme, setTheme] = useState<boolean>(false)

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

  const onClickLightTheme = () => {
    setTheme(false)
    document.documentElement.classList.add("dark")
    document.body.style.backgroundColor = "#1D1D1D"
    document.body.style.transition = `background-color 0.3s ease-in`
  }
  const onClickDarkTheme = () => {
    setTheme(true)
    document.documentElement.classList.remove("dark")
    document.body.style.transition = `background-color 0.3s ease-in`
    document.body.style.backgroundColor = "#f7f8f8"
  }

  return (
    <header
      className={
        openMenu
          ? "z-30 fixed w-full text-[16px] dark:bg-[#292a2d] bg-[#fff] border-b-0 border-[#d0cdcd50]"
          : "z-30 fixed w-full text-[16px] dark:bg-[#292a2d] bg-[#fff] border-b-2 dark:border-[#201f1f50]"
      }
    >
      <div className={"container mx-auto max-w-5xl"}>
        <div className={"flex justify-between items-center h-[50px]"}>
          <div className="flex">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className={"md:hidden block w-[30px] h-[30px] max-md:ml-3"}
            >
              {openMenu ? (
                <IoCloseSharp
                  className={"fill-black h-[30px] w-[30px] dark:fill-[#999]"}
                />
              ) : (
                <GiHamburgerMenu
                  className={"fill-black h-[30px] w-[30px] dark:fill-[#999]"}
                />
              )}
            </button>
            <Link to={"/"} className="max-md:hidden">
              <div className={"flex items-center"}>
                <h2
                  className={
                    "text-[#000] dark:text-[#999999] font-black text-[22px] rounded-[4px] px-[4px]"
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
                ? "md:hidden absolute w-full z-30 top-[50px] bg-white  text-black text-[24px] border-b-2 border-[#d0cdcd50] dark:bg-[#292a2d] dark:border-[#201f1f50]"
                : "md:block hidden dark:text-[#999999] text-[18px]"
            }
          >
            <ul
              className={
                openMenu
                  ? "flex flex-col items-center justify-between text-black dark:text-[#999] text-[18px]"
                  : "flex justify-between w-[280px]"
              }
            >
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? "h-[30px] flex text-green-600"
                      : "h-[30px] flex hover:text-green-600 duration-200"
                  }
                  onClick={() => setOpenMenu(false)}
                  to={"/"}
                >
                  <div>
                    <HiOutlineHome size={"22px"} />
                  </div>
                  <div>Home</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? "h-[30px] flex text-green-600"
                      : "h-[30px] flex hover:fill-green-600 hover:text-green-600 duration-200"
                  }
                  onClick={() => setOpenMenu(false)}
                  to={"/saved"}
                >
                  <div>
                    <Saved />
                  </div>
                  <div>Saved</div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? "h-[30px] flex text-green-600 fill-green-600"
                      : "h-[30px] flex dark:fill-[#999] hover:fill-green-600 dark:hover:fill-green-600 hover:text-green-600 duration-200"
                  }
                  onClick={() => setOpenMenu(false)}
                  to={"/recents"}
                >
                  <div className="">
                    <Recents />
                  </div>
                  <div>Recents</div>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div>
            {theme ? (
              <button
                onClick={() => onClickLightTheme()}
                className="text-[30px] w-8"
              >
                <Moon />
              </button>
            ) : (
              <button
                onClick={() => onClickDarkTheme()}
                className="text-[30px] w-8"
              >
                <Sun />
              </button>
            )}
          </div>
          {isAuth ? (
            <div className="flex justify-between  items-center">
              <Profile openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </div>
          ) : (
            <div className="flex justify-between w-[160px] items-center">
              <div
                onClick={() => onClickLogin()}
                className={
                  "dark:text-[#cacaca] text-white font-bold cursor-pointer rounded-md px-2 bg-green-700"
                }
              >
                <span>Login</span>
              </div>
              <div
                onClick={() => onClickRegistration()}
                className={
                  "dark:text-[#cacaca] text-white font-bold cursor-pointer rounded-md px-2 bg-green-700"
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
