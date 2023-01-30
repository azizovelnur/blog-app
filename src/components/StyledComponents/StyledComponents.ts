import styled from "styled-components"

interface IModalProps {
  isActive: Boolean
}
export const ModalButton = styled.button`
  color: white;
  background-color: purple;
  border-radius: 10px;
  height: 40px;
  width: 66%;
  margin: 0 auto;
`
export const ModalInput = styled.input`
  color: white;
  border: 4px solid purple;
  background-color: #000;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  padding: 8px;
  margin-bottom: 40px;
  outline: none;
`
export const ModalTextArea = styled.textarea`
  color: white;
  min-height: 100px;
  max-height: 400px;
  background-color: #000;
  border-radius: 4px;
  border solid purple;
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
  box-shadow: 0px 4px 20px 4px rgba(119, 53, 136, 0.459);
`
