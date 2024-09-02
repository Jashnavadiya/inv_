import React from 'react'
import { Link } from "react-router-dom";
const localStorageData = JSON.parse(localStorage.getItem("user"))||[];
const ManageSidemenu = () => {
  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">

        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="text-sm font-medium">Back To Dashboard</span>
          </Link>

              <Link to="/info/importers">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src="/importers.png"
                  />
                  <span className="text-sm font-medium"> Importers </span>
                </div>
            </summary>
          </details>
              </Link>

          <Link
            to="/info/clients"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src="/supplier-icon.png"
            />
            <span className="text-sm font-medium">Clients</span>
          </Link>
          <Link
            to="/info/ingredients"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img alt="sale-icon" src="/ingredients.png" />
            <span className="text-sm font-medium"> ingredients</span>
          </Link>

              <Link to="/info/products">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <div className="flex items-center gap-2">
                  <img
                    src="/order-icon.png"
                  />
                  <span className="text-sm font-medium"> products </span>
                </div>
            </summary>
          </details>
              </Link>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span> {localStorageData.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageSidemenu