import express from 'express';
import { addToCart,removeFromCart,getCart } from '../Controllers/CartController.js';
import isLoggedin from '../middleware/auth.js';


const CartRoute = express.Router();


CartRoute.post("/add",isLoggedin,addToCart);
CartRoute.post("/remove",isLoggedin,removeFromCart);
CartRoute.post("/cartdetails",isLoggedin,getCart);

export default CartRoute;