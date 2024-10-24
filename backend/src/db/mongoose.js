require("dotenv").config();
const { Db } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://abhinavprime835:abhinav123prime@cluster0.jns7z.mongodb.net/connectin`,
  {
    useNewUrlParser: true,
  }
);
console.log("database connected !");
