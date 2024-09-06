// import React, { useContext, useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import AuthContext from "../AuthContext";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);


// function Dashboard() {
  

//   const [chart, setChart] = useState({
//     options: {
//       chart: {
//         id: "basic-bar",
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//       },
//     },
//     series: [
//       {
//         name: "series",
//         data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
//       },
//     ],
//   });

//   // Update Chart Data
//   const updateChartData = (salesData) => {
//     setChart({
//       ...chart,
//       series: [
//         {
//           name: "Monthly Sales Amount",
//           data: [...salesData],
//         },
//       ],
//     });
//   };

//   const authContext = useContext(AuthContext);

//   useEffect(() => {
//     fetchTotalSaleAmount();
//     fetchTotalPurchaseAmount();
//     fetchStoresData();
//     fetchProductsData();
//     fetchMonthlySalesData();
//   }, []);

//   // Fetching total sales amount
//   const fetchTotalSaleAmount = () => {
//     fetch(
//       `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
//     )
//       .then((response) => response.json())
//       .then((datas) => setSaleAmount(datas.totalSaleAmount));
//   };

//   // Fetching total purchase amount
//   const fetchTotalPurchaseAmount = () => {
//     fetch(
//       `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
//     )
//       .then((response) => response.json())
//       .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
//   };

//   // Fetching all stores data
//   const fetchStoresData = () => {
//     fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
//       .then((response) => response.json())
//       .then((datas) => setStores(datas));
//   };

//   // Fetching Data of All Products
//   const fetchProductsData = () => {
//     fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
//       .then((response) => response.json())
//       .then((datas) => setProducts(datas))
//       .catch((err) => console.log(err));
//   };

//   // Fetching Monthly Sales
//   const fetchMonthlySalesData = () => {
//     fetch(`http://localhost:4000/api/sales/getmonthly`)
//       .then((response) => response.json())
//       .then((datas) => updateChartData(datas.salesAmount))
//       .catch((err) => console.log(err));
//   };

//   const [salesPurchasesChart, setSalesPurchasesChart] = useState({
//     options: {
//       chart: {
//         id: "sales-purchases-bar",
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "50%", // Keeps the bars at a good width
//           barHeight: "full", // Ensures the bars use the full height of the area
//           borderRadius: 4, // Makes the bars have rounded corners
//           dataLabels: {
//             position: "top", // Positions the data labels at the top of the bars
//           },
//           groupPadding: 0.2,
//           // This adds space between the grouped bars (Sales & Purchases)
//         },
//       },
//       colors: ["#008FFB", "#FF4560"], // Bar colors for Sales and Purchases
//     },
//     series: [
//       {
//         name: "Sales",
//         data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
//       },
//       {
//         name: "Purchases",
//         data: [5, 15, 30, 45, 50, 25, 20, 40, 35, 65, 30, 55],
//       },
//     ],
//   });

//   // Line chart data for Ordered and Delivered
//   const [ordersChart, setOrdersChart] = useState({
//     options: {
//       chart: {
//         id: "orders-line",
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//       },
//       stroke: {
//         curve: "smooth",
//       },
//     },
//     series: [
//       {
//         name: "Ordered",
//         data: [12, 19, 10, 15, 22, 30, 35, 40, 32, 28, 25, 18],
//       },
//       {
//         name: "Delivered",
//         data: [10, 17, 9, 14, 20, 28, 33, 38, 30, 26, 23, 16],
//       },
//     ],
//   });

//   return (
//     <>
//       <div className="col-span-10 p-4 gap-6 grid">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* First article taking 8/12 of the grid */}
//           <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
//             <h2>Sales Overview</h2>
//             <div className="w-full  grid grid-cols-4 mt-2">
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/1.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Sales</span>
//                   </div>
//                 </div>
//               </div>
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/2.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Revenue</span>
//                   </div>
//                 </div>
//               </div>
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/3.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Profit</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/4.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Cost</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>

//           {/* Second article taking 4/12 of the grid */}
//           <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
//             <h2>Inventory Management</h2>
//             <div
//               className="w-full  grid grid-cols-2
//           "
//             >
//               <div className=" border-e ">
//                 <div className="w-12/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/8.png" alt="" />
//                   </div>
//                   <div className="flex flex-col justify-between align-middle text-center">
//                     <span>800</span>
//                     <span>Quantity in Hand</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="w-12/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/9.png" alt="" />
//                   </div>
//                   <div className="flex flex-col justify-between align-middle text-center">
//                     <span>2100</span>
//                     <span>To Be recieved</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* First article taking 8/12 of the grid */}
//           <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
//             <h2>Purchases Overview</h2>
//             <div className="w-full  grid grid-cols-4 mt-3">
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/7.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Sales</span>
//                   </div>
//                 </div>
//               </div>
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/6.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Revenue</span>
//                   </div>
//                 </div>
//               </div>
//               <div className=" border-e ">
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/5.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Profit</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="w-7/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/3.png" alt="" />
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span>$100</span>
//                     <span>Cost</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>

//           {/* Second article taking 4/12 of the grid */}
//           <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
//             <h2>Inventory Management</h2>
//             <div className="w-full  grid grid-cols-2">
//               <div className=" border-e ">
//                 <div className="w-12/12 m-auto">
//                   <div className="flex  justify-center">
//                     <img className="m-auto" src="/11.png" alt="" />
//                   </div>
//                   <div className="flex flex-col justify-between align-middle text-center">
//                     <span>800</span>
//                     <span>Quantity in Hand</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="w-12/12 m-auto">
//                   <div className="flex justify-center">
//                     <img className="m-auto" src="/10.png" alt="" />
//                   </div>
//                   <div className="flex flex-col justify-between align-middle text-center">
//                     <span>2100</span>
//                     <span>To Be recieved</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>

//           <article className="flex flex-col gap-4 lg:col-span-6 col-span-1 rounded-lg border border-gray-100 bg-white p-4">
//             {/* Add Chart for Sales and Purchases Here */}
//             <h3 className="">Sales and Purchases Overview</h3>
//             <Chart
//               options={salesPurchasesChart.options}
//               series={salesPurchasesChart.series}
//               type="bar"
//               width="100%"
//             />
//           </article>

//           {/* Line Chart on the right */}
//           <article className="flex flex-col gap-4 lg:col-span-6 col-span-1 rounded-lg border border-gray-100 bg-white p-4">
//               <h3 className="">Orders and Deliveries Overview</h3>
//               <Chart
//                 options={ordersChart.options}
//                 series={ordersChart.series}
//                 type="line"
//                 width="100%"
//               />
//             </article>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
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

  const fetchTotalSaleAmount = () => {
    fetch(
      `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
    )
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:4000/api/sales/getmonthly`)
      .then((response) => response.json())
      .then((datas) => updateChartData(datas.salesAmount))
      .catch((err) => console.log(err));
  };

  const [salesPurchasesChart, setSalesPurchasesChart] = useState({
    options: {
      chart: {
        id: "sales-purchases-bar",
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
      plotOptions: {
        bar: {
          columnWidth: "50%",
          barHeight: "full",
          borderRadius: 4,
          dataLabels: {
            position: "top",
          },
          groupPadding: 0.2,
        },
      },
      colors: ["#008FFB", "#FF4560"],
    },
    series: [
      {
        name: "Sales",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
      {
        name: "Purchases",
        data: [5, 15, 30, 45, 50, 25, 20, 40, 35, 65, 30, 55],
      },
    ],
  });

  const [ordersChart, setOrdersChart] = useState({
    options: {
      chart: {
        id: "orders-line",
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
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Ordered",
        data: [12, 19, 10, 15, 22, 30, 35, 40, 32, 28, 25, 18],
      },
      {
        name: "Delivered",
        data: [10, 17, 9, 14, 20, 28, 33, 38, 30, 26, 23, 16],
      },
    ],
  });

  return (
    <>
      <div className="col-span-10 p-4 gap-6 grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>Sales Overview</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-2 gap-4">
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/1.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Sales</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/2.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Revenue</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/3.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Profit</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/4.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Cost</span>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>Inventory Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/8.png" alt="" />
                </div>
                <div className="text-center mt-2">
                  <span>800</span>
                  <span>Quantity in Hand</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/9.png" alt="" />
                </div>
                <div className="text-center mt-2">
                  <span>2100</span>
                  <span>To Be Received</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article className="flex flex-col gap-4 lg:col-span-8 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>Purchases Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/7.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Sales</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/6.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Revenue</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/5.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Profit</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/3.png" alt="" />
                </div>
                <div className="flex justify-between mt-2">
                  <span>$100</span>
                  <span>Cost</span>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-4 lg:col-span-4 col-span-1 rounded-lg border border-gray-100 bg-white p-6">
            <h2>Inventory Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/11.png" alt="" />
                </div>
                <div className="text-center mt-2">
                  <span>800</span>
                  <span>Quantity in Hand</span>
                </div>
              </div>
              <div className="border p-4">
                <div className="flex justify-center">
                  <img className="m-auto" src="/10.png" alt="" />
                </div>
                <div className="text-center mt-2">
                  <span>2100</span>
                  <span>To Be Received</span>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col gap-4 lg:col-span-6 col-span-1 rounded-lg border border-gray-100 bg-white p-4">
            <h3>Sales and Purchases Overview</h3>
            <Chart
              options={salesPurchasesChart.options}
              series={salesPurchasesChart.series}
              type="bar"
              width="100%"
            />
          </article>

          <article className="flex flex-col gap-4 lg:col-span-6 col-span-1 rounded-lg border border-gray-100 bg-white p-4">
            <h3>Orders and Deliveries Overview</h3>
            <Chart
              options={ordersChart.options}
              series={ordersChart.series}
              type="line"
              width="100%"
            />
          </article>
        </div>
      </div>
    </>
  );
}

export default Dashboard;