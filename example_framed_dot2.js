/*
 * This is the funciton to implement to make your own abstract design.
 *
 * arguments:
 * p5: the p5.js object - all draw commands should be prefixed with this object
 * x1, x2, y1, y2: draw the pattern contained in the rectangle x1,y1 to x2, y2
 * z: use this as the noise z offset (can be shifted)
 * zoom: current zoom level (starts at 0), useful to decide how much detail to draw
 *
 * The destination drawing should be in the square 0, 0, 255, 255.
 */

/* TOUR VARIABLES (required)
/* the random number seed for the tour */
var tourSeed = 100;
/* triplets of locations: zoom, x, y */
var tourPath = [
  [5, 510, 507],
  [7, 507, 506],
  [3, 512, 515],
  [1, 512, 512]
]

/* OPTIONAL VARIABLES */
/* what is the initial zoom level (defaults to 0) */
var initialZoomLevel = 3;
/* what is the maximum zoom level (make this at least 10. defaults to 16) */
var maxZoomLevel = 12;

function drawPetals(p5, x1, x2, y1, y2, pos_x, pos_y, rad1, rad2) {
  var offsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]
  var pixel_posx1 = p5.map(pos_x, x1, x2, 0, 256);
  var pixel_posx2 = p5.map(pos_x+rad2, x1, x2, 0, 256);
  var pixel_radius = pixel_posx2 - pixel_posx1;
  for(var i=0; i<offsets.length; i++) {
    var offset = offsets[i];
    var pixel_x = p5.map(pos_x+0.5*rad1*offset[0], x1, x2, 0, 256);
    var pixel_y = p5.map(pos_y+0.5*rad1*offset[1], y1, y2, 0, 256);
    p5.ellipse(pixel_x, pixel_y, pixel_radius);    
  }
}

function drawStamens(p5, x1, x2, y1, y2, pos_x, pos_y, rad1, rad2, drawLines) {
  var offsets = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ]
  var pixel_posx1 = p5.map(pos_x, x1, x2, 0, 256);
  var pixel_posx2 = p5.map(pos_x+rad2, x1, x2, 0, 256);
  var pixel_radius = pixel_posx2 - pixel_posx1;
  for(var i=0; i<offsets.length; i++) {
    var offset = offsets[i];
    var pixel_x = p5.map(pos_x+0.5*rad1*offset[0], x1, x2, 0, 256);
    var pixel_y = p5.map(pos_y+0.5*rad1*offset[1], y1, y2, 0, 256);
    p5.strokeWeight(0);
    p5.ellipse(pixel_x, pixel_y, pixel_radius);
    if(drawLines) {
      p5.strokeWeight(pixel_radius / 20);
      p5.line(pixel_x-pixel_radius, pixel_y, pixel_x+pixel_radius, pixel_y);
      p5.line(pixel_x, pixel_y-pixel_radius, pixel_x, pixel_y+pixel_radius);
      p5.strokeWeight(0);
      p5.ellipse(pixel_x, pixel_y, pixel_radius / 12);
    }  
  }
}

// This version draws two rectangles and two ellipses.
// The rectangles are 960x720 and centered at 512,512.
function drawGrid(p5, x1, x2, y1, y2, z, zoom) {
  p5.background(255);
  p5.rectMode(p5.CORNERS);

  // The first red rectangle fills the entire space
  var cx = p5.map(512-960/2, x1, x2, 0, 256);
  var cy = p5.map(512-720/2, y1, y2, 0, 256);
  var cx2 = p5.map(512+960/2, x1, x2, 0, 256);
  var cy2 = p5.map(512+720/2, y1, y2, 0, 256);
  p5.fill(255, 0, 0);
  p5.rect(cx, cy, cx2, cy2);

  // The second black rectangle is inset to form a frame inset by 20 units
  cx = p5.map(512-940/2, x1, x2, 0, 256);
  cy = p5.map(512-700/2, y1, y2, 0, 256);
  cx2 = p5.map(512+940/2, x1, x2, 0, 256);
  cy2 = p5.map(512+700/2, y1, y2, 0, 256);
  p5.fill(0);
  p5.rect(cx, cy, cx2, cy2);

  // Two ellipses with a radius of 50 units are then added.

  // start with the center dot --
  // if zoomed: first, draw petals *behind* the ellipse
  if(zoom >= 3) {
    p5.fill(0, 128, 128);
    drawPetals(p5, x1, x2, y1, y2, 512, 512, 50, 10);
  }

  // first, draw a blue
  var cx = p5.map(512, x1, x2, 0, 256);
  var cy = p5.map(512, y1, y2, 0, 256);
  var cx2 = p5.map(512+50, x1, x2, 0, 256);
  p5.fill(0, 0, 255);
  p5.ellipse(cx, cy, (cx2-cx));

  // if zoomed: last draw stamens *in front of* the ellipse
  if(zoom >= 3) {
    // now if we are super zoomed, draw lines in the stamen
    var drawLines = false;
    if (zoom >= 5) drawLines = true;
    p5.fill(0, 128, 128);
    p5.stroke(0, 0, 255);
    drawStamens(p5, x1, x2, y1, y2, 512, 512, 10, 8, drawLines);
  }


  // The second green ellipse is above and to the left of the first one.
  var cx = p5.map(412, x1, x2, 0, 256);
  var cy = p5.map(412, y1, y2, 0, 256);
  var cx2 = p5.map(412+50, x1, x2, 0, 256);
  p5.fill(0, 255, 0);
  p5.ellipse(cx, cy, (cx2-cx));
}
