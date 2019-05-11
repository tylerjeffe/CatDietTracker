var express = require("express");
var meal_routes = express.Router();

// import models for use of database functions.
var meal = require("../models/meal.js");
var meal_content = require("../models/meal_content");
var meal_content_item = require("../models/meal_content_item.js");

var moment = require("moment");


var globalMealCounter = 600;

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

/*
CREATE TABLE meals
(
  meal_id INT NOT NULL AUTO_INCREMENT,
  meal_date_time DATETIME NOT NULL,

  meal_cat_id_fk INT NOT NULL,    
  meal_server_id_fk INT NOT NULL, 
  meal_location_id_fk INT NOT NULL, 
  PRIMARY KEY (meal_id) 
);

CREATE TABLE meal_contents
(
  meal_content_id INT NOT NULL AUTO_INCREMENT,
  meal_content_description VARCHAR(128) NOT NULL,
  meal_content_consumed INT NOT NULL,
  
  meal_id_fk INT NOT NULL,
  PRIMARY KEY (meal_content_id)
);
*/


// create: new 'meal' (via form -> submit button -> post)
meal_routes.post("/api/meals/feed", function(req, res) {

  ++globalMealCounter;

  console.log("inside meal_routes:post() . . .");

  const meal_date_time = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(meal_date_time);
  //const cat_id = $(this).data("id");

  console.log("cat_id --> " + req.body.id);
  console.log("food -->: " + req.body.food);

  // still need to handle
  const cat_id = req.body.cat_id;
  const meal_item = req.body.food;
  
  // refactor - decouple
  meal.create([
    "meal_date_time", "meal_cat_id_fk", "meal_server_id_fk", "meal_location_id_fk"
  ], [
    meal_date_time, req.body.cat_id, -1, -1
  ], function(result) {
    //res.json({ id: result.insertId });
    meal_content.create([
      "meal_content_description", "meal_content_consumed", "meal_id_fk"
    ],[
      req.body.food, -1, result.insertId 
    ], function(result) {
      res.json({ id: result.insertId });
    });
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
