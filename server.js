var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes for server access - use
var cat_routes = require("./controllers/cat_control.js");
app.use(cat_routes);

var location_routes = require("./controllers/location_control.js");
app.use(location_routes);

var meal_routes = require("./controllers/meal_control.js");
app.use(meal_routes);

var meal_content_routes = require("./controllers/meal_content_control.js");
app.use(meal_content_routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
