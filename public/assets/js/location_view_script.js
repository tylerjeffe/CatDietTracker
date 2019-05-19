$(function() {  
    $("#location-selection").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

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
    })
});

