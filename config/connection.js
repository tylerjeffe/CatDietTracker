// Set up MySQL connection.
const mysql = require("mysql");

let connection = null;
/*
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  console.log("connecting via environment variable credential data - more secure");
}
else {
  connection = mysql.createConnection("mysql://gt5tv0dxt5vfjs01:ov0ca0z0z2gski18@rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/wocqowge8kfukc9z?multipleStatements=true");
  console.log("connecting via hard-coded connection string - unsecure");
}
*/
connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Earth123!",
  database: "cat_diet_tracker_db",

  multipleStatements: true
});

/*
const connection = mysql.createConnection({
    host: "rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,

    user: "gt5tv0dxt5vfjs01",
    password: "ov0ca0z0z2gski18",
    database: "wocqowge8kfukc9z",

    multipleStatements: true
});
*/

// Make connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
