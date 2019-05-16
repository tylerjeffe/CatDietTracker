// Import MySQL connection.
const connection = require("../config/connection.js");

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
    const queryString1 = "SELECT * FROM " + tableInput + ";",
          queryString2 = "SELECT * FROM locations GROUP BY room_number;";

    const queryString = queryString1 + queryString2;

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

    const queryStringSun = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-05' AND m1.meal_date_time < '2019-05-06' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringMon = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-06' AND m1.meal_date_time < '2019-05-07' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringTue = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-07' AND m1.meal_date_time < '2019-05-08' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringWed = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-08' AND m1.meal_date_time < '2019-05-09' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringThu = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-09' AND m1.meal_date_time < '2019-05-10' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringFri = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-10' AND m1.meal_date_time < '2019-05-11' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;",
          queryStringSat = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-11' AND m1.meal_date_time < '2019-05-12' " + 
                       "ORDER BY m1.meal_id, mc1.meal_content_id;";

/*
    const queryStringSun = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-12' AND m1.meal_date_time < '2019-05-13' " + 
                       "ORDER BY m1.meal_id;",
          queryStringMon = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-13' AND m1.meal_date_time < '2019-05-14' " + 
                       "ORDER BY m1.meal_id;",
          queryStringTue = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-14' AND m1.meal_date_time < '2019-05-15' " + 
                       "ORDER BY m1.meal_id;",
          queryStringWed = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-15' AND m1.meal_date_time < '2019-05-16' " + 
                       "ORDER BY m1.meal_id;",
          queryStringThu = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-16' AND m1.meal_date_time < '2019-05-17' " + 
                       "ORDER BY m1.meal_id;",
          queryStringFri = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-17' AND m1.meal_date_time < '2019-05-18' " + 
                       "ORDER BY m1.meal_id;",
          queryStringSat = queryStringMealsRoot +
                       "AND m1.meal_date_time >= '2019-05-18' AND m1.meal_date_time < '2019-05-19' " + 
                       "ORDER BY m1.meal_id;";
*/

    var queryStringMealItems = "SELECT * FROM meal_content_items;";

    const queryString = queryStringCat + queryStringSun + queryStringMon + queryStringTue + queryStringWed + 
                        queryStringThu + queryStringFri + queryStringSat + queryStringMealItems;

     connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    })
  },
  one_location: function(tableInput, route_location_room, cb) {
    var queryString = "SELECT loc.location_id, loc.room_number, loc.kennel_number, loc.location_cat_id_fk, c1.cat_id, c1.cat_name " +
                      "FROM locations loc, cats c1 " + 
                      "WHERE loc.location_cat_id_fk = c1.cat_id " +
                        "AND loc.room_number = " + route_location_room + ";";

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
