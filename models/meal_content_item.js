// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var meal_content_item = {
  all: function(cb) {
    orm.all("meal_content_items", function(res) {
      cb(res);
    });
  },
  one: function(route_meal_content_id, cb) {
    orm.one("meal_content_items", route_meal_content_id, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("meal_content_items", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("meal_content_items", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("meal_content_items", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = meal_content_item;
