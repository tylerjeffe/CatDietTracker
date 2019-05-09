
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
/*  
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
*/

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
        console.log("created new cat");
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

    // refector - switch to 'radio buttons' - may not be necessary
    event.preventDefault();

    console.log("inside 'update-consumed-value' event handler . . . ");

    console.log("current content (this):\n" + this);

    var consumed_vals = document.getElementsByName("consumed-value");

    var consumed_value = -1;

    for (let index = 0, length = consumed_vals.length; index < length; ++index) {
      if (consumed_vals[index].checked) {
        //alert("radio button value = " + conVal[index].value);
        consumed_value = consumed_vals[index].value;
        break;
      }
    }

    var id = $(this).data("id");

    console.log("Current ID: " + id + "\tConsumed Value: " + consumed_value);

    var newConsumedValue = {
      value: consumed_value
    };

    console.log("\nNewConsumedValue: " + newConsumedValue.value);

    // Send the PUT request.
    
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newConsumedValue
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
    
  });

});
