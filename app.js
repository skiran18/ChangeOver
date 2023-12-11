const express = require("express");
const path = require('path')
const app = express();
const homepageRouter = require("./routes/homePage");
const categoryRouter = require("./routes/categoryRoutes");
const sellRouter = require("./routes/sellRoutes");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/imgs',express.static(path.join(__dirname, 'public/images')));

app.use("/home", homepageRouter);
app.use("/category", categoryRouter);
app.use("/sell",sellRouter);
module.exports = app;
