const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect("mongodb+srv://swapgmre:0iMzTbVymupjUjiz@namastenode.ktish.mongodb.net/nm-node-practice");
};

module.exports = connectDB;
