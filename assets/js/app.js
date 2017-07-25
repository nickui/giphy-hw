$( document ).ready(function() {

      // Initial array of gif topics
      var topics = ["Homer Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson", "Ned Flanders", "Mr Burns", "Waylon Smithers", "Krusty the Clown"];

      // displayGifInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {

        var gif = $(this).attr("data-name");
        for (var i = 0; i <=0; i++) {
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&rating=pg13&api_key=dc6zaTOxFJmzC";
        }

        // Creates AJAX call for the specific gif topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(gifs) {
          console.log(gifs);
          for (var i = 0; i < topics.length; i++) {
          var stillGif = gifs.data[i].images.fixed_height_still.url;
          //var stillGifDiv = "<figure><img width='auto' height='200px' src='" + stillGif + "'/> <figcaption>Rating: " + gifs.data[i].rating + "</figcaption></figure>";
          var animateGif = gifs.data[i].images.fixed_height.url;
          //var animateGifDiv = "<div class='animate'><figure>" + "<img onclick='switchOff();' width='auto' height='200px' src='" + animateGif + "'/> <figcaption>Rating: " + gifs.data[i].rating + "</figcaption></figure></div>";

          // $("#gif-view").prepend(stillGifDiv);
          $("#gif-view").prepend("<figure><img onClick='switchThem();' class='floatImage' width='auto' height='200px' src='" + stillGif + "' data-animate='" + animateGif + "' data-still='" + stillGif + "' data-state='still' /> <figcaption>Rating: " + gifs.data[i].rating + "</figcaption></figure>");

          renderButtons();

          }

        });

      }

      function switchThem() {
       console.log("this is not firing and the code below isnt loading");
        var animateURL = $(this).data("animate");
        var stillURL = $(this).data("still");
        if ($(this).data("state", "still")) {
          $(this).attr("src", animateURL);
          $(this).data("state", "animate");
        }
        else {
          $(this).attr("src", stillURL);
          $(this).data("state", "still");
        }
      }


      // Function for displaying gif data
      function renderButtons() {

        // Deletes the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Loops through the array of gif topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of gif to our button
          a.addClass("gif btn btn-warning navbar-btn");
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add gif button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#gif-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "gif"
      $(document).on("click", ".gif", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
}); 