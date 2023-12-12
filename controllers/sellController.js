const { db_connection } = require("../utils/database");

const createProduct = async (req, res) => {

  let customer_details = {}
  console.log(req.body)

  db_connection.then(async (db_conn) => {
    let inspectionId = ''
    await db_conn
      .query(`declare @count as int
      set @count= (Select COUNT(CustomerID) FROM Customer)+1
      Insert INTO Customer
      VALUES (@count,'${req.body.CustomerName}','${req.body.PhoneNumber}','${req.body.EmailID}','${req.body.Address}')`)
      .then(async (result) => {
        if(result.rowsAffected){
          await db_conn.query(`declare @count_inspord as int
          set @count_inspord= (Select COUNT(InspectionOrderID) FROM InspectionOrder)+1
          Insert INTO KiranDB.dbo.InspectionOrder
          VALUES (@count_inspord,'10','not done')`)
          .then(()=>{
            db_conn.query(
            `select TOP 1 * from InspectionOrder ORDER BY InspectionOrderID Desc`)
            .then((result_insp) => {
              inspectionId = result_insp["recordset"][0]['InspectionOrderID']
              console.log(result_insp)
              db_conn.query(`declare @count_sellorder as int
              set @count_sellorder= (Select COUNT(OrderId) FROM SellOrder)+1
              Insert INTO KiranDB.dbo.SellOrder
              VALUES (@count_sellorder,'${req.body.ProductName}','${req.body.Size}','${req.body.Category}','${req.body.PriceNegotiable}','${req.body.Age}','${req.body.PriceQuoted}','${inspectionId}')`)
              .then((final_res)=>{
                console.log(final_res)
                if (final_res.rowsAffected){
                  res.set("Content-Type", "application/json");
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.status(200).send(JSON.stringify({
                    status: 200,
                    message: "Successfully submitted the sell product request",
                  }));
                }
              })
            })
          })
        }
      })
      .catch((err) => {
        err_all_products = true
        console.log(err);
        res.set("Content-Type", "application/json");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res
          .status(500)
          .send(
            JSON.stringify({
              errorStatus: 500,
              error: "Error while submitting sell product details",
            })
          );
        return;
      });
  });
};


module.exports = {createProduct}