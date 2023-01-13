import React, { useState, FC, useEffect, useRef } from "react"
import { FaUserAlt } from "react-icons/fa"
import { HiArrowDown, HiArrowUp } from "react-icons/hi"
import { useSelector } from "react-redux"
import { data } from "../../store/async/login/loginSlice"

const Profile: FC = () => {
  const [open, setOpen] = useState<Boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const userData = useSelector(data)

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
        className="flex justify-between w-[40px] h-[30px]  items-center rounded-[4px] p-[2px] bg-black cursor-pointer"
      >
        <FaUserAlt color="white" />
        {open ? <HiArrowUp color="white" /> : <HiArrowDown color="white" />}
      </div>

      {open && (
        <div
          className={
            "absolute top-[32px] right-[0px] bg-black w-[200px] h-[200px] text-white"
          }
        >
          <ul>
            <li>name: {userData?.name}</li>
            <li>email: {userData?.email}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export { Profile }
