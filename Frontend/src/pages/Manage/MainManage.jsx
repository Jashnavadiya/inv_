import React from 'react'
import Header from '../../components/Header'
import { Outlet } from "react-router-dom";
import ManageSidemenu from './ManageSidemenu'

const MainManage = () => {
  return (
    <div>
      <div className="md:h-16">
        <Header />
      </div>
      <div className="grid grid-cols-12 bg-gray-100 items-baseline">
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex">
          <ManageSidemenu />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default MainManage
