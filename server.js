const app = require("./app");
const sql = require("mssql");
require("dotenv").config();

const port = process.env.PORT || 3000;

sql
  .connect(
    `Driver={ODBC Driver 18 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Uid=${process.env.DB_USER};Pwd=${process.env.DB_PWD};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;`
  )
  .then((pool) => {
    return pool.request().query("select * from Product");
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
