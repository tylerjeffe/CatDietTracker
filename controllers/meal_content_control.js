var express = require("express");
var meal_content_routes = express.Router();

// import models for use of database functions.
var meal = require("../models/meal.js");
var meal_content = require("../models/meal_content");
var meal_content_item = require("../models/meal_content_item.js");

// create routes - set up logic within those routes where required

// read: 'meal_content' data (all)
meal_content_routes.get("/api/meal_contents", function(req, res) {
  meal_content.all(function(data) {
    var data_object = {
      meal_contents: data
    };
    console.log("all meal_contents: data_object " + data_object);
    res.render("meal-contents-view", data_object);
  });
});

// read: 'meal_content' data (one)
meal_content_routes.get("/api/meal_contents/:id", function(req, res) {
  var route_meal_id = req.params.id;

  meal_content.one(route_meal_id, function(data) {
    var data_object = {
      meals: data
    }
    console.log("\nmeal_contents data:\n" + JSON.stringify(data));
    res.render("meal-contents-view", data_object);
  });
});


// create: new 'meal' (via form -> submit button -> post)
meal_content_routes.post("/api/meal_contents", function(req, res) {
  meal_content.create([
    // meal table rows
  ], [
    // new meal values:
    //req.body.name, req.body.weight, 0, req.body.notes, -1, req.body.room, req.body.kennel
  ], function(result) {
    // Send back the ID of the new cat
    res.json({ id: result.insertId });
  });
});

// update: 'meal' with new data
meal_content_routes.put("/api/meal_contents/:id", function(req, res) {
  var condition = "meal_content_id = " + req.params.id;
  console.log("condition" + condition);

  console.log("req.body -> " + JSON.stringify(req.body));
  console.log("req.body.value: consumed -> " + req.body.value);

  meal_content.update({
    // UPDATE BELOW - TESTING ONLY
    meal_content_consumed: req.body.value
    // sleepy: req.body.meal-item-consumed-value
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// delete: 'meal'
meal_content_routes.delete("/api/meal_contents/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  meal_content.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = meal_content_routes;
