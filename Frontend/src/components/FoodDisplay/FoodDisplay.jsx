import React, { useEffect, useState } from "react";
import Fooditem from "../Fooditem/Fooditem";
import "./FoodDispaly.css";
import axios from 'axios'

const FoodDisplay = ({ category }) => {
  const[food_list,setFoodlist] = useState([])
  const url = "http://localhost:3000";
  const img_url = "http://localhost:3000/Uploads/";
  const GetFoodList = async() => {
    const response = await axios.get(`${url}/api/food/food-list`);
    if(response.data.status === "ok"){
      setFoodlist(response.data.Food);
    }
    else{
      alert("We are currently offline");
    }
  }
  useEffect(() => {
    GetFoodList();
  },[])
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-item">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
