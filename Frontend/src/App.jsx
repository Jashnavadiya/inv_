import React from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import Store from "./pages/Store";
import Sales from "./pages/Sales";
import PurchaseDetails from "./pages/PurchaseDetails";
import MainManage from "./pages/Manage/MainManage";
import Importer from "./pages/Manage/Importers/Importer";
import Client from "./pages/Manage/Importers/client";
import Ingre from "./pages/Manage/Importers/Ingre";
import Products from "./pages/Manage/Importers/Products";
import ProtectedWrapper from "./ProtectedWrapper";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
      

{/* main routing  */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                
              <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
            
          </Route>



{/* Information routing */}


          <Route path="/info/" element={
            <ProtectedWrapper>

            <MainManage />
            </ProtectedWrapper>
        } >
            <Route path="/info/importers" element={<Importer/>}/>
            <Route path="/info/clients" element={<Client/>}/>
            <Route path="/info/ingredients" element={<Ingre/>}/>
            <Route path="/info/products" element={<Products/>}/>
          </Route>
          <Route path="*" element={<NoPageFound />} />
   

{/* stocks routing */}
    
<Route path="/stocks/" element={
            <ProtectedWrapper>

            <MainManage />
            </ProtectedWrapper>
        } >
            <Route path="/stocks/product" element={<Importer/>}/>
            <Route path="/stocks/ingredients" element={<Ingre/>}/>
            <Route path="/stocks/ingre" element={<Client/>}/>
            <Route path="/stocks/products" element={<Products/>}/>
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>

      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
