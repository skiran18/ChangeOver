const express = require("express");
const path = require('path')
const app = express();
const homepageRouter = require("./routes/homePage");
const categoryRouter = require("./routes/categoryRoutes");
const sellRouter = require("./routes/sellRoutes");
const filterRouter = require("./routes/filterRoutes")

var corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
}

app.use(corsOptions);
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/imgs',express.static(path.join(__dirname, 'public/images')));

app.use("/home", homepageRouter);
app.use("/category", categoryRouter);
app.use("/sell",sellRouter);
app.use("/filter",filterRouter)
module.exports = app;
