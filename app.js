const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const connectDB = require("./config/db");
const plans = require("./plans");
const dotenv = require("dotenv");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const User = require('./models/userModel');
const Plan = require('./models/planModel');

dotenv.config();
connectDB();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));
app.use(bodyParser.json())
app.use(express.static("public"));


const indexRoute = require('./routes/index');
app.use("/", indexRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Listening to the port ${PORT}`);
})
