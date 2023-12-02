const { db_connection } = require("../utils/database");

exports.getHomeDetails = (req, res) => {
  let products_obj = []; // ProductName,Price,Description,EntryDate,Age,Category,Size
  let sale_products = {}; // ProductName,Price,Description,EntryDate,Age,Category,Size

  db_connection.then((db_conn) => {
    db_conn.query("select * from Product").then(async (products) => {
      let product_entries = products["recordset"];
      for (let ele of product_entries) {

        img_obj = await db_conn.query(
          `select ImgLink from Image where ImgId = '${ele["ImgId"]}'`
        );
        let img_entry = img_obj["recordset"];
        ele["ImgLink"] = img_entry[0]["ImgLink"];

        insp_obj = await db_conn.query(
          `select InspectionDate,Rating,Comments,ApparelExpertID from Inspection where InspectionID = '${ele["InspectionID"]}'`
        );
        let insp_entry = insp_obj["recordset"][0];
        ele["InspectionDate"] = insp_entry["InspectionDate"];
        ele["Rating"] = insp_entry["Rating"];
        ele["Comments"] = insp_entry["Comments"];
        ele["ApparelExpertID"] = insp_entry["ApparelExpertID"];

      }
      products_obj = product_entries;
      console.log(products_obj);
      res.send(JSON.stringify(products_obj));
    });
  });
};
