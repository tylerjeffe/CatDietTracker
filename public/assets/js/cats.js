
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".add-cat").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $("#cat-name").val().trim(),
      weight: $("#cat-weight").val().trim(),
      alert: 0,
      notes: $("textarea#cat-notes").val().trim(),
      room: $("#cat-location-room").val().trim(),
      kennel: $("#cat-location-kennel").val().trim()
    };

    console.log(newCat);

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

  $(".delete-cat").on("click", function(event) {
    var id = $(this).data("id");

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
        //alert("radio button value = " + conVal[index].value);
        consumed_value = consumed_vals[index].value;
        break;
      }
    }
    console.log("Current ID: " + id + "\tConsumed Value: " + consumed_value);

    var new_consumed_value = {
      value: consumed_value
    };
    console.log("\nNewConsumedValue: " + new_consumed_value.value);

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

  $(".meal-service").on("submit", function(event) {
    event.preventDefault();

    console.log("inside .meal-service event handler . . .");

    const id = $(this).data("id");

  });

});
