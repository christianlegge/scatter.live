var rockets = [];
var planets = [];
var gravity = 0;
var textColor = 0;
var moved = false;
var drawingLoops = false;
var loopsColor = 0;
var drawingHigh = false;
var highColor = 0;
var creatingPlanet = false;
var creatingPlanetSize = 0;
var creatingPlanetLoc = [0, 0];
var paused = false;

function massToSize(m) {
  return Math.cbrt(m) * 20;
}

function sizeToMass(d) {
  return Math.pow(d/20, 3);
}

function drawPauseButton() {
  stroke('#663300');
  strokeWeight(3);
  fill('#e8b066');
  if (20 < mouseX && mouseX < 20+50 && 20 < mouseY && mouseY < 20+50) {
    fill('#FFCE8C');
  }
  if (paused) {
    quad(25, 20, 25, 20, 25, 70, 70, 45);
  }
  else {
    rect(20, 20, 20, 50, 0);
    rect(50, 20, 20, 50, 0);
  }
}

function drawArrow(x1, y1, x2, y2) {
  stroke(0);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  var angle = Math.atan2(y2-y1, x2-x1);
  line(x2, y2, x2-10*Math.cos(angle)-5*Math.sin(angle), y2-10*Math.sin(angle)+5*Math.cos(angle));
  line(x2, y2, x2-10*Math.cos(angle)+5*Math.sin(angle), y2-10*Math.sin(angle)-5*Math.cos(angle));
}

function mousePressed() {
  if (20 < mouseX && mouseX < 20+200 && 20 < mouseY && mouseY < 20+50) {
    paused = !paused;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#b79e48");
  for (var i = 0; i < 5; i++) {
    //planets.push(new Planet(Math.random()*1600, Math.random()*900, Math.random()*10+0.5, 0, 0));
  }
  //planets.push(new Planet(300, 450, 100, 0, 0));
  //planets.push(new Planet(300, 250, 0.1, 5, 0));
  //planets.push(new Planet(300, 350, 0.1, 7.5, 0));
}

function draw() {
  background("#b79e48");
  
  if (planets.length == 0) {
    stroke('#663300');
    strokeWeight(3);
    textSize(32);
    fill('#e8b066');
    text('Click and hold', windowWidth-250, 50);
  }
  
  if (!(20 < mouseX && mouseX < 20+200 && 20 < mouseY && mouseY < 20+50)) {
  
    if (mouseIsPressed && !creatingPlanet) {
      creatingPlanet = true;
      creatingPlanetLoc = [mouseX, mouseY];
    }
    
    if (mouseIsPressed && creatingPlanet) {
      strokeWeight(0);
      fill(255);
      ellipse(creatingPlanetLoc[0], creatingPlanetLoc[1], creatingPlanetSize, creatingPlanetSize);
      creatingPlanetSize++;
    }
  }
  
  if (!mouseIsPressed && creatingPlanet) {
    planets.push(new Planet(creatingPlanetLoc[0], creatingPlanetLoc[1], sizeToMass(creatingPlanetSize), (mouseX-creatingPlanetLoc[0])/20, (mouseY-creatingPlanetLoc[1])/20)) 
    creatingPlanetSize = 0;
    creatingPlanet = false;
  }

  if (!paused) {
    for (i = 0; i < planets.length; i++) {
      planets[i].updateAccel();
    }
    for (i = 0; i < planets.length; i++) {
      planets[i].update();
    }
  }
  
  for (i = 0; i < planets.length; i++) {
    planets[i].draw();
  }
  
  drawPauseButton();

}
