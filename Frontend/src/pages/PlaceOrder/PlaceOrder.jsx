import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotal, food_list, cartItems, base_url, token, localCartData } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((Data) => ({ ...Data, [name]: value }));
  };
 

  const placeOrder =  async(e) => {
    e.preventDefault();
    console.log("submitted")
    let orderItems = [];
    food_list.map((item, idx) => {
      if (cartItems[item._id] > 0) {
        let orderItem = item;
        orderItem["quantity"] = cartItems[item._id];
        orderItems.push(orderItem);
      }
    });
    const orderData = {
      address: data,
      items: orderItems,
      total: getTotal() + 2,
    }
     const response = await axios.post(`${base_url}/api/order/place`, orderData,{headers:{token}});
     console.log(response.data)
     if(response.data.status === "ok"){
       await localCartData();
      toast.success(response.data.message);
     }
     else{
        toast.error("Failed to order");
     }
  };
  const navigate = useNavigate();
  
  useEffect(() => {
     if(!token){
        navigate("/");
        toast.error("Please login to place order");
     }
     else if(getTotal() === 0){
        navigate("/cart");
        toast.error("Please add items to cart");
     }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstname"
            onChange={changeHandler}
            placeholder="First name"
            value={data.firstname}
            required
          />
          <input
            type="text"
            name="lastname"
            onChange={changeHandler}
            placeholder="Last name"
            value={data.lastname}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          placeholder="Email"
          value={data.email}
          required
        />
        <input
          type="text"
          name="street"
          onChange={changeHandler}
          placeholder="Street"
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            onChange={changeHandler}
            placeholder="City"
            value={data.city}
            required
          />
          <input
            type="text"
            name="state"
            onChange={changeHandler}
            placeholder="State"
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            onChange={changeHandler}
            placeholder="ZipCode"
            value={data.zipcode}
            required
          />
          <input
            type="text"
            name="country"
            onChange={changeHandler}
            placeholder="country"
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={changeHandler}
          placeholder="Phone"
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>${getTotal()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>${getTotal() + 2}</p>
          </div>
          <hr />
          <p className="order-note"><b>Note:</b> We are not accepting online payments currently so pay on delivery</p>
          <button type="submit" onClick={() => {navigate("/")}}>Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
