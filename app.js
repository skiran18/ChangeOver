const express = require("express");
const path = require('path')
const app = express();
const homepageRouter = require("./routes/homePage");

app.use('/imgs',express.static(path.join(__dirname, 'public/images')));

app.use("/home", homepageRouter);
module.exports = app;
