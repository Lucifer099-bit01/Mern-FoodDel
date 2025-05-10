import userModel from "../Models/user.js";

const addToCart = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user });

    const cartData = user.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.user, { cartData });
    res.json({ message: "Item added to cart successfully", cartData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user });
    const cartData = user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.user, { cartData });
    res.json({ message: "Item removed from cart successfully", cartData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: err.message });
  }
};

const getCart = async (req, res) => {
     const user = await userModel.findOne({_id: req.user});
     if(user){
      res.json({status: "ok",message: "cart loaded successfully", cart: user.cartData})
     }
};

export { addToCart, removeFromCart, getCart };
