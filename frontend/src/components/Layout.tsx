import React,{ type ReactNode } from "react";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Player from "./Player";

interface LayoutProps {
    children: ReactNode;
}

const Layout:React.FC<LayoutProps>= ({children}) => {
  return (
    <div className='h-screen'>
      <div className='h-[90%] flex'>
        <Sidebar></Sidebar>
        <div className="w-[100%] m-2 pt-4 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Navbar></Navbar>
            {children}
        </div>
      </div>
      <Player></Player>
    </div>
  )
}

export default Layout
