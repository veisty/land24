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

function drawGrid1(p5, x1, x2, y1, y2, z, zoom) {
  // debug - show border
  var noiseScale=0.1;
  // local to global
  var center_x = p5.map(128, 0, 256, x1, x2)
  var center_y = p5.map(128, 0, 256, y1, y2)
  var noiseX = p5.noise(center_x * noiseScale,
                         center_y * noiseScale, z);
  var noiseY = p5.noise(center_x * noiseScale,
                         center_y * noiseScale, z+50);
  var offsetX = p5.map(noiseX, 0, 1, -64, 64);
  var offsetY = p5.map(noiseY, 0, 1, -64, 64);
  var local_center_x = p5.map(center_x + offsetX, x1, x2, 0, 256);
  var local_center_y = p5.map(center_y + offsetY, y1, y2, 0, 256);
  p5.fill(0, 0, 128);
  p5.ellipse(local_center_x, local_center_y, 64);
  // debug - show border
  p5.noFill();
  p5.stroke(255, 0, 0)
  p5.rect(0, 0, 255, 255);
}

function getOffsetPoint(p5, canvasX, canvasY, x1, x2, y1, y2, z, noiseScale) {
  var center_x = p5.map(canvasX, 0, 256, x1, x2)
  console.log("Example: ", center_x, canvasX, x1, x2)
  var center_y = p5.map(canvasY, 0, 256, y1, y2)
  var noiseX = p5.noise(center_x * noiseScale,
                         center_y * noiseScale, z);
  var noiseY = p5.noise(center_x * noiseScale,
                         center_y * noiseScale, z+50);
  var offsetX = p5.map(noiseX, 0, 1, -96, 96);
  var offsetY = p5.map(noiseY, 0, 1, -96, 96);
  var local_center_x = p5.map(center_x + offsetX, x1, x2, 0, 256);
  var local_center_y = p5.map(center_y + offsetY, y1, y2, 0, 256);
  return [local_center_x, local_center_y]
}

function drawGrid(p5, x1, x2, y1, y2, z, zoom) {
  // debug - show border
  var noiseScale=0.1;
  var p = getOffsetPoint(p5, 127, 127, x1, x2, y1, y2, z, 0.1);
  // local to global
  p5.fill(0, 0, 128);
  p5.noStroke();
  p5.ellipse(p[0], p[1], 64);
  p5.stroke(0, 0, 128);
  p5.strokeWeight(10);

  for(var i=-1; i<2; i++) {
    for(var j=-1; j<2; j++) {
      if((i==0 || j==0) && (i!=j)) {
        var neighbor_x = 127 + 256 * i;
        var neighbor_y = 127 + 256 * j;
        var p2 = getOffsetPoint(p5, neighbor_x, neighbor_y, x1, x2, y1, y2, z, 0.1);
        p5.line(p[0], p[1], p2[0], p2[1]);
      }
    }
  }
  // debug - show border
  // p5.noFill();
  // p5.stroke(255, 0, 0, 30)
  // p5.rect(0, 0, 255, 255);
}