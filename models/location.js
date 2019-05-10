// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var location = {
  all: function(cb) {
    orm.all("locations", function(res) {
      cb(res);
    });
  },
  one: function(route_location_id, cb) {
    orm.one("locations", route_location_id, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("locations", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("locations", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("locations", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = location;
