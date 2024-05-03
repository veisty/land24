/* This is an example of 10print translated into the PS4 framework */

var blue = "#0000AA"
var light_blue = "#0088FF"

function drawLayer(p5, slashsize, x1, x2, y1, y2, z) {
  var noiseScale=1/16.0;
  var startx = slashsize * (Math.floor(x1/slashsize) - 1);
  var starty = slashsize * (Math.floor(y1/slashsize) - 1);
  var endx = slashsize * (Math.floor(x2/slashsize) + 1);
  var endy = slashsize * (Math.floor(y2/slashsize) + 1);

  var char_width = 256 / ((x2-x1)/slashsize);
  var char_height = 256 / ((y2-y1)/slashsize);
  var pixel_width = char_width / 8;
  var pixel_height = char_height / 8;
  p5.strokeWeight(pixel_width);

  for(var x=startx; x<endx; x+=slashsize) {
    var n_x = x / slashsize;
    var x_pos = p5.map(x, x1, x2, 0, 256);
    for(var y=starty; y<endy; y+=slashsize) {
      var n_y = y / slashsize;
      var y_pos = p5.map(y, y1, y2, 0, 256);
      var noiseValue = p5.noise(x * noiseScale, y * noiseScale, z);
      if (noiseValue < 0.5) {
        p5.line(x_pos, y_pos, x_pos+char_width, y_pos+char_height);
      }
      else {
        p5.line(x_pos, y_pos+char_height, x_pos+char_width, y_pos);
      }
    }
  }
}

function drawGrid(p5, x1, x2, y1, y2, z, zoom) {
  p5.noiseDetail(8,0.5);
  p5.background(blue);
  p5.stroke(light_blue);
  drawLayer(p5, 16, x1, x2, y1, y2, z);
}
