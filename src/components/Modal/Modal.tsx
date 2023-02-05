import React, { Dispatch, FC, SetStateAction } from "react"
import { MdClose } from "react-icons/md"
import {
  ModalContentStyle,
  ModalStyle,
} from "../StyledComponents/StyledComponents"

interface IProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const Modal: FC<IProps> = ({ active, setActive, children }) => {
  return (
    <ModalStyle $active={active}>
      <ModalContentStyle $active={active} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setActive(false)}
          className="absolute right-[-50px] top-[-30px] max-md:top-3 max-md:right-3 dark:text-white text-black"
        >
          <MdClose size={"30px"} />
        </button>
        {children}
      </ModalContentStyle>
    </ModalStyle>
  )
}
