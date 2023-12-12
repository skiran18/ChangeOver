const { db_connection } = require("../utils/database");
const { fetchImageInsp } = require("./homepageController");

exports.getMenProducts = async (req, res) => {
    let cat_products_obj = {};
    db_connection.then(async (db_conn) => {
    let err_all_products;
        await db_conn
            .query(`select * from Product where Category = '${req.params.category}'`)
            .then(async (products) => {
                let product_entries = products["recordset"];
                cat_products_obj["categoryProducts"] = await fetchImageInsp(
                    db_conn,
                    product_entries
                );
                res.set("Content-Type", "application/json");
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(cat_products_obj));
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