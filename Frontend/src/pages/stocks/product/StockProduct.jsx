import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../AuthContext";

const StockProduct = () => {
  const [products, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const authContext = useContext(AuthContext);

 

  useEffect(() => {
    if (products.length > 0) {
      updateStockQuantities();
    }
  }, [products.length]); // Dependency array includes only products.length
useEffect(()=>{
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setAllProducts(storedProducts);
},[])
  useEffect(() => {
    handleSearching();
  }, [search]);
  useEffect(() => {
    setFilteredData(products)
    handleSearching()
  }, [products]);

  const updateStockQuantities = () => {
    const purchaseData = JSON.parse(localStorage.getItem("purchase")) || [];

    const purchaseMap = purchaseData.reduce((acc, purchase) => {
      if (acc[purchase.name]) {
        acc[purchase.name] += parseInt(purchase.quantityPurchased, 10);
      } else {
        acc[purchase.name] = parseInt(purchase.quantityPurchased, 10);
      }
      return acc;
    }, {});

    const updatedProducts = products.map((product) => {
      if (purchaseMap[product.name]) {
        return {
          ...product,
          stock: (product.stock || 0) + purchaseMap[product.name],
        };
      }
      return product;
    });
    console.log(updatedProducts);
    
    setAllProducts(updatedProducts); // This updates the state once with the final values
    setFilteredData(updatedProducts); // Ensure filteredData is also updated
  };

   const handleSearching = () => {
    const lowercasedSearch = search.toLowerCase();

    if (products.length > 0) {
      const highlightedData = products.map((item) => {
        const nameHighlighted = item.name?.replace(
          new RegExp(`(${lowercasedSearch})`, 'gi'),
          (match) => `<span class="bg-blue-200">${match}</span>`
        );
        const manufacturerHighlighted = item.manufacturer?.replace(
          new RegExp(`(${lowercasedSearch})`, 'gi'),
          (match) => `<span class="bg-blue-200">${match}</span>`
        );
        const descriptionHighlighted = item.description?.replace(
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



  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Your other elements here */}
          </div>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg">
          <h2 className="col-span-3 flex justify-between align-middle">
            <span className="my-auto">
              <i className="fa-solid fa-box"></i> Products
            </span>
            <div className="relative">
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
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
                <span
                  dangerouslySetInnerHTML={{ __html: ele.nameHighlighted }}
                ></span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ele.manufacturerHighlighted,
                  }}
                ></span>
                <span>{ele.stock?ele.stock:0}</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ele.descriptionHighlighted,
                  }}
                ></span>
                <span>{ele.stock > 0 ? "In Stock" : "Not in Stock"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockProduct;





 {/* <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Products
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Manufacturer
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Availibility
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900" dangerouslySetInnerHTML={{ __html: element.nameHighlighted }}>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700" dangerouslySetInnerHTML={{ __html: element.manufacturerHighlighted }}>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700" dangerouslySetInnerHTML={{ __html: element.descriptionHighlighted }}>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock > 0 ? "In Stock" : "Not in Stock"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateProductModalSetting(element)}
                      >
                        Edit{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}