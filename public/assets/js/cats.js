// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".add-cat").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newCat = {
      name: $("#cat-name").val().trim(),
      weight: $("#cat-weight").val().trim(),
      alert: 0,
      notes: $("textarea#cat-notes").val().trim(),
      room: $("#cat-location-room").val().trim(),
      kennel: $("#cat-location-kennel").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat
    }).then(
      function() {
        console.log("new cat added . . .");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".feed-cat").on("submit", function(event) {
    event.preventDefault();

    console.log("inside .feed-cat() . . . ");

    const newMeal = {
      cat_id: $(this).data("id"),
      food: $("#meal-content-item-selection option:selected").text()
    };

    // Send the POST request.
    $.ajax("/api/meals/feed", {
      type: "POST",
      data: newMeal
    }).then(
      function() {
        console.log("cat fed - meal created", newMeal.cat_id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".feed-collect").on("submit", function(event) {
    event.preventDefault();

    const id = $(this).data("id");

    window.location.href="../../api/cats/"+id;
  });

  $(".goto-room").on("submit", function(event) {
    event.preventDefault();

    window.location.href = "api/locations/" + $("#location_selection option:selected").val();
  });

  $(".delete-cat").on("click", function(event) {
    const id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/cats/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted cat", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // refactor - move to 'meal_content.js' ???
  $(".update-consumed-value").on("submit", function(event) {
    event.preventDefault();

    console.log("inside 'update-consumed-value' event handler . . . ");
    console.log("current context (this):\n" + JSON.stringify(this));

    const id = $(this).data("id");
    let consumed_vals = document.getElementsByName("consumed-value-"+id),
        consumed_value = -1;

    for (let index = 0, length = consumed_vals.length; index < length; ++index) {
      if (consumed_vals[index].checked) {
        consumed_value = consumed_vals[index].value;
        break;
      }
    }

    const new_consumed_value = {
      value: consumed_value
    };

    // Send the PUT request.
    $.ajax("/api/meal_contents/" + id, {
      type: "PUT",
      data: new_consumed_value
    }).then(
      function() {
        location.reload();
      }
    );
  });

});
/*
  $(".meal-service").on("submit", function(event) {
    event.preventDefault();

    console.log("inside .meal-service event handler . . .");

    const id = $(this).data("id");

  });

/*  
  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    // Get route for room selection on location view
    // $("#location-selection").on("submit", function(event) {
    //   // Make sure to preventDefault on a submit event.
    //   event.preventDefault();

    //   location_routes.get("/api/locations/:id", function(req, res) {
    //     var route_cat_id = req.params.id;
      
    //     location.one(route_cat_id, function(data) {
    //       var data_object = {
    //         locations: data[0],
    //       }
    //       console.log("single location: data_object " + data_object);
    //       res.render("location-view", data_object);
    //     });
    //   });
    // })
});
*/


//});
