lastMouseX = 0;
lastMouseY = 0;
redVal = 0;
greenVal = 0;
blueVal = 0;
drawing = false;
var ctx;

function setup() {
  var cnv = createCanvas(800,600);
  background("#FFF");
  fill("#000");
  var c=document.getElementById("defaultCanvas0");
  ctx=c.getContext("2d");
}

function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  drawing = false;
}

function draw() {
  if (mouseIsPressed && drawing)
  {
    line(mouseX, mouseY, lastMouseX, lastMouseY);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    localforage.setItem('savedCanvas', ctx.getImageData(0,0,800,600));
  }
}

$(function() {
  $('.color').on('change mousemove', function() {
    redVal = $('#red').val();
    greenVal = $('#green').val();
    blueVal = $('#blue').val();
    $('#red').css("background", "linear-gradient(to right, rgb(0," + greenVal + "," + blueVal + "), rgb(255," + greenVal + "," + blueVal + "))" );
    $('#green').css("background", "linear-gradient(to right, rgb(" + redVal + ",0," + blueVal + "), rgb(" + redVal + ",255," + blueVal + "))" );
    $('#blue').css("background", "linear-gradient(to right, rgb(" + redVal + "," + greenVal + ",0), rgb(" + redVal + "," + greenVal + ",255))" );
    stroke(redVal, greenVal, blueVal);
  });

  $('#size').on('change', function() {
    strokeWeight($(this).val());
  });

  $('body').mousedown(function(e) {
    if (e.target.id == "defaultCanvas0" || $(e.target).parents("#defaultCanvas0").length) {
      drawing = true;
    }
  });

  localforage.getItem('savedCanvas').then(function(value) {
    ctx.putImageData(value, 0, 0);
  });

});
