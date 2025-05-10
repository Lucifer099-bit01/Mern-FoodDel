import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  items: {type: Array},
  TotalPrice: String,
  address: {type: Object},
  OrderStatus: {
    type: String,
    enum: ["Being Cooked", "Dispatched", "Delivered"],
    default: "Being Cooked",
  },
    OrderDate: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
