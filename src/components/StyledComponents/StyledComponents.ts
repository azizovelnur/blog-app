import styled from "styled-components"

interface IModalProps {
  isActive: Boolean
}
export const ModalButton = styled.button`
  color: white;
  background-color: black;
  border-radius: 10px;
  height: 40px;
  width: 66%;
  margin: 0 auto;
`
export const ModalInput = styled.input`
  color: black;
  background-color: #ccc;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  padding: 8px;
  margin-bottom: 40px;
  outline: none;
`
export const ModalTextArea = styled.textarea`
  color: black;
  min-height: 100px;
  max-height: 100px;
  border-radius: 4px;
  background-color: #ccc;
  width: 100%;
  padding: 8px;
  margin-bottom: 40px;
  outline: none;
`
export const ModalStyle = styled.section<IModalProps>`
  z-index: 50;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.isActive ? "#4747478d" : "transperent"};
  transition-duration: 200ms;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  height: 100vh;
  width: 100vw;
`
export const ModalContentStyle = styled.div<IModalProps>`
  background-color: white;
  position: relative;
  transform: ${(props) => (props.isActive ? "scale(1)" : "scale(0.5)")};
  transition: 0.4s all;
  padding: 20px;
  width: 25vw;
  border-radius: 10px;
  @media (max-width: 1024px) {
    width: 50vh;
  }
  @media (max-width: 768px) {
    width: 45vh;
  }
`
