const express = require("express");
const filterController = require("../controllers/filterController");
const router = express.Router();

router.route("/:filterType").get(filterController.getFilteredProducts);

module.exports = router;
