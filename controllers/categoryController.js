const { db_connection } = require("../utils/database");

exports.getMenProducts = async (req, res) => {
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
        res.status(200).send(JSON.stringify(cat_products_obj));
      })
};