import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/LoginPopup/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/myOrders/Orders.jsx";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
      {isLogin ? (
        <Login setIsLogin={setIsLogin}  />
      ) : (
        <></>
      )}
      <div className="app">
        <Navbar
          setIsLogin={setIsLogin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
