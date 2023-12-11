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
          .then((result_insp)=>{
            db_conn.query(
            `select TOP 1 * from InspectionOrder ORDER BY InspectionOrderID Desc`)
            .then((res) => {
              inspectionId = res["recordset"][0]['InspectionOrderID']
              console.log(res)
            })
          })
        }
        console.log(result)
        res.send(result)
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
      // if (err_all_products){
      //   return
      // }
  });
};


module.exports = {createProduct}