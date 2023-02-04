import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className="h-[80px]"></div>
      <div className={"container mx-auto max-w-5xl max-lg:px-4"}>
        <Outlet />
      </div>
    </>
  )
}
