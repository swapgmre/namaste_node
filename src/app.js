const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")


app.use(express.json());

app.post("/signup", async (req, res) => {

  const { firstName, lastName, emailId, password } = req.body;
  const data = req.body;
  const user = new User(data);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.send(`ERROR saving the user: ${err.message}`);
  }
})



connectDB()
  .then(() => {
    console.log("Database Connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777...")
    });
  }).catch((err) => {
    console.error("Database cannot be connected !!")
  });
