const express = require("express");
const sellController = require("../controllers/sellController");
const router = express.Router();

router.route("/").post(sellController.createProduct);

module.exports = router;
