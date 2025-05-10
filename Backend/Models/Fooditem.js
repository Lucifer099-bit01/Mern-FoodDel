import mongoose from "mongoose";


const FooditemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,

})

const FooditemModel = mongoose.model("Fooditem", FooditemSchema);

export default FooditemModel;