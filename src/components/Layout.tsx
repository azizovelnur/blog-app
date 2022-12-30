import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Aside} from "./Aside";

export const Layout: FC = () => {
  return (
    <>
      <div className={'gridContainer'}>
        <Header/>
        <Aside/>
        <Outlet/>
      </div>
    </>
  )
}