const { db_connection } = require("../utils/database");

const createProduct = async (req, res) => {

  let customer_details = {}
  console.log(req.body)
  // customer_details.CustomerName
  // customer_details.PhoneNumber
  // customer_details.EmailID
  // customer_details.Address

  db_connection.then(async (db_conn) => {
    // let err_all_products
    await db_conn
      .query(`declare @count as int
      set @count= (Select COUNT(CustomerID) FROM Customer)+1
      Insert INTO Customer
      VALUES (@count,'${req.body.CustomerName}','${req.body.PhoneNumber}','${req.body.EmailID}','${req.body.Address}')`)
      .then(async (result) => {
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
