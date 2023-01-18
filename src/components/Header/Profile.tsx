import React, { useState, FC, useEffect, useRef } from "react"
import { FaUserAlt } from "react-icons/fa"
import { HiArrowDown, HiArrowUp, HiOutlineUserCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { data, logout } from "../../store/async/login/loginSlice"
import { MdOutlineMail } from "react-icons/md"

const Profile: FC = () => {
  const [open, setOpen] = useState<Boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const userData = useSelector(data)
  const dispatch = useDispatch()

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
    <div ref={profileRef} className={"relative"}>
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between w-[40px] h-[30px]  items-center rounded-[4px] p-[2px] cursor-pointer"
      >
        <FaUserAlt color="white" />
        {open ? <HiArrowUp color="white" /> : <HiArrowDown color="white" />}
      </div>

      {open && (
        <div className="absolute bg-[#29183090] rounded-[10px] p-2 backdrop-blur-md top-[32px] right-[0px] w-[200px] h-[200px] text-white">
          <div className="flex justify-between flex-col h-full">
            <div>
              <div className="flex items-center">
                <HiOutlineUserCircle size={"20px"} className="mr-[10px]" />
                {userData?.userName}
              </div>
              <div className="flex items-center">
                <MdOutlineMail size={"20px"} className="mr-[10px]" />
                {userData?.email}
              </div>
            </div>

            <button
              onClick={() => onClicklogOut()}
              className="bg-[#501c529f] rounded-lg w-full h-10"
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
