const express = require("express");
const path = require('path')
const app = express();
const homepageRouter = require("./routes/homePage");
const categoryRouter = require("./routes/categoryRoutes");

app.use('/imgs',express.static(path.join(__dirname, 'public/images')));

app.use("/home", homepageRouter);
app.use("/category", categoryRouter);
module.exports = app;
