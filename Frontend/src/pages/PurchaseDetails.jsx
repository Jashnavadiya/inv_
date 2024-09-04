import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [isPurchasePopupOpen, setIsPurchasePopupOpen] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setAllPurchaseData(JSON.parse(localStorage.getItem("purchase")) || []);
  }, []);

  const handleOpenPurchasePopup = () => {
    setIsPurchasePopupOpen(true);
  };

  const handleClosePurchasePopup = () => {
    setIsPurchasePopupOpen(false);
    setAllPurchaseData(JSON.parse(localStorage.getItem("purchase")) || []);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {isPurchasePopupOpen && (
          <AddPurchaseDetails isOpen={isPurchasePopupOpen} onClose={handleClosePurchasePopup} />
        )}
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <span className="font-bold">Purchase Details</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
              onClick={handleOpenPurchasePopup}
            >
              Add Purchase
            </button>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Purchase Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchase.map((element, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">{element.name}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.quantityPurchased}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.purchaseDate).toLocaleDateString() === new Date().toLocaleDateString()
                      ? "Today"
                      : new Date(element.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">${element.totalPurchaseAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
