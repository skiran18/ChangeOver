const { db_connection } = require("../utils/database");

const getAllProducts = async (req, res) => {
  let products_obj = {};

  db_connection.then(async (db_conn) => {
    let err_all_products
    await db_conn
      .query("select * from Product")
      .then(async (products) => {
        let product_entries = products["recordset"];
        products_obj["allProducts"] = await fetchImageInsp(
          db_conn,
          product_entries
        );
      })
      .catch((err) => {
        err_all_products = true
        console.log(err);
        res.set("Content-Type", "application/json");
        res
          .status(500)
          .send(
            JSON.stringify({
              errorStatus: 500,
              error: "Error while quering for all products",
            })
          );
        return;
      });
      if (err_all_products){
        return
      }

    db_conn
      .query("select * from Product where Discount > 0")
      .then(async (sale_products) => {
        let sale_product_entries = sale_products["recordset"];
        products_obj["saleProducts"] = await fetchImageInsp(
          db_conn,
          sale_product_entries
        );
        res.set("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(products_obj));
      })
      .catch((err) => {
        console.log(err);
        res.set("Content-Type", "application/json");
        res
          .status(500)
          .send(
            JSON.stringify({
              errorStatus: 500,
              error: "Error while quering for sale products",
            })
          );
        return;
      });
  });
};

const fetchImageInsp = async (db_instance, entries) => {
  for (let ele of entries) {
    img_obj = await db_instance.query(
      `select ImgLink from Image where ImgId = '${ele["ImgId"]}'`
    );
    let img_entry = img_obj["recordset"];
    ele["ImgLink"] = img_entry[0]["ImgLink"];

    insp_obj = await db_instance.query(
      `select InspectionDate,Rating,Comments,ApparelExpertID from Inspection where InspectionID = '${ele["InspectionID"]}'`
    );
    let insp_entry = insp_obj["recordset"][0];
    ele["InspectionDate"] = insp_entry["InspectionDate"];
    ele["Rating"] = insp_entry["Rating"];
    ele["Comments"] = insp_entry["Comments"];
    ele["ApparelExpertID"] = insp_entry["ApparelExpertID"];
  }

  return entries;
};


module.exports = {getAllProducts, fetchImageInsp}
