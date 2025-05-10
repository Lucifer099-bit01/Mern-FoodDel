import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./orders.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [data, setData] = useState([]);
  const { base_url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.get(`${base_url}/api/order/orders`, {
      headers: { token },
    });
    if (response.data.status !== "ok") {
      console.log("Failed to fetch orders");
      return;
    }
    console.log(response.data.orderdata);
    setData(response.data.orderdata);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, idx) => {
          return (
            <div className="my-orders-order" key={idx}>
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, idx) => {
                  return (
                    item.name +
                    " x " +
                    item.quantity +
                    (idx === order.items.length - 1 ? "" : ", ")
                  );
                })}
              </p>
              <p>${order.TotalPrice}</p>
              <p>Items : {order.items.length}</p>
              <p>
                <span
                  className={order.OrderStatus === "Delivered" ? "done" : ""}
                >
                  &#x25cf;{" "}
                </span>{" "}
                
                <b>{order.OrderStatus}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
