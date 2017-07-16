function drawGrid(p5, x1, x2, y1, y2, z, zoom) {
  var noiseScale=0.02; 
  p5.noiseDetail(8,0.5);
  p5.noStroke();
  for(var i=0; i<16; i++) {
    var n_x = p5.map(i, 0, 16, x1, x2);
    for(var j=0; j<16; j++) {
      var n_y = p5.map(j, 0, 16, y1, y2);
      var noiseVal = p5.noise(n_x * noiseScale,
                              n_y * noiseScale, z);
      p5.fill(noiseVal*255);
      p5.rect(i*16, j*16, 16, 16);
    }
  }
  // debug - show border
  // p5.noFill();
  // p5.stroke(255, 0, 0)
  // p5.rect(0, 0, 255, 255);
}