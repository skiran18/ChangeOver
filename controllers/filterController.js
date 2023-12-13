const { db_connection } = require("../utils/database");
const { fetchImageInsp } = require("./homepageController");

const filterTypes = {
    "Price_LowToHigh": "Price ASC",
    "Price_HighToLow": "Price DESC",

}

exports.getFilteredProducts = async (req, res) => {
    let filtered_products_obj = {};
};