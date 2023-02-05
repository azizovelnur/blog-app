import tw from "tailwind-styled-components"
interface IModalProps {
  $active: boolean
}
export const ModalButton = tw.button`
  disabled:opacity-50
  text-white
  bg-black
  dark:bg-green-700
  h-[40px]
  w-[66%]
  rounded-md
  mx-auto
`
export const ModalInput = tw.input`
  text-black 
  dark:text-white
  dark:bg-[#2d2d2d]
  bg-[#ccc]
  outline-none
  rounded
  h-10
  w-full
  p-2 
  mb-10  
`
export const ModalTextArea = tw.textarea`
  text-black rounded w-full  p-2 mb-4 bg-[#ccc] max-h-[100px] min-h-[100px] outline-none dark:bg-[#2d2d2d] dark:text-white
`
export const ModalStyle = tw.section<IModalProps>`
 z-50
 flex
 fixed
 top-0
 left-0
 duration-200 
 justify-center
 items-center
 h-screen
 w-screen
 ${(props) => (props.$active ? "bg-[#4747478d]" : "bg-transparent")}
 ${(props) => (props.$active ? "opacity-1" : "opacity-0")}
 ${(props) => (props.$active ? "pointer-events-auto" : "pointer-events-none")}
`
export const ModalContentStyle = tw.div<IModalProps>`
  relative
  bg-white
  text-black
  dark:text-[#999999]
  dark:bg-[#1d1d1d]
  ${(props) => (props.$active ? "scale-100" : "scale-50")};
  duration-300
  p-[20px]
  w-[25vw]
  rounded-lg
  max-lg:w-[50vh]
  max-md:w-[45vh]
`
