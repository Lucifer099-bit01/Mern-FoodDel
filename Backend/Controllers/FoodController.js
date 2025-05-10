import FooditemModel from "../Models/Fooditem.js";
import FoodListModel from "../Models/FoodList.js";
import fs from "fs";

const FoodControllerAdd = async (req, res) => {
  let image_file = req.file.filename;
  const food = await FooditemModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_file,
  });
  let foodlist = await FoodListModel.findOne();
  if (foodlist) {
    foodlist.FoodItems.push(food._id);
    await foodlist.save();
  } else {
    foodlist = FoodListModel.create({
      FoodItems: [food._id],
    });
  }
  res
    .status(200)
    .json({ status: "ok", message: "Food item added successfully", food });
};

const removeFoodItem = async (req, res) => {
  const { id } = req.params;

  await FooditemModel.findByIdAndDelete(id);

  await FoodListModel.updateMany({}, { $pull: { FoodItems: id } });
  res
    .status(200)
    .json({ status: "ok", message: "Food item removed successfully" });
};

const Foodlistrender = async (req, res) => {
  const food = await FoodListModel.find().populate("FoodItems");
  const Food_list = food[0].FoodItems;

  res.status(200).json({
    status: "ok",
    message: "Food item added successfully",
    Food: Food_list,
  });
};

export { FoodControllerAdd, Foodlistrender, removeFoodItem };
