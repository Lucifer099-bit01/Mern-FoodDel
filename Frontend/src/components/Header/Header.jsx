import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order favourite Food Here</h2>
        <p>
          Experience the ultimate in taste and quality — order from our
          selection of the finest, freshest dishes, crafted with passion and
          delivered with care, right to your doorstep.
        </p>
        <button><a href="#explore-menu">View Menu</a></button>
      </div>
    </div>
  );
};

export default Header;
