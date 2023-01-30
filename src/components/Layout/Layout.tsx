import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
// import { GitHub } from "../GitHub/GitHub"
// import { ParticlesBackground } from "../Particles/ParticlesBackground"

export const Layout: FC = () => {
  return (
    <>
      {/* <ParticlesBackground /> */}
      <Header />
      <div className="h-[80px]"></div>
      <div className={"container mx-auto max-w-5xl"}>
        <Outlet />
      </div>
    </>
  )
}
