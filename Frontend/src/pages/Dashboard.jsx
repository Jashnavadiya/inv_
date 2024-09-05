import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Apple", "Knorr", "Shoop", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 1, 5, 8, 9, 15],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  // Update Chart Data
  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount",
          data: [...salesData],
        },
      ],
    });
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`)
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:4000/api/sales/getmonthly`)
      .then((response) => response.json())
      .then((datas) => updateChartData(datas.salesAmount))
      .catch((err) => console.log(err));
  };

  return (
    <>

      <div className="col-span-10 p-4 gap-6 grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* First article taking 8/12 of the grid */}
          <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>
              Sales Overview
            </h2>
            <div className="w-full  grid grid-cols-4 mt-2">
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/1.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Sales</span>
                  </div>
                </div>
              </div>
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/2.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Revenue</span>
                  </div>
                </div>
              </div>
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/3.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Profit</span>
                  </div>
                </div>
              </div>
              <div >
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/4.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Cost</span>
                  </div>
                </div>
              </div>
            
              

            </div>

          </article>

          {/* Second article taking 4/12 of the grid */}
          <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
          <h2>
              Inventory Management
            </h2>
          <div className="w-full  grid grid-cols-2
          ">
              <div className=" border-e ">
                <div className="w-12/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/8.png" alt="" /></div>
                  <div className="flex flex-col justify-between align-middle text-center">
                    <span>800</span>
                    <span>Quantity in Hand</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/9.png" alt="" /></div>
                  <div className="flex flex-col justify-between align-middle text-center">
                    <span>2100</span>
                    <span>To Be recieved</span>
                  </div>
                </div>
              </div>
           

            </div>
          </article>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* First article taking 8/12 of the grid */}
          <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>
              Sales Overview
            </h2>
            <div className="w-full  grid grid-cols-4 mt-3">
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/7.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Sales</span>
                  </div>
                </div>
              </div>
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/6.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Revenue</span>
                  </div>
                </div>
              </div>
              <div className=" border-e ">
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/5.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Profit</span>
                  </div>
                </div>
              </div>
              <div >
                <div className="w-7/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/3.png" alt="" /></div>
                  <div className="flex justify-between mt-2">
                    <span>$100</span>
                    <span>Cost</span>
                  </div>
                </div>
              </div>
            
              

            </div>

          </article>

          {/* Second article taking 4/12 of the grid */}
          <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
          <h2>
              Inventory Management
            </h2>
          <div className="w-full  grid grid-cols-2">
              <div className=" border-e ">
                <div className="w-12/12 m-auto">
                  <div className="flex  justify-center"><img className="m-auto" src="/11.png" alt="" /></div>
                  <div className="flex flex-col justify-between align-middle text-center">
                    <span>800</span>
                    <span>Quantity in Hand</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12/12 m-auto">
                  <div className="flex justify-center"><img className="m-auto" src="/10.png" alt="" /></div>
                  <div className="flex flex-col justify-between align-middle text-center">
                    <span>2100</span>
                    <span>To Be recieved</span>
                  </div>
                </div>
              </div>
           

            </div>
          </article>
        </div>
      </div>





    </>
  );
}

export default Dashboard;
