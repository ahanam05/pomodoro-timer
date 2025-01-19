const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://user123:mongodb123@ac-utkzi0k.hlxuyz8.mongodb.net/pomodoro?retryWrites=true&w=majority';

async function connectToDb(){
  try{
      await mongoose.connect(dbURI);
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