// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "ocvwlym0zv3tcn68.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "x94prr91fvar4lwd",
  password: "r8zd4co4lrc5liub",
  database: "j6jxgv1mso2dra1q",
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
