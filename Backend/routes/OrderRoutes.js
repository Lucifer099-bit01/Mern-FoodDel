import express from "express";
import isLoggedin from "../middleware/auth.js";
import {
  getOrders,
  placeOrder,
  sendOrders,
  updateStatus,
} from "../Controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", isLoggedin, placeOrder);
orderRouter.get("/orders", isLoggedin, getOrders);
orderRouter.get("/get", sendOrders);
orderRouter.post("/update/:id", updateStatus);

export default orderRouter;
