import userModel from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const { password, email } = req.body;
  const alreadyuser = await userModel.findOne({ email });
  if (alreadyuser) {
    res.status(200).json({ status: "found", message: "User Already Registered" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await userModel.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
        });
        res.status(200).json({
          status: "ok",
          message: " registered successfully please login",
        });
      });
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_token);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          status: "ok",
          message: "Logged in",
          token: token,
          user: user,
        });
      }
    });
  }
};

export { Register, Login };
