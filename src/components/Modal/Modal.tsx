import React, { Dispatch, FC, SetStateAction } from "react"
import { GrClose } from "react-icons/gr"

interface IProps {
  active: Boolean
  setActive: Dispatch<SetStateAction<Boolean>>
  children: React.ReactNode
}

const Modal: FC<IProps> = ({ active, setActive, children }) => {
  return (
    <section
      className={
        active
          ? "z-50 opacity-100 pointer-events-auto duration-200 h-[100vh] w-[100vw] bg-black/50 fixed top-0 left-0 flex items-center justify-center"
          : "z-50 opacity-0 pointer-events-none duration-200 h-[100vh] w-[100vw] bg-black/50 fixed top-0 left-0 flex items-center justify-center"
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          active
            ? "relative scale-100 p-[20px] rounded-[12px] bg-white h-[200px] w-[400px]"
            : "relative scale-50 duration-200 p-[20px] rounded-[12px] bg-white h-[200px] w-[400px]"
        }
      >
        <button
          onClick={() => setActive(false)}
          className="absolute right-[-50px] top-[-30px] bg-gray text-yellow-300"
        >
          <GrClose className="h-[20px] w-[20px]" />
        </button>
        {children}
      </div>
    </section>
  )
}

export { Modal }
