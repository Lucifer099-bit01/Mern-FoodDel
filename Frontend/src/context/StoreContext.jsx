import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreProvider = (props) => {
  const [food_list, setFoodlist] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const base_url = "https://mern-fooddel-t2ul.onrender.com";
  const img_url = "https://mern-fooddel-t2ul.onrender.com/Uploads/";

  const GetFoodList = async () => {
    const response = await axios.get(`${base_url}/api/food/food-list`);
    if (response.data.status === "ok") {
      setFoodlist(response.data.Food);
    } else {
      alert("We are currently offline");
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${base_url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
      console.log("entered");
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${base_url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
      console.log("entered");
    }
  };

  const localCartData = async () => {
    if (token) {
      const response = await axios.post(
        `${base_url}/api/cart/cartdetails`,
        {},
        {
          headers: { token },
        }
      );
      if (response.data.status === "ok") {
        console.log(response.data.cart);
        setCartItems(response.data.cart);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    if (token) {
      localCartData();
      
    }
    GetFoodList();
  }, [token]);

  const getTotal = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const foodItem = food_list.find((food) => food._id === item);
        if (foodItem) total += foodItem.price * cartItems[item];
      }
    }
    return total;
  };

  const contextvalue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotal,
    base_url,
    token,
    setToken,
    localCartData,
  };
  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
