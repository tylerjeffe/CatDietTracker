
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
  
      var id = $(this).data("id");
      //alert(id);
      var consumedValue = $(this).data("meal-item-consumed-value");
      //alert(consumedValue);
      console.log("Current ID: " + id + "\tConsumed Value: " + consumedValue);
  
      var newConsumedValue = {
        value: consumedValue 
      };
  
      var newConVal = {
        conVal: $("#5").val()
      };
  
      console.log("VALUE = " + $("#5").text());
  
      console.log("\nNewConsumedValue: " + newConsumedValue.value);
  
      // Send the PUT request.
      /*
      $.ajax("/api/cats/" + id, {
        type: "PUT",
        data: newConsumedValue
      }).then(
        function() {
          console.log("new consumed value: ", consumedValue);
          // Reload the page to get the updated list
          location.reload();
        }
      );
      */
    });
  
  });
  