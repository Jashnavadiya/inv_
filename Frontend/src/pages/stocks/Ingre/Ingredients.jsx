// import React from 'react'

// const Ingredients = () => {
//   return (
//     <div>
//         ingre
//     </div>
//   )
// }

// export default Ingredients

import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../../../AuthContext"; 

const Ingredients = () => {
  const [ingredients, setAllIngredients] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchIngredientsData();
    fetchStoresData();
  }, []);

  // Fetching Data of All Ingredients
  const fetchIngredientsData = () => {
    fetch(`http://localhost:4000/api/ingredient/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllIngredients(data);
        setFilteredData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Handle search
  useEffect(() => {
    handleSearching();
  }, [search]);

  const handleSearching = () => {
    const lowercasedSearch = search.toLowerCase();

    if (ingredients.length > 0) {
      const highlightedData = ingredients.map((item) => {
        const nameHighlighted = item.name.replace(
          new RegExp(`(${lowercasedSearch})`, 'gi'),
          (match) => `<span class="bg-blue-200">${match}</span>`
        );
        const manufacturerHighlighted = item.manufacturer.replace(
          new RegExp(`(${lowercasedSearch})`, 'gi'),
          (match) => `<span class="bg-blue-200">${match}</span>`
        );
        const descriptionHighlighted = item.description.replace(
          new RegExp(`(${lowercasedSearch})`, 'gi'),
          (match) => `<span class="bg-blue-200">${match}</span>`
        );

        return {
          ...item,
          nameHighlighted,
          manufacturerHighlighted,
          descriptionHighlighted,
        };
      });

      const filtered = highlightedData.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedSearch) ||
          item.manufacturer.toLowerCase().includes(lowercasedSearch) ||
          item.description.toLowerCase().includes(lowercasedSearch)
      );

      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    setFilteredData(ingredients);
    handleSearching();
  }, [ingredients]);

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex flex-col p-10 w-full md:w-3/12">
              <span className="font-semibold text-blue-600 text-base">
                Total Ingredients
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {ingredients.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Last 7 days
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stores
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {stores.length}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $2000
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Top Selling
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $1500
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Cost
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10 w-full md:w-3/12 border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Low Stocks
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    12
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordered
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    2
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Not in Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg">
          <h2 className="col-span-3 flex justify-between align-middle">
            <span className="my-auto flex w-max ">
              <img src="/ingredients.png" alt="" /> Ingredients
            </span>
            <div className="relative">
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ingredients..."
                  className="border rounded-md pl-10 pr-5 py-2"
                />
              </form>
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </h2>

          <div className="col-span-12">
            <div className="grid grid-cols-6 pb-3 text-sm">
              <span>Name</span>
              <span>Manufacturer</span>
              <span>Stocks</span>
              <span>Description</span>
              <span>Availability</span>
            </div>
            <hr />
            {filteredData.map((ele, i) => (
              <div key={i} className="grid grid-cols-6 my-3">
                <span dangerouslySetInnerHTML={{ __html: ele.nameHighlighted }}></span>
                <span dangerouslySetInnerHTML={{ __html: ele.manufacturerHighlighted }}></span>
                <span>{ele.stock}</span>
                <span dangerouslySetInnerHTML={{ __html: ele.descriptionHighlighted }}></span>
                <span>{ele.stock > 0 ? "In Stock" : "Not in Stock"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients   ;
