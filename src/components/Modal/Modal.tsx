import React, { Dispatch, FC, SetStateAction } from "react"
import { MdClose } from "react-icons/md"
import {
  ModalContentStyle,
  ModalStyle,
} from "../StyledComponents/StyledComponents"

interface IProps {
  active: Boolean
  setActive: Dispatch<SetStateAction<Boolean>>
  children: React.ReactNode
}

const Modal: FC<IProps> = ({ active, setActive, children }) => {
  return (
    <ModalStyle isActive={active}>
      <ModalContentStyle isActive={active} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setActive(false)}
          className="absolute right-[-50px] top-[-30px]"
        >
          <MdClose color="white" fill="white" size={"30px"} />
        </button>
        {children}
      </ModalContentStyle>
    </ModalStyle>
  )
}

export { Modal }
