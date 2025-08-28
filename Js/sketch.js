const density = 'N@#W$9876543210?!abc;:+=-,._  ';

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(100, 40);
  video.hide();
  // Select the correct div element by its class
  asciiDiv = select('#live-preview');
  frameRate(100);
}

function draw() {
  video.loadPixels();
  let asciiImage = '';

  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      let pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len-1, 0));

      const c = density.charAt(charIndex);
      if (c == ' ') asciiImage += '&nbsp;';
      else asciiImage += c;
    }
    asciiImage += '<br>';
  }
  asciiDiv.html(asciiImage);
}
