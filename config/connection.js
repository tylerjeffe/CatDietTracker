// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,

  user: "gt5tv0dxt5vfjs01",
  password: "ov0ca0z0z2gski18",
  database: "wocqowge8kfukc9z",

  multipleStatements: true
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
