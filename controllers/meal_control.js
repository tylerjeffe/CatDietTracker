var express = require("express");
var meal_routes = express.Router();

// import models for use of database functions.
var meal = require("../models/meal.js");
var meal_content = require("../models/meal_content");
var meal_content_item = require("../models/meal_content_item.js");

// create routes - set up logic within those routes where required

// read: 'meal' data (all)
meal_routes.get("/api/meals", function(req, res) {
  meal.all(function(data) {
    var data_object = {
      meals: data
    };
    console.log("all meals: data_object " + data_object);
    res.render("meal-view", data_object);
  });
});

// read: 'meal' data (one)
meal_routes.get("/api/meals/:id", function(req, res) {
  var route_meal_id = req.params.id;

  meal.one(route_meal_id, function(data) {
    var data_object = {
      meals: data
    }
    console.log("\nmeal data:\n" + JSON.stringify(data));
    res.render("meal-view", data_object);
  });
});


// create: new 'meal' (via form -> submit button -> post)
meal_routes.post("/api/meals", function(req, res) {
  meal.create([
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
meal_routes.put("/api/meals/:id", function(req, res) {
  var condition = req.params.id;
  console.log("condition" + condition);

  meal.update({
    // UPDATE BELOW - TESTING ONLY
    //cat_name: req_body.meal-item-consumed-value
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
meal_routes.delete("/api/meals/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  meal.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// read: 'meal_content_items' (all)
meal_routes.get("/api/meal_content_items", function(req, res) {
  meal_content_item.all(function(data) {
    var data_object = {
      meal_items: data
    };
    console.log("all meal_content_items: data_object " + JSON.stringify(data_object));
    res.render("meal_content_items", data_object);
  });
});

// Export routes for server.js to use.
module.exports = meal_routes;
