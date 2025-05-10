import express from "express";
import {
  FoodControllerAdd,
  Foodlistrender,
  removeFoodItem,
} from "../Controllers/FoodController.js";
import { Upload } from "../Configs/multer.js";

const FoodRouter = express.Router();

FoodRouter.post("/add", Upload.single("image"), FoodControllerAdd);
FoodRouter.get("/food-list", Foodlistrender);
FoodRouter.delete("/remove/:id", removeFoodItem);

export default FoodRouter;
