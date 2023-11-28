const express = require("express");
const homepageController = require("../controllers/homepageController");
const router = express.Router();

router.route("/").get(homepageController.getHomeDetails);

module.exports = router;
