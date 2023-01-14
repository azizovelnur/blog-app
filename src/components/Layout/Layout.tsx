import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { GitHub } from "../GitHub/GitHub"
import { ParticlesBackground } from "../Particles/ParticlesBackground"

export const Layout: FC = () => {
  return (
    <>
      <div className={"gridContainer"}>
        <ParticlesBackground />
        <Header />
        <GitHub />
        <Outlet />
      </div>
    </>
  )
}
