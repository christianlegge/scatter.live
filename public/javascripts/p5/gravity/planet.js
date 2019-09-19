last_points = [];

function Planet(x, y, m, vx, vy) {
  this.x = x;
  this.y = y;
  this.m = m;
  this.v_x = vx;
  this.v_y = vy;
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

  this.updateAccel = function() {
    var Fx = 0;
    var Fy = 0;
    var dist;
    var theta;
    for (var planet in planets) {
      dist = Math.sqrt(Math.pow(this.x - planets[planet].x, 2) + Math.pow(this.y - planets[planet].y, 2));
      theta = Math.atan2(this.y - planets[planet].y, this.x - planets[planet].x)
      var Ftot;
      if (dist > 10) {
        Ftot = this.m*planets[planet].m/Math.pow(dist,2);
      }
      else {
        continue;
      }
      Fx -= Ftot*Math.cos(theta);
      Fy -= Ftot*Math.sin(theta);
    }
    this.a_x = Fx * 50 / this.m;
    this.a_y = Fy * 50 / this.m;
  }

  this.update = function() {
    
    this.v_x += this.a_x;
    this.v_y += this.a_y;
    //this.v_x *= 0.99;
    //this.v_y *= 0.99;
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

    if (this.y > height) {
      if (this.loops > 0) {
        drawingHigh = true;
        if (this.loops > this.highScore) {
          this.highScore = this.loops;
        }
      }
      this.loops = 0;
      this.a_y *= -1;
      this.v_y *= -1;
      this.y = height;
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




  }

  this.draw = function() {
    fill(255);
    strokeWeight(0);
    var d = massToSize(this.m);
    ellipse(this.x, this.y, d, d);
    if (paused) {
      drawArrow(this.x, this.y, this.x+this.v_x*5, this.y+this.v_y*5);
    }
    //text([this.a_x, this.a_y].join(", "), this.x+10, this.y+10);
  }

  this.startAccel = function() {
    this.thrust = 1;
    this.accel = true;
  }

}
