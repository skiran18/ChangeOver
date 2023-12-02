const {db_connection} = require('../utils/database')

exports.getHomeDetails = async (req, res) => {
  let products = {}; // ProductName,Price,Description,EntryDate,Age,Category,Size
  let sale_products = {}; // ProductName,Price,Description,EntryDate,Age,Category,Size

  db_conn = await db_connection
  db_conn.query(
    "select * from Product",
    (err, result) => {
      console.log(result);
      res.send(JSON.stringify(result));
    }
    );

};
