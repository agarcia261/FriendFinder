$(document).ready(function() {

    $("#survey-submit").submit(function( event ) {
        event.preventDefault();

        var newSurvey = {
            name:$("#first_name").val().trim(),
            photo:$("#photolink").val().trim(),
            scores:[$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(),
            $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(),]
        }

        $.post("/api/friends", newSurvey)
        // on success, run this callback
        .then(function(data) {

            var instance = M.Modal.getInstance($('.modal').modal());
            instance.open();

            $("#matchName").html(data.name)
            $("#imgMatch").attr( "src", data.photo )


          // log the data we found
          console.log(data);
          // tell the user we're adding a character with an alert window
          //alert("Adding character...");
        });
      });


  });