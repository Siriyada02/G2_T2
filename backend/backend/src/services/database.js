const mysql = require("mysql2")
const {DB_Port, DB_Database, DB_Password, DB_User, DB_Host} = require("../configs/constants");

const dbConfig = {
  host: DB_Host,
  user: DB_User,
  password: DB_Password,
  database: DB_Database,
  port: DB_Port
}

const connection = mysql.createConnection(dbConfig);

connection.connect((err, connection) => {
  if (err) {
    console.log(err)
    console.log("Can't connect Database")
  } else {
    console.log("Database is connected")
  }
})

connection.on('error', (err) => {
  console.log(err)
})

module.exports = connection.promise();