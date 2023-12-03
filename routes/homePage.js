const express = require("express");
const homepageController = require("../controllers/homepageController");
const router = express.Router();

router.route("/").get(homepageController.getAllProducts);

module.exports = router;
