var cant = 120;
var distMax = 100;
var velMax = 2;
var x = [];
var y = [];
var dx = [];
var dy = [];
var c = [];

function setup() {
  pixelDensity(1);
  createCanvas(500, 500);

  smooth();
  frameRate(25);
  background(0);

  for(var i = 0; i < cant; i++) {
    x[i] = random(width);
    y[i] = random(height);

    dx[i] = random(1,velMax + 1)*(random(100) > 50 ? 1: -1);
    dy[i] = random(1,velMax + 1)*(random(100) > 50 ? 1: -1);
    c[i] = color(random(256),random(256),random(256));
    //print("X: " + x[i] + ", Y: " + y[i] + "\n");
  }
  restart();

}


function restart() {
  for(var i = 0; i < cant; i++) {

    //int dx = (int)random(50);
    //int dy = (int)random(50);
    //x[i] += (dx > 24 ? 1 : -1);
    //y[i] += (dy > 24 ? 1 : -1);
    x[i] += dx[i];
    y[i] += dy[i];
    if(x[i] > width) {x[i] = width-1; dx[i]*=-1;}
    if(x[i] < 0) {x[i] = 0; dx[i]*=-1;}
    if(y[i] > height) {y[i] = height; dy[i]*=-1;}
    if(y[i] < 0) {y[i] = 0; dy[i]*=-1;}
  }
}

function blendColor(a, b) {
  return color((red(a) + red(b))/2, (green(a) + green(b))/2, (blue(a) + blue(b))/2);
}


function clearBackground() {
  noStroke();
  fill(0, 25);
  rect(0,0,width, height);
}

function draw() {
  clearBackground();

  for(var i = 0; i < cant; i++) {
    for(var k = 0; k < cant; k++) {
      if(i == k) {continue;}

      var distance1 = sqrt(abs(x[i] - x[k]) * abs(x[i] - x[k]) + abs(y[i] - y[k]) * abs(y[i] - y[k]));

      if(distance1 > distMax) continue;
      //print("disntace: " + distance1 + "\n");
      var transparency = (distMax - distance1)/(distMax*2);
      strokeWeight(1);
      var t = blendColor(c[i], c[k]);

      var re = red(t);
      var bl = blue(t);
      var gr = green(t);
      stroke(re, gr, bl, transparency * 160);
      line(x[i], y[i], x[k], y[k]);
    }
  }

  restart();
}

function mousePressed() {
  background(0);

  for(var i = 0; i < cant; i++) {
    x[i] = random(width);
    y[i] = random(height);

    dx[i] = random(1,velMax + 1)*(random(100) > 50 ? 1: -1);
    dy[i] = random(1,velMax + 1)*(random(100) > 50 ? 1: -1);
    c[i] = color(random(256), random(256), random(256));
    //print("X: " + x[i] + ", Y: " + y[i] + "\n");
  }
}
