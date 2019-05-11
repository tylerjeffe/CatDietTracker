// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var meal = {
  all: function(cb) {
    orm.all("meals", function(res) {
      cb(res);
    });
  },
  one: function(route_meal_id, cb) {
    orm.one("meals", route_meal_id, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    console.log("TESTING - OK HERE A");

    console.log("col length: " + cols.length);
    console.log("vals length: " + vals.length);

    orm.create("meals", cols, vals, function(res) {
      console.log("TESTING - OK HERE B");
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("meals", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("meals", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = meal;
