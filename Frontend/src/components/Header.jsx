import { Fragment, useContext, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function Header() {
  const { signout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const currentYear = new Date().getFullYear();
  const startYear = 2017;

  // Generate array of years from 2017 to current year
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  // Load the saved year from localStorage or default to the current year
  const [selectedYear, setSelectedYear] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedYear")) || currentYear;
  });

  // Update localStorage whenever the selected year changes
  useEffect(() => {
    localStorage.setItem("selectedYear", JSON.stringify(selectedYear));
  }, [selectedYear]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <img className="h-8 w-8" src="/logo.png" alt="Logo" />
                <span className="text-white font-bold italic">
                  Inventory Management
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Year selection */}
                <h1 className="text-white">Financial Year:</h1>
              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="p-1 bg-gray-700 text-white rounded-md"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button className="bg-gray-800 p-1 text-gray-400 hover:text-white rounded-full">
                <BellIcon className="h-6 w-6" />
              </button>
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center bg-gray-800 rounded-full text-sm">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.imageUrl}
                    alt="Profile"
                  />
                </Menu.Button>
                <Transition as={Fragment}>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Menu.Item>
                      <button
                        onClick={signout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
