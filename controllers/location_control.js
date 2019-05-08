var express = require("express");
var location_routes = express.Router();

// import the model (location.js) to use its database functions
var location = require("../models/location.js");

// create routes - set up logic within those routes where required

// read: 'location' data (all)
location_routes.get("/api/locations", function(req, res) {
  location.all(function(data) {
    var data_object = {
      locations: data
    };
    console.log("all locations: data_object " + data_object);
    res.render("location-view", data_object);
  });
});

// read: 'location' data (one)
location_routes.get("/api/locations/:id", function(req, res) {
  var route_cat_id = req.params.id;

  location.one(route_cat_id, function(data) {
    var data_object = {
      locations: data[0],
    }
    console.log("single location: data_object " + data_object);
    res.render("location-view", data_object);
  });
});

// create: new 'location' via future form -> submit button -> post (create)
location_routes.post("/api/locations", function(req, res) {
  location.create([
    "room_number", "kennel_number", "location_cat_id_fk"
  ], [
    req.body.room_number, req.body.kennel_number, -1
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

// update: 'location' with new 'cat_id_fk'
location_routes.put("/api/locations/:id", function(req, res) {
  var condition = req.params.id;

  location.update({
    location_cat_id_fk: req_body.cat-id
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// delete: 'location'
location_routes.delete("/api/locations/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  location.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export routes for server.js to use
module.exports = location_routes;
