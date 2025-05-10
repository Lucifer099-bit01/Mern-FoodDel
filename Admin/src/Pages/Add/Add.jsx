import React, {  useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const url = "https://mern-fooddel-t2ul.onrender.com";

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((Data) => ({ ...Data, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.status === "ok") {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message)
    } else {
       alert("error While Storing Details")
    }
  };

  return (
    <div className="Add">
      <form onSubmit={submitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={changeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            name="name"
          />
        </div>
        <div className="add-product-description flex-col">
          <textarea
            onChange={changeHandler}
            value={data.description}
            type="text"
            placeholder="Description Here"
            rows="6"
            name="description"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={changeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="pure veg">pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={changeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Ex $20"
            />
          </div>
        </div>
        <button type="submit" className="Add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
