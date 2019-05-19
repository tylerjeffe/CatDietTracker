// Import MySQL connection.
const connection = require("../config/connection.js");
var moment = require("moment");

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

// utility function - time related
function getNextDay(date_input) {
  return moment(date_input).add(1,'days').format("YYYY-MM-DD");
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    const queryString1 = "SELECT * FROM " + tableInput + ";",
          queryString2 = "SELECT * FROM locations GROUP BY room_number;";

    const queryString = queryString1 + queryString2;

    console.log("*** orm:all() . . .\n" + queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  one: function(tableInput, route_cat_id, cb) {

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
    // refactor: set to current week by default
    let today = moment();
    let beginDate = moment(today).startOf('week').format("YYYY-MM-DD");
    console.log("\n*** SUN begin date -> " + beginDate);
    let endDate = moment(beginDate).add(1,'days').format("YYYY-MM-DD");
    console.log("\n*** SUN end date -> " + endDate + " <--- ***");

    //let beginDate = moment().format("YYYY-MM-DD"),
    //    endDate = moment(beginDate).add(1,'days').format("YYYY-MM-DD");

    const queryStringSun = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    console.log("\n *** queryStringSun:\n"+queryStringSun);

    beginDate = endDate;
    endDate = getNextDay(beginDate);
            
    const queryStringMon = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

          beginDate = endDate;
          endDate = getNextDay(beginDate);
            
    const queryStringTue = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

          beginDate = endDate;
          endDate = getNextDay(beginDate);
            
    const queryStringWed = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

          beginDate = endDate;
          endDate = getNextDay(beginDate);
           
    const queryStringThu = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

          beginDate = endDate;
          endDate = getNextDay(beginDate);
            
    const queryStringFri = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

          beginDate = endDate;
          endDate = getNextDay(beginDate);
                  
    const queryStringSat = queryStringMealsRoot +
          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    var queryStringMealItems = "SELECT * FROM meal_content_items;";

    console.log("queryStringSun:\n" + queryStringSun);

    const queryString = queryStringCat + queryStringSun + queryStringMon + queryStringTue + queryStringWed + 
                        queryStringThu + queryStringFri + queryStringSat + queryStringMealItems;

     connection.query(queryString, function(err, result) {
      if (err) throw err;

      cb(result);
    })
  },

  one_view_by_date: function(tableInput, route_cat_id, view_from_date, cb) {

    console.log("\n\n*** ORM: inside -> one_view_by_date() . . .");

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

    let beginDate = moment(view_from_date).format("YYYY-MM-DD"),
        endDate = getNextDay(beginDate);


    //let testDate = moment([2019, 05, 06]).add(1, 'd').format();
    //console.log("\n\ntestDate: " + testDate);    

    console.log("\n\nORM: beginDate: " + beginDate + "\tendDate: " + endDate);

    const queryStringSun = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";
                     
    beginDate = endDate;
    console.log("New beginDate = " + beginDate);
    endDate = getNextDay(beginDate);
    console.log("New endDate = " + endDate);

    const queryStringMon = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    beginDate = endDate;
    endDate = getNextDay(beginDate);

    const queryStringTue = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    beginDate = endDate;
    endDate = getNextDay(beginDate);
                                            
    const queryStringWed = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    beginDate = endDate;
    endDate = getNextDay(beginDate);
                      
    const queryStringThu = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    beginDate = endDate;
    endDate = getNextDay(beginDate);
                                            
    const queryStringFri = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";

    beginDate = endDate;
    endDate = getNextDay(beginDate);
                                            
    const queryStringSat = queryStringMealsRoot +
                          "AND m1.meal_date_time >= '" + beginDate + "' AND m1.meal_date_time < '" + endDate + "'" + 
                          " ORDER BY m1.meal_id, mc1.meal_content_id;";                      

    var queryStringMealItems = "SELECT * FROM meal_content_items;";

    const queryString = queryStringCat + queryStringSun + queryStringMon + queryStringTue + queryStringWed + 
                        queryStringThu + queryStringFri + queryStringSat + queryStringMealItems;

    console.log("queryStringSun:\n" + queryStringSun);
    console.log("queryStringFri:\n" + queryStringFri);

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
