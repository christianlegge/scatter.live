var xrot = -Math.PI/4+0.2;
var yrot = Math.PI/4;

function setup() {
  var cnv = createCanvas(600,600, WEBGL);
  cnv.id('cubecanvas');
  ortho();
}

function draw() {
  background(255);
  fill(255,128,128);
  translate(0,100,300);
  rotateX(xrot);
  rotateY(yrot);
  for (var i = 0; i < 225; i++) {
    if (i % 15 == 0) {
      translate(15,0,-210);
    } else {
      translate(0,0,15);
    }

    box(12,20*Math.sin(frameCount*0.05-distFromCenter(i, 15))+55,12);
  }
}

function distFromCenter(pos, len) {
  xpos = Math.floor(pos/len) - 7;
  ypos = pos % len - 7;
  return sqrt(xpos*xpos + ypos*ypos);
}
