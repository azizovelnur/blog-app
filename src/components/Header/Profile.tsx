import React, { useState, FC, useEffect, useRef } from "react"
import { FaUserAlt } from "react-icons/fa"
import { HiArrowDown, HiArrowUp, HiOutlineUserCircle } from "react-icons/hi"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { data, logout } from "../../store/slices/async/auth/authSlice"
import { MdOutlineMail } from "react-icons/md"
import { RootState } from "../../store/store"

interface IProfileProps {
  openMenu: boolean
  setOpenMenu: (openMenu: boolean) => void
}

const Profile: FC<IProfileProps> = ({ openMenu, setOpenMenu }) => {
  // const { theme } = useAppSelector((state: RootState) => state.posts)
  const [open, setOpen] = useState<boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const userData = useAppSelector(data)
  const dispatch = useAppDispatch()

  const onClicklogOut = () => {
    dispatch(logout())
    localStorage.removeItem("token")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !event.composedPath().includes(profileRef.current)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      onClick={() => setOpenMenu(false)}
      ref={profileRef}
      className={"relative max-lg:mr-3"}
    >
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between w-[40px] h-[30px]  items-center rounded-[4px] p-[2px] cursor-pointer dark:text-[#999]"
      >
        <FaUserAlt />
        {open ? <HiArrowUp /> : <HiArrowDown />}
      </div>

      {open && (
        <div className="absolute rounded-[10px] p-2 bg-[#fff] text-black top-[32px] right-[0px] w-[200px] h-[200px] border-[#ccc] dark:border-[#201f1f50] border-[2px] dark:bg-[#292a2d] dark:text-[#999999]">
          <div className="flex justify-between flex-col h-full">
            <div>
              <div className="flex items-center">
                <div>
                  <HiOutlineUserCircle size={"20px"} />
                </div>
                <div className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userData?.userName}
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <MdOutlineMail size={"20px"} />
                </div>
                <div className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {userData?.email}
                </div>
              </div>
            </div>

            <button
              onClick={() => onClicklogOut()}
              className="bg-black text-white rounded-lg w-full h-10"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export { Profile }
