const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  // Read the token from the request cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid !!!")
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$91");
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;  // when we found the user above, we can just attach to req object 
    next();
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
};


module.exports = {
  userAuth,
}