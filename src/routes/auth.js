const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);


    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    await user.save();
    res.send("User added successfully")
  } catch (err) {
    res.send(`ERROR: ${err.message}`);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT token
      const token = await user.getJWT();

      //Add the token to the cookie  and send response back to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials!");
    }

  } catch (err) {
    res.send(`ERROR: ${err.message}`);
  }

});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.send("Logout Successful!")
  } catch (err) {
    res.send(`ERROR: ${err.message}`);
  }
});


module.exports = authRouter;