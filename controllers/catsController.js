var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");
var meal_content_item = require("../models/meal_content_item.js");
var moment = require("moment");

// Create all our routes and set up logic within those routes where required - Original
// show all cats at '/'
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// show all cats at '/api/cats'
router.get("/api/cats", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log("All Cats: hbsObject " + hbsObject);
    res.render("index", hbsObject);
  });
});

// show single cat data at '/api/cats/:id'
router.get("/api/cats/:id", function(req, res) {

  var route_cat_id = req.params.id;

  cat.one(route_cat_id, function(data) {

    // 'handlebars' object - refer to 'key' names in *.handlebars files
    var hbsObject = {
      cats: data[0],
      meals_Sun: data[1],
      meals_Mon: data[2],
      meals_Tue: data[3],
      meals_Wed: data[4],
      meals_Thu: data[5],
      meals_Fri: data[6],
      meals_Sat: data[7]
    }

    // check - sort out 'meal' data
    console.log("\nMeal Data:\n" + JSON.stringify(data[1]));
    console.log("Cat Data (single) - Meal Data (one week): hbsObject: " + JSON.stringify(hbsObject));

    // MOMENT.JS DATETIME TESTING
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
    // END MOMENT.JS DATETIME TESTING

    //res.render("single-cat-view", hbsObject);
    res.render("cat-view", hbsObject);
  });
});


// show single cat (:id) data for a particular week (:date) at '/api/cats/:id/:date'
/*
router.get("/api/cats/:id/:date", function(req, res) {

  var route_cat_id = "" + req.params.id;
  var route_date = req.params.date;

  cat.one(route_cat_id, route_date, function(data) {
    var hbsObject = {
      cats: data
    };
    console.log("Single Cat with Date: hbsObject: " + JSON.stringify(hbsObject));
    res.render("single-cat-view", hbsObject);
  });
});
*/

// add new cat via form -> submit button -> post
router.post("/api/cats", function(req, res) {
  cat.create([
    "cat_name", "cat_starting_weight", "cat_alert_flag", "cat_notes", "cat_location_id_fk", "cat_location_room", "cat_location_kennel"
  ], [
    req.body.name, req.body.weight, 0, req.body.notes, -1, req.body.room, req.body.kennel
  ], function(result) {
    // Send back the ID of the new cat
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = req.params.id;
  console.log("condition" + condition);

  cat.update({
    sleepy: req.body.meal-item-consumed-value
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// get all meal_content_items at '/api/meals/meal_content_items'
router.get("/api/meal_content_items", function(req, res) {
  meal_content_item.all(function(data) {
    var hbsObject = {
      mealItems: data
    };
    console.log("All meal_content_items: hbsObject " + hbsObject);
    res.render("meal_content_items", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
