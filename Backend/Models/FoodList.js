import mongoose  from "mongoose";



const FoodListSchema = new mongoose.Schema({
    FoodItems: [{type: mongoose.Schema.Types.ObjectId, ref: "Fooditem"}],
})

const FoodListModel = mongoose.model("FoodList", FoodListSchema);

export default FoodListModel;