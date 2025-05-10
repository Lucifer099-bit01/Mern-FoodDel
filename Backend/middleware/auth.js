import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

function isLoggedin(req, res, next) {
  const token = req.headers.token;
  
  if (!token) {
    return res
      .status(401)
      .json({ status: "False", message: "Please login first" });
  }
  
  try {
    const data = jwt.verify(token, process.env.JWT_token);
    req.user = data._id;
    if(!req.user){
        return res.status(401).json({ status: "False", message: "Invalid token" });
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "False", message: "Invalid or expired token" });
  }
}

export default isLoggedin;
