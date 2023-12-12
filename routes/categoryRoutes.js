const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.route("/:category").get(categoryController.getCategoryProducts);

module.exports = router;