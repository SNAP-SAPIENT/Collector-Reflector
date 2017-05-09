"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }

    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);

                handleError(messageObj.error);
            }
        });
    }


    $("#shoeScan").on("click", function(e) {
      e.preventDefault();
      $("#domoMessage").animate({width:'hide'},350);

      if ( $("#shoeName").val() == '' || $("#brandInput").val() == '' ||
        $("#colorInput").val() == '' || $("#styleInput").val() == '' ||
        $("#yearInput").val() == '' )
      {
        handleError("All fields are required");
        return false;
      }
      if ($("#status").length > 0)
      {
        $("#status").val("In Progress");
      }
      if ($("#statusColor").length > 0)
      {
        $("#statusColor").toggleClass("scanStatus-Yellow");
      }

      // Begin the scan and send information to server for database save
      $.ajax({
        type: "POST",
        url: "/scanShoe",
        data: {
          name: $("#shoeName").val(),
          brand: $("#brandInput").val(),
          color: $("#colorInput").val(),
          styleSize: $("#styleInput").val(),
          yearReleased: $("#yearInput").val()
        },
        datatype: "json",
        success: function(result, status, xhr) {
          $("#status").val("Complete");
          $("#statusColor").toggleClass("scanStatus-Green");
          $("#domoMessage").animate({width:'hide'},350);
          window.location = result.redirect;
        },
        error: function(xhr, status, error) {
	  var messageObj = JSON.parse(xhr.responseText);
          handleError(messageObj.error);
        }
      });
      return false;
    });


  $("#makeDomoSubmit").on("click", function(e) {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());

    return false;
  });

});
