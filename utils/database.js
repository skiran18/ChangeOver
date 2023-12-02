const mssql = require("mssql");
require("dotenv").config();

let db_connection = mssql.connect(
// const db_connection = mssql.connect(
  `Driver={ODBC Driver 18 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_NAME};Uid=${process.env.DB_USER};Pwd=${process.env.DB_PWD};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;`
).then(pool=>{
    // db_connection=pool
    console.log(pool)
    console.log("successfully connected to MS SQL!")
    return pool
}).catch(err=>{
    console.log(err)
})

module.exports = {db_connection};
