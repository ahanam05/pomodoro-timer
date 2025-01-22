const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const routes = require("./routes/index");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

async function connectToDb(){
  try{
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB Atlas');
  } catch(error){
      console.log('An error occurred: ', error);
  }
}

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
    connectToDb();
})

app.use(routes);