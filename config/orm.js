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
    var queryStringCat = "SELECT * FROM " + tableInput + " WHERE cat_id =" + route_cat_id + ";";
  
    //temp queryString
    // refactor - need to add / return 'weekly meal data' for 'target week'

    var date1 = "2019-04-28",
        date2 = "2019-05-01";

    // Daily Meal Log - Query String Root
    const queryStringMealsRoot = 
      "SELECT m1.meal_id, m1.meal_date_time, m1.meal_cat_id_fk, m1.meal_server_id_fk, m1.meal_location_id_fk,"
            +"mc1.meal_content_id, mc1.meal_content_description, mc1.meal_content_consumed, mc1.meal_id_fk " +
      "FROM  meals m1, meal_contents mc1 " + 
      "WHERE mc1.meal_id_fk = m1.meal_id " + "AND m1.meal_cat_id_fk=" + route_cat_id + " ";
/*
      "AND m1.meal_date_time >= ? AND m1.meal_date_time <= ? " + 
      "ORDER BY m1.meal_id;";
*/

    var queryStringSun = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-05' AND m1.meal_date_time <= '2019-05-06' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringMon = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-06' AND m1.meal_date_time <= '2019-05-07' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringTue = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-07' AND m1.meal_date_time <= '2019-05-08' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringWed = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-08' AND m1.meal_date_time <= '2019-05-09' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringThu = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-09' AND m1.meal_date_time <= '2019-05-10' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringFri = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-10' AND m1.meal_date_time <= '2019-05-11' " + 
                       "ORDER BY m1.meal_id;";
    var queryStringSat = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-11' AND m1.meal_date_time <= '2019-05-12' " + 
                       "ORDER BY m1.meal_id;";

    var queryStringMealItems = "SELECT * FROM meal_content_items;";

/*
                       var queryString3 = 
      "SELECT m1.meal_id, m1.meal_date_time, m1.meal_cat_id_fk, m1.meal_server_id_fk, m1.meal_location_id_fk,"
             +"mc1.meal_content_id, mc1.meal_content_description, mc1.meal_content_consumed, mc1.meal_id_fk " +
      "FROM  meals m1, meal_contents mc1 " + 
      "WHERE mc1.meal_id_fk = m1.meal_id " + "AND m1.meal_cat_id_fk=" + route_cat_id + " " + 
        "AND m1.meal_date_time >= '2019-05-01' AND m1.meal_date_time <= '2019-05-02' " + 
      "ORDER BY m1.meal_id;";
*/

    const queryString = queryStringCat + queryStringSun + queryStringMon + queryStringTue + queryStringWed + 
                        queryStringThu + queryStringFri + queryStringSat + queryStringMealItems;

    //console.log("\n\nqueryString1 = " + queryString1);
    //console.log("\n\nqueryString2 = " + queryString2);
    //console.log("\n\nqueryString3 = " + queryString3);

    // use moment.js to advance through the days of the week ???

    //connection.query(mealsQueryStringRoot,[date1, date2], function(err, result) {
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
