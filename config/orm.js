// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  one: function(tableInput, route_cat_id, cb) {

    // original
    var queryString1 = "SELECT * FROM " + tableInput + " WHERE cat_id =" + route_cat_id + ";";
  
    //temp queryString
    // refactor - need to add / return 'weekly meal data' for 'target week'

    var queryString2 = 
      "SELECT m1.meal_id, m1.meal_date_time, m1.meal_cat_id_fk, m1.meal_server_id_fk, m1.meal_location_id_fk,"
             +"mc1.meal_content_id, mc1.meal_content_description, mc1.meal_content_consumed, mc1.meal_id_fk " +
      "FROM  meals m1, meal_contents mc1 " + 
      "WHERE mc1.meal_id_fk = m1.meal_id " + "AND m1.meal_cat_id_fk=" + route_cat_id + " " +
      "ORDER BY m1.meal_id;";

    var queryString = queryString1 + queryString2;

    console.log("one() queryString = " + queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    })
  },
  /*
  one_date: function(tableInput, route_cat_id, route_date, cb) {

    // original
    //var queryString = "SELECT * FROM " + tableInput + " WHERE cat_id =" + condition + ";";
  
    //temp queryString
    // refactor - need to add / return 'weekly meal data' for 'target week'

    var queryString = 
    "SELECT m1.meal_id, m1.meal_date_time, m1.meal_cat_id_fk, m1.meal_server_id_fk, m1.meal_location_id_fk,"
           +"mc1.meal_content_id, mc1.meal_content_description, mc1.meal_content_consumed, mc1.meal_id_fk"
    +" FROM  meals m1, meal_contents mc1" 
    +" WHERE mc1.meal_id_fk = m1.meal_id" + " AND m1.meal_cat_id_fk=" + route_cat_id
    +" ORDER BY m1.meal_id;";

    console.log("one() queryString = " + queryString);

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      
      cb(result);
    })
  },
  */  
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
