import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setIsLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotal, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const toOrders = () => {
    navigate("/orders");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLogin(false);
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("about-me")}
          className={menu === "about-me" ? "active" : ""}
        >
          About-Me
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotal() === 0 ? " " : "dot"}></div>
        </div>

        {!token ? (
          <button
            onClick={() => {
              setIsLogin(true);
            }}
          >
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="navbar-profile-dropdown">
              <li
                onClick={() => {
                  toOrders();
                }}
              >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li
                onClick={() => {
                  logout();
                }}
              >
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
