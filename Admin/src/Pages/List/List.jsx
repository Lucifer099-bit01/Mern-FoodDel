import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const [List, setList] = useState([]);
  const url = "https://mern-fooddel-t2ul.onrender.com";
  const getFoodList = async () => {
    const response = await axios.get(`${url}/api/food/food-list`);
    if (response.data.status === "ok") {
      setList(response.data.Food);
      console.log(response.data.Food);
    } else {
      toast.error("No Products Added");
    }
  };
  useEffect(() => {
    getFoodList();
  }, []);
  
  const removeFooditem = async (id) => {
    const response = await axios.delete(`${url}/api/food/remove/` + id);
    if (response.data.status === "ok") {
      toast.success(response.data.message);
      getFoodList();
    }
    else{
      toast.error("Failed To Delete May be Wrong Id")
    }
    
  };


  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="List-table">
        <div className="List-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {List.map((item, idx) => {
          return (
            <div key={idx} className="List-table-format">
              <img src={`${url}/Uploads/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p
                className="cursor"
                onClick={() => {
                  removeFooditem(item._id);
                }}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
