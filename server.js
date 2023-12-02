const app = require("./app");
const {db_connection} = require('./utils/database')
require("dotenv").config();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
//   dbStart()
});
