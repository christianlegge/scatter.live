last_points = [];

function Rocket(x, y) {
  this.x = x;
  this.y = y;
  this.v_x = 0;
  this.v_y = 0;
  this.a_x = 0;
  this.a_y = gravity;
  this.angle = 0;
  this.prevangle = 0;
  this.accel = false; 
  this.thrust = 0;
  this.highScore = 0;
  
  
  this.checkpointsLeft = {
    0: false, 
    1: false, 
    2: false, 
    3: false,
    4: false,
    5: false,
    6: false,
  }
  
  this.checkpointsRight = {
    0: false, 
    1: false, 
    2: false, 
    3: false,
    4: false,
    5: false,
    6: false,
  }
  
  this.loops = 0;

  this.update = function() {

    if (keyIsDown(32)) {
      this.thrust = 1;
      this.accel = true;
      moved = true;
    }
    else {
      this.thrust = 0;
      for (x in this.checkpointsLeft) {
        this.checkpointsLeft[x] = false;
      }
      for (x in this.checkpointsRight) {
        this.checkpointsRight[x] = false;
      }
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.prevangle = this.angle;
      this.angle -= 0.1;
      for (x in this.checkpointsLeft) {
        if (this.prevangle > x && x > this.angle) {
          this.checkpointsLeft[x] = true;
          this.checkpointsRight[x] = false;
        }
      }
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.prevangle = this.angle;
      this.angle += 0.1;
      for (x in this.checkpointsRight) {
        if (x == 0) {
          if (this.prevangle < 2*PI && 2*PI < this.angle) {
            this.checkpointsRight[x] = true;
            this.checkpointsLeft[x] = false;
          }
        }
        if (this.prevangle < x && x < this.angle) {
          this.checkpointsRight[x] = true;
          this.checkpointsLeft[x] = false;
        }
      }
    }
    
    if (this.angle > 2*PI) {
      this.angle -= 2*PI;
    }
    
    if (this.angle < 0) {
      this.angle += 2*PI;
    }
    
    if (Object.values(this.checkpointsLeft).every(item => item)) {
      this.loops++;
      drawingLoops = true;
      for (x in this.checkpointsLeft) {
        this.checkpointsLeft[x] = false;
      }
    }
    
    if (Object.values(this.checkpointsRight).every(item => item)) {
      this.loops++;
      drawingLoops = true;
      for (x in this.checkpointsRight) {
        this.checkpointsRight[x] = false;
      }
    }

    this.a_x = this.thrust*sin(this.angle);
    this.a_y = -this.thrust*cos(this.angle) - gravity;
    this.v_x += this.a_x;
    this.v_y += this.a_y;
    this.v_x *= 0.95;
    this.v_y *= 0.99;
    this.x += this.v_x;
    this.y += this.v_y;

    if (this.x < 0) {
      if (this.loops > 0) {
        drawingHigh = true;
        if (this.loops > this.highScore) {
          this.highScore = this.loops;
        }
      }
      this.loops = 0;
      this.x = 0;
      this.a_x = -this.a_x;
      this.v_x = -this.v_x;
      this.angle = -this.angle;
    }

    if (this.x > width) {
      if (this.loops > 0) {
        drawingHigh = true;
        if (this.loops > this.highScore) {
          this.highScore = this.loops;
        }
      }
      this.loops = 0;
      this.x = width;
      this.a_x = -this.a_x;
      this.v_x = -this.v_x;
      this.angle = -this.angle;
    }

    if (this.y < 20) {
      if (this.loops > 0) {
        drawingHigh = true;
        if (this.loops > this.highScore) {
          this.highScore = this.loops;
        }
      }
      this.loops = 0;
      this.a_y *= -1;
      this.v_y *= -1;
      this.y = 20;
    //  this.angle = PI-this.angle;
    }

    if (this.y > height-100) {
      if (this.loops > 0) {
        drawingHigh = true;
        if (this.loops > this.highScore) {
          this.highScore = this.loops;
        }
      }
      this.loops = 0;
      this.a_y *= -1;
      this.v_y *= -1;
      this.y = height-100;
  //    this.angle = PI-this.angle;
    }



    if (!this.accel) {
  //    this.angle = sin(frameCount / 10)*HALF_PI;
    }

    else {

      resetMatrix();
      strokeWeight(3);
      last_points.push([this.x, this.y]);
      if (last_points.length > 25)
      {
        last_points.shift();
      }

      for(i = 0; i < last_points.length-1; i++) {
        stroke(255*i/last_points.length);
        line(last_points[i][0], last_points[i][1], last_points[i+1][0], last_points[i+1][1]);
      }

    }

      this.draw();



  }

  this.draw = function() {
    fill(255);
    translate(this.x, this.y);
    rotate(this.angle);
    triangle(0, -20, -5, 0, 5, 0);
  }

  this.startAccel = function() {
    this.thrust = 1;
    this.accel = true;
  }

}
