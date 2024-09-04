import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";

const AddSale = ({ isOpen, onClose }) => {
  const authContext = useContext(AuthContext);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({
    userID: authContext.user || "",
    name: "",
    storename: "",
    stockSold: "",
    saleDate: "",
    totalSaleAmount: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    setSales(JSON.parse(localStorage.getItem('sales')));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  const handleSave = () => {
    try {
      const product = products.find((product) => product.name === sale.name);
      if (product) {
        const stockAvailable = product.stock;
        const stockSold = parseInt(sale.stockSold, 10);

        // Check if the stock sold exceeds available stock
        if (stockSold > stockAvailable) {
          setError(`Cannot sell more than available stock (${stockAvailable}).`);
          setSale((prevSale) => ({
            ...prevSale,
            stockSold: stockAvailable,
            totalSaleAmount: (stockAvailable * (sale.totalSaleAmount / stockSold)).toFixed(2),
          }));
          return;
        }

        setError(""); // Clear any previous error

        const updatedProducts = products.map((product) =>
          product.name === sale.name
            ? {
                ...product,
                stock: product.stock - stockSold,
              }
            : product
        );

        localStorage.setItem("products", JSON.stringify(updatedProducts));

        localStorage.setItem("sales", JSON.stringify([...sales, sale]));
        setSales((prevSales) => {
          const updatedSales = [...prevSales, sale];
          return updatedSales;
        });

        onClose();
      }
    } catch (error) {
      console.error("Error saving sale:", error);
    }
  };


  if (!isOpen) return null;

  // Filter products to only include those with stock left
  const availableProducts = products.filter(product => product.stock > 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Sale</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <select
          name="name"
          value={sale.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Product</option>
          {availableProducts.length > 0 ? (
            availableProducts.map((product, index) => (
              <option key={index} value={product.name}>
                {product.name}
              </option>
            ))
          ) : (
            <option value="">No products available</option>
          )}
        </select>

        <input
          type="text"
          name="storename"
          value={sale.storename || ""}
          onChange={handleChange}
          placeholder="Store Name"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="stockSold"
          placeholder="Stock Sold"
          value={sale.stockSold}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="saleDate"
          placeholder="Sale Date"
          value={sale.saleDate}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="totalSaleAmount"
          placeholder="Total Sale Amount"
          value={sale.totalSaleAmount}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSale;



// import { Fragment, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { PlusIcon } from "@heroicons/react/24/outline";

// export default function AddSale({
//   addSaleModalSetting,
//   products,
//   stores,
//   handlePageUpdate,
//   authContext
// }) {
//   const [sale, setSale] = useState({
//     userID: authContext.user,
//     productID: "",
//     storeID: "",
//     stockSold: "",
//     saleDate: "",
//     totalSaleAmount: "",
//   });
//   const [open, setOpen] = useState(true);
//   const cancelButtonRef = useRef(null);


//   // Handling Input Change for input fields
//   const handleInputChange = (key, value) => {
//     setSale({ ...sale, [key]: value });
//   };

//   // POST Data
//   const addSale = () => {
//     fetch("http://localhost:4000/api/sales/add", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(sale),
//     })
//       .then((result) => {
//         alert("Sale ADDED");
//         handlePageUpdate();
//         addSaleModalSetting();
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     // Modal
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         initialFocus={cancelButtonRef}
//         onClose={setOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
//                       <PlusIcon
//                         className="h-6 w-6 text-blue-400"
//                         aria-hidden="true"
//                       />
//                     </div>
//                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
//                       >
//                         Add Sale
//                       </Dialog.Title>
//                       <form action="#">
//                         <div className="grid gap-4 mb-4 sm:grid-cols-2">
//                           <div>
//                             <label
//                               htmlFor="productID"
//                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                               Product Name
//                             </label>
//                             <select
//                               id="productID"
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                               name="productID"
//                               onChange={(e) =>
//                                 handleInputChange(e.target.name, e.target.value)
//                               }
//                             >
//                               <option selected="">Select Products</option>
//                               {products.map((element, index) => {
//                                 return (
//                                   <option key={element._id} value={element._id}>
//                                     {element.name}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="stockSold"
//                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                               Stock Sold
//                             </label>
//                             <input
//                               type="number"
//                               name="stockSold"
//                               id="stockSold"
//                               value={sale.stockSold}
//                               onChange={(e) =>
//                                 handleInputChange(e.target.name, e.target.value)
//                               }
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                               placeholder="0 - 999"
//                             />
//                           </div>

//                           <div>
//                             <label
//                               htmlFor="storeID"
//                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                               Store Name
//                             </label>
//                             <select
//                               id="storeID"
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                               name="storeID"
//                               onChange={(e) =>
//                                 handleInputChange(e.target.name, e.target.value)
//                               }
//                             >
//                               <option selected="">Select Store</option>
//                               {stores.map((element, index) => {
//                                 return (
//                                   <option key={element._id} value={element._id}>
//                                     {element.name}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="totalSaleAmount"
//                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                               Total Sale Amount
//                             </label>
//                             <input
//                               type="number"
//                               name="totalSaleAmount"
//                               id="price"
//                               value={sale.totalSaleAmount}
//                               onChange={(e) =>
//                                 handleInputChange(e.target.name, e.target.value)
//                               }
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                               placeholder="$299"
//                             />
//                           </div>
//                           <div className="h-fit w-fit">
//                             {/* <Datepicker
//                               onChange={handleChange}
//                               show={show}
//                               setShow={handleClose}
//                             /> */}
//                             <label
//                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                               htmlFor="salesDate"
//                             >
//                               Sales Date
//                             </label>
//                             <input
//                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                               type="date"
//                               id="saleDate"
//                               name="saleDate"
//                               value={sale.saleDate}
//                               onChange={(e) =>
//                                 handleInputChange(e.target.name, e.target.value)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           {/* <button
//                             type="submit"
//                             className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                           >
//                             Update product
//                           </button> */}
//                           {/* <button
//                             type="button"
//                             className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
//                           >
//                             <svg
//                               className="mr-1 -ml-1 w-5 h-5"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 fill-rule="evenodd"
//                                 d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                                 clip-rule="evenodd"
//                               ></path>
//                             </svg>
//                             Delete
//                           </button> */}
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                   <button
//                     type="button"
//                     className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
//                     onClick={addSale}
//                   >
//                     Add Sale
//                   </button>
//                   <button
//                     type="button"
//                     className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                     onClick={() => addSaleModalSetting()}
//                     ref={cancelButtonRef}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }
