"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }

    var ctx;
    //take in shoe variables from Derek
    var maxRadius = 220;
    var brandLogos = [];
    var origin = { x: 320, y: 240 };

    function getAngle(shoe_color){
        //var colorMap = {};
        var colors = {
            red: 1,
            orange: 2,
            yellow: 3,
            green: 4,
            blue: 5,
            black: 6,
            white: 7
        };
        var angle = 360/(Object.keys(colors).length);
        var posAngle = 0;

        switch (shoe_color){
            case "red":
                posAngle = angle * colors.red;
                break;
            case "orange":
                posAngle = angle * colors.orange;
                break;
            case "yellow":
                posAngle = angle * colors.yellow;
                break;
            case "green":
                posAngle = angle * colors.green;
                break;
            case "blue":
                posAngle = angle * colors.blue;
                break;
            case "black":
                posAngle = angle * colors.black;
                break;
            case "white":
                posAngle = angle * colors.white;
                break;
            default:
                break;
          }
          posAngle = posAngle * (Math.PI / 180);

          return posAngle;
      }

      function calcRatio(year){
          var recentYear = 2016;    //derek to provide most recent purchase year in this color
          var initYear = 1990;      //derek to provide initial year of purchase in this color
          var shoeYear = year;    //derek to provide year of shoe being plotted

          if (shoeYear < initYear){
              alert("you can't have bought that shoe then");
              return;
          }

          var numerator = shoeYear - initYear;
          var denominator = recentYear - initYear;
          var yearRatio = numerator/denominator;

          return yearRatio;
      }

      //200cos(angle) = x
      function findX(newHypo, newAng){
          var angleDeg = Math.cos(newAng);
          var xVal = newHypo * angleDeg;

          //acc to which quadrant of canvas point is in, translate by correct amount so origin in center of canvas, not top left
          if (angleDeg < (Math.PI / 2) || (angleDeg >= (3 * (Math.PI / 2)) && angleDeg < (2 * Math.PI))) {
              xVal = origin.x - xVal;
          }
          else if ((angleDeg >= (Math.PI / 2) && angleDeg < Math.PI) || (angleDeg >= Math.PI && angleDeg < (3 * (Math.PI / 2)))) {
              xVal = origin.x + xVal;
          }
          //console.log("X: " + xVal);
          return xVal;
      }

      //200sin(angle) = y
      function findY(newHypo, newAng){
          var angleDeg = Math.sin(newAng);
          var yVal = newHypo * angleDeg;

          if ((angleDeg < (Math.PI / 2)) || (angleDeg >= (Math.PI / 2) && angleDeg < Math.PI)) {
              yVal = origin.y - yVal;
          }
          else if ((angleDeg >= Math.PI && angleDeg < (3 * (Math.PI / 2))) || (angleDeg >= (3 * (Math.PI / 2)) && angleDeg < (2 * Math.PI))) {
              yVal = origin.y + yVal;
          }
          //console.log("Y: " + yVal);
          return yVal;
      }

      function positionGraphic(color, year){
          var drawAngle = getAngle(color); // this shit is in radians
          var hypoteneus = calcRatio(year) * maxRadius;

          //console.log(drawAngle);
          var xPos = findX(hypoteneus, drawAngle);
          var yPos = findY(hypoteneus, drawAngle);

          return { x: xPos, y: yPos };
      }

      //returns correct image logo based on brand input
      function chooseBrand(color, brand){
          var img = new Image();
          if (brand === "nike"){
              img.src = "/assets/img/" + color + "swoosh.png";
          }
          else if (brand === "adidas"){
              img.src = "/assets/img/" + color + "adilogo.png";
          }
          else {
              img.src = "/assets/img/" + color + "jordan.png";
          }
          return img;
      }

      //resizes logo based on input
      function sizeGraphic(size, image){
          var imageWidth = image.width;
          var imageHeight = image.height;
          var scaleFactor = 1/12;

          if (size === "high"){
              scaleFactor = 1/6;
          }
          else if (size === "mid"){
              scaleFactor = 1/12;
          }
          else {
              scaleFactor = 1/18;
          }

          return { x: imageWidth * scaleFactor, y: imageHeight * scaleFactor };
      }

      function makeGraphic(shoes, index) {
          if (index < shoes.length) {
              var position = positionGraphic(shoes[index].color, shoes[index].yearReleased);
              var image = chooseBrand(shoes[index].color, shoes[index].brand);

              image.onload = function() {
                  var finSize = sizeGraphic(shoes[index].styleSize, image);
                  ctx.drawImage(image, position.x - (finSize.x / 2), position.y - (finSize.y / 2), finSize.x, finSize.y);
                  index++;
                  makeGraphic(shoes, index);
              };
          }
      }


      function start(shoes) {
          // Set canvas variable and fill the canvas
          var canvas = document.querySelector("canvas");
          ctx = canvas.getContext("2d");
          ctx.fillStyle = "#e5e5e5";
          ctx.fillRect(0,0,640,480);
          var allShoes = shoes.shoes;

          // Loops through all shoes in data and draws them (recursive, lol)
          console.log(allShoes);
          makeGraphic(allShoes, 0);

      }
      $("#butt1").on("click", function() {
           $.ajax({
               type: "GET",
               url: "/getGraphic",
               success: function(result) {
                 start(result);
               },
               error: function(xhr, status, error) {
                 var messageObj = JSON.parse(xhr.responseText);
                 handleError(messageObj.error);
               }
           });
      });
});
