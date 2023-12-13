const { db_connection } = require("../utils/database");
const { fetchImageInsp } = require("./homepageController");

const filterTypes = {
    "Price_LowToHigh": "Price ASC",
    "Price_HighToLow": "Price DESC",

}

exports.getFilteredProducts = async (req, res) => {
    let filtered_products_obj = {};
    db_connection.then(async (db_conn) => {
    let err_all_products;
        await db_conn
            .query(`select * from Product ORDER BY ${filterTypes[req.params.filterType]}`)
            .then(async (products) => {
                let product_entries = products["recordset"];
                filtered_products_obj["filterProducts"] = await fetchImageInsp(
                    db_conn,
                    product_entries
                );
                res.set("Content-Type", "application/json");
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(filtered_products_obj));
            })
            .catch((err) => {
                err_all_products = true;
                console.log(err);
                res.set("Content-Type", "application/json");
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(500).send(
                    JSON.stringify({
                        errorStatus: 500,
                        error: "Error while quering for all products",
                    })
                );
                return;
            });
        if (err_all_products) {
            return;
        }
    });
};