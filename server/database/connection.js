const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fare",
  database: "web-shop",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected!!");
});

module.exports = con;
