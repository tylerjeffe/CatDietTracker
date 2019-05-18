var express = require("express");
var cat_routes = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");
var meal_content_item = require("../models/meal_content_item.js");
var moment = require("moment");

// routes:

// read: 'cat' data (all)
cat_routes.get("/", function(req, res) {
  cat.all(function(data) {
    var data_object = {
      cats: data[0],
      rooms: data[1]
    };
    console.log(data_object);
    res.render("login-view.handlebars", data_object);
  });
});

// read: 'cat' data (all)
cat_routes.get("/api/cats", function(req, res) {
  cat.all(function(data) {
    var data_object = {
      cats: data[0],
      rooms: data[1]
    };
    //console.log(data_object);
    res.render("index", data_object);
  });
});

// read: 'cat' data (one)
cat_routes.get("/api/cats/:id", function(req, res) {

  const route_cat_id = req.params.id;

  cat.one(route_cat_id, function(data) {
    // refector - collect meal data using - mealsController / models
    const data_object = {
      cats: data[0],
      meals_Sun: data[1],
      meals_Mon: data[2],
      meals_Tue: data[3],
      meals_Wed: data[4],
      meals_Thu: data[5],
      meals_Fri: data[6],
      meals_Sat: data[7],
      meal_items: data[8]
    }

    console.log("\n\n" + JSON.stringify(data_object.meals_Sun) + "\n\n");
    console.log("\n\n" + JSON.stringify(data_object.meals_Mon) + "\n\n");
    console.log("\n\n" + JSON.stringify(data_object.meals_Tue) + "\n\n");

    // MOMENT.JS DATETIME TESTING - CONSTRUCTION ZONE
    // working with week() - Sunday - Saturday 
    var tempDateTime = "2019-04-29T01:00:00.000Z";
    var dateTimeObject = moment(tempDateTime).format("YYYY-MM-DD");

    console.log("dateTimeObject: " + dateTimeObject);
    var weeknumber = moment("12-25-1995", "MM-DD-YYYY").week();
    console.log("Weeknumber: " + weeknumber);

    console.log("Beginning of Week: " + moment().startOf("week"));
    console.log("End of Week: " + moment().endOf("week"));

    // get week range
    const today = moment();
    const from_date = moment(today).startOf('week');
    const to_date = moment(today).endOf('week');
    //    const from_date = moment(tempDateTime).startOf('week');
    //    const to_date = moment(tempDateTime).endOf('week');
    console.log({
      from_date: from_date.toString(),
      today: moment().toString(),
      to_date: to_date.toString(),
    });
    // END MOMENT.JS DATETIME TESTING - CONSTRUCTION ZONE

    res.render("cat-view", data_object);
  });
});


// read: 'cat' data (one) for a specified week
cat_routes.get("/api/cats/:id/:datemonth/:dateday/:dateyear", function(req, res) {

  console.log("inside id/date() . . . ");

  const route_cat_id = req.params.id;
  const route_view_date = req.params.datemonth + "-" + req.params.dateday + "-" + req.params.dateyear;

  console.log("Controller: route_view_date: " + route_view_date);

  // get week range
  const target_date = moment(route_view_date).format("MM-DD-YYYY");
  const view_from_date = moment(target_date).startOf('week').format("MM-DD-YYYY");
  const view_to_date = moment(target_date).endOf('week').format("MM-DD-YYYY");
  
  console.log("Week Date Range: " + view_from_date + " - " + view_to_date);

  cat.one_view_by_date(route_cat_id, view_from_date, function(data) {
    // refector - collect meal data using - mealsController / models
    const data_object = {
      cats: data[0],
      meals_Sun: data[1],
      meals_Mon: data[2],
      meals_Tue: data[3],
      meals_Wed: data[4],
      meals_Thu: data[5],
      meals_Fri: data[6],
      meals_Sat: data[7],
      meal_items: data[8]
    }

    console.log("\n\n" + JSON.stringify(data_object.meals_Sun) + "\n\n");
    console.log("\n\n" + JSON.stringify(data_object.meals_Mon) + "\n\n");
    console.log("\n\n" + JSON.stringify(data_object.meals_Tue) + "\n\n");

    /*
    // MOMENT.JS DATETIME TESTING - CONSTRUCTION ZONE
    // working with week() - Sunday - Saturday 
    var tempDateTime = "2019-04-29T01:00:00.000Z";
    var dateTimeObject = moment(tempDateTime).format("YYYY-MM-DD");

    console.log("dateTimeObject: " + dateTimeObject);
    var weeknumber = moment("12-25-1995", "MM-DD-YYYY").week();
    console.log("Weeknumber: " + weeknumber);

    console.log("Beginning of Week: " + moment().startOf("week"));
    console.log("End of Week: " + moment().endOf("week"));

    // get week range
    const today = moment();
    const from_date = moment(today).startOf('week');
    const to_date = moment(today).endOf('week');
    //    const from_date = moment(tempDateTime).startOf('week');
    //    const to_date = moment(tempDateTime).endOf('week');
    console.log({
      from_date: from_date.toString(),
      today: moment().toString(),
      to_date: to_date.toString(),
    });
    // END MOMENT.JS DATETIME TESTING - CONSTRUCTION ZONE
    */
    res.render("cat-view", data_object);
  });

});


// create: new 'cat' (via form -> submit button -> post)
cat_routes.post("/api/cats", function(req, res) {
  cat.create([
    "cat_name", "cat_starting_weight", "cat_alert_flag", "cat_notes", "cat_location_id_fk", "cat_location_room", "cat_location_kennel"
  ], [
    req.body.name, req.body.weight, 0, req.body.notes, -1, req.body.room, req.body.kennel
  ], function(result) {
    // Send back the ID of the new cat
    res.json({ id: result.insertId });
  });
});

// update: 'cat' data - refactor
/*
cat_routes.put("/api/cats/:id", function(req, res) {
  var condition = req.params.id;

  cat.update({
    cat_name: req.body.value
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });

});
*/

// delete: 'cat' data
cat_routes.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export routes for server use
module.exports = cat_routes;
