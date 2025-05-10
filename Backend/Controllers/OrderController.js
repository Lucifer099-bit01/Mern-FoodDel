import orderModel from "../Models/Order.js";
import userModel from "../Models/user.js"

const placeOrder = async (req, res) => {
  try {
    console.log(req.user)
    const neworder = await orderModel.create({
      userId: req.user, 
      items: req.body.items,
      TotalPrice: req.body.total,
      address: req.body.address
    });
    await userModel.findByIdAndUpdate(req.user, {
      $set: { cartData: {} },      
      $push: { Orders: neworder._id } 
    });

    res.json({ status: "ok", message: "Order placed Successfully" });
  } catch (err) {
    console.error("Order placement failed:", err);
    res.status(500).json({ status: "error", message: "Failed to place order" });
  }
};

 const getOrders = async(req,res) => {
     const user = await userModel.findById(req.user).populate("Orders");
     if(user){
      res.json({status: "ok", orderdata: user.Orders})
     }
 }

   const sendOrders = async (req,res) => {
     const orders = await orderModel.find();
     if(orders){
       res.json({status: "ok", orderdata: orders})
     }
   }
 

 const updateStatus = async(req,res) => {
    await orderModel.findByIdAndUpdate(req.params.id,{
      $set: {OrderStatus: req.body.status}
    });
 }

export {placeOrder,getOrders,updateStatus,sendOrders}