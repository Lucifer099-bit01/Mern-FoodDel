import React, { useContext, useState } from "react";
import "./login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios  from "axios";
import { toast } from "react-toastify";

const Login = ({ setIsLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { base_url,setToken } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    if (currState === "Login") {
      e.preventDefault();
      const fromData = new FormData(e.target);
      const formInput = {
        email: fromData.get("email"),
        password: fromData.get("password"),
      };
      const response = await axios.post(
        `${base_url}/api/user/login`,
        formInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.status === "ok") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsLogin(false);
        toast.success(data.message);
      }
    
       
     
     
    }

    if (currState === "Sign Up") {
      e.preventDefault();
      const fromData = new FormData(e.target);
      const formInput = {
        name: fromData.get("name"),
        email: fromData.get("email"),
        password: fromData.get("password"),
        phone: fromData.get("phone"),
      };
      const response = await axios.post(
        `${base_url}/api/user/register`,
        formInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "ok") {
        setIsLogin(false);
        toast.success(data.message);
      }
      else if(data.status === "found"){
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setIsLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input name="name" type="text" placeholder="Your name" required />
              <input name="phone" type="text" placeholder="Phone" required />
            </>
          )}
          <input name="email" type="email" placeholder="Your email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>by continuing I agree trems of use and P rivacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a New Account ?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already Have a Account ?{" "}
            <span onClick={() => setCurrState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
