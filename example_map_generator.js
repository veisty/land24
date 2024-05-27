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
function drawGrid(p5, x1, x2, y1, y2, z, zoom) {

  var pixelSize = 100; // how fine-grained the image is
  var step = 255/pixelSize;

  var noiseScale = 0.01; 
  p5.noStroke();
  
  for(var i=0; i<pixelSize; i++) {
    var n_x = p5.map(i, 0, pixelSize, x1, x2);
    for(var j=0; j<pixelSize; j++) {
      var n_y = p5.map(j, 0, pixelSize, y1, y2);
      var noiseVal = p5.noise(n_x * noiseScale,
                              n_y * noiseScale, z);

      if(noiseVal < 0.5) p5.fill(50, 0, 200);  // water
      else if(noiseVal >= 0.5 && noiseVal < 0.55) p5.fill(246,215,176); // beaches
      else if(noiseVal >= 0.55 && noiseVal < 0.7) p5.fill(20, 200, 0); // grass
      else p5.fill(173 ,173, 153) // mountains
      p5.rect(i*step, j*step, step+1, step+1);
    }
  }
}