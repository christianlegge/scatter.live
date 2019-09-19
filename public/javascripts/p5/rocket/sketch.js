var rockets = [];
var gravity = -0.25;
var textColor = 0;
var moved = false;
var drawingLoops = false;
var loopsColor = 0;
var drawingHigh = false;
var highColor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rockets.push(new Rocket(200, 700));
}

function draw() {
  background(0);
  
  if (!moved && textColor < 255) {
    textColor+= 2;
  }
  
  if (!moved || textColor > 0) {
    textAlign(LEFT);
    textSize(80);
    textFont('Helvetica');
    stroke(textColor);
    fill(textColor, textColor, textColor);
    text('arrow keys + spacebar', windowWidth/2-400, 200);
  }
  
  if (moved && textColor > 0) {
    textColor-=2;
  }
  
  if (drawingLoops) {
    textAlign(RIGHT);
    if (loopsColor < 255) {
      loopsColor += 2;
    }
    textSize(30);
    textFont('Helvetica');
    stroke(loopsColor);
    fill(loopsColor, loopsColor, loopsColor);
    text('Loops: ' + rockets[0].loops, windowWidth-40, 50);
  }
  
  if (drawingHigh) {
    textAlign(RIGHT);
    if (highColor < 255) {
      highColor += 2;
    }
    textSize(30);
    textFont('Helvetica');
    stroke(highColor);
    fill(highColor, highColor, highColor);
    text('Highest: ' + rockets[0].highScore, windowWidth-40, 90);
  }


  for (i = 0; i < rockets.length; i++) {
    rockets[i].update();
  }

  resetMatrix();
  stroke(255);
  strokeWeight(1);
  line(0, height-100, width, height-100);
}
