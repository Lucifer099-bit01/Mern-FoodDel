import express from "express";
import cors from "cors";
import connectDB from "./Configs/DB.js";
import FoodRouter from "./routes/foodRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import CartRoute from "./routes/CartRoutes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/OrderRoutes.js";
const app = express();
const port = 3000;

//server configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connect the database
connectDB();

//api endpoints
app.use("/Uploads", express.static("./Uploads"));
app.use("/api/food", FoodRouter);
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRoute);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.listen(port);
