var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

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
    var hbsObject = {
      cats: data[0],
      meals: data[1]
    };
    console.log("Single Cat: hbsObject: " + JSON.stringify(hbsObject));
    res.render("single-cat-view", hbsObject);
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
  var condition = "id = " + req.params.id;

  console.log("condition" + condition);

  cat.update({
    sleepy: req.body.sleepy
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



// Export routes for server.js to use.
module.exports = router;
