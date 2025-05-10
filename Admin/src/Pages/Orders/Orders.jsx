import React, { useEffect, useState } from "react";
import "./Orders.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(`https://mern-fooddel-t2ul.onrender.com/api/order/get`);
    if (response.data.status === "ok") {
      setOrders(response.data.orderdata);
      console.log(response.data.orderdata);
    } else {
      toast.error("Error While Fetching Orders");
    }
  };

  const updateOrder = async (id, newStatus) => {
    const response = await axios.post(
      `https://mern-fooddel-t2ul.onrender.com/api/order/update/${id}`,
      {
        status: newStatus,
      }
    );
    if (response.data.status === "ok") {
      toast.success("Order Status Updated");
      getOrders();
    } else {
      toast.error("Error While Updating Order");
    }
  };

  useEffect(() => {
    getOrders();
    console.log("did it");
  }, []);
  return (
    <div className="my-orders">
      <h2>Orders</h2>
      <div className="container">
        {orders.map((order, idx) => {
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
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  updateOrder(order._id, value);
                }}
                defaultValue={order.OrderStatus}
                name="status"
                id=""
              >
                <option value="Being Cooked">Being Cooked</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
