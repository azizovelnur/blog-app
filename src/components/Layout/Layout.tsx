import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { GitHub } from "../GitHub/GitHub"

export const Layout: FC = () => {
  return (
    <>
      <div className={"gridContainer"}>
        <Header />
        <GitHub />
        <Outlet />
      </div>
    </>
  )
}
