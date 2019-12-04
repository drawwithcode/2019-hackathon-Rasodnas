var mic;
var fft;
var changeViz;
var flagViz = true;

function setup() {
  createCanvas(windowWidth,windowHeight);
  rectMode(CENTER)

  // initialize mic
  mic = new p5.AudioIn();
  mic.start();

  // initialize fft
  fft = new p5.FFT();
  fft.setInput(mic);

  // get "change viz" button
  changeViz = select("#viz");
  changeViz.mousePressed(swapViz);

}

function draw() {
  background('black');

  // check viz stat
  if (flagViz){
      viz1();
  }
  else {
      viz2();
  }


}

function viz1() {
  // get level of the mic
  var volume = mic.getLevel();

  // analyze bass mid treble (from 0 to 255)
  fft.analyze();
  let bass = fft.getEnergy("bass");           let mapBass = map(bass, 0, 255, 100,800);
  let mid = fft.getEnergy("mid");             let mapMid = map(mid, 0, 255, 300,800);
  let treb = fft.getEnergy("treble");         let mapTreb = map(treb, 0, 255, 500,800);

  // treb ellipse
  push();
  noFill();
  stroke(255,255,255);
  ellipse(width/2, height/2, 100 + volume * (mapTreb * 20));
  noFill();
  stroke(150,150,150);
  ellipse(width/2, height/2, 100 + volume * (mapTreb * 30));
  pop();

  // mid ellipse
  push();
  stroke(100,100,100);
  ellipse(width/2, height/2, 100 + volume * (mapMid * 20));
  pop();

  // bass ellipse
  push();
  fill(0,0,255);
  stroke(0,0,255);
  ellipse(width/2, height/2, 100 + volume * (mapBass * 20));
  pop();

  // text
  push();
  fill(255,255,255);
  textSize(30);
  textAlign(CENTER,CENTER);
  text('CIRCLE', width/2, 100, width, height);
  pop();

}

function viz2() {
  // get level of the mic
  var volume = mic.getLevel();

  // analyze bass mid treble (from 0 to 255)
  fft.analyze();
  let bass = fft.getEnergy("bass");           let mapBass = map(bass, 0, 255, 100,600);
  let mid = fft.getEnergy("mid");             let mapMid = map(mid, 0, 255, 100,800);
  let treb = fft.getEnergy("treble");         let mapTreb = map(treb, 0, 255, 100,800);

  var trebWidth = 100 * volume * mapTreb;
  var midWidth = 50 * volume * mapMid;
  var bassWidth = 50 * volume * mapBass;

  // treble lines
  push();
  noStroke();
  fill(255,255,255);
  translate(width/2, height/2);
  rect(0, 0, trebWidth * volume*80, 2);
  pop();

  // mid rects
  push();
  noStroke();
  fill(100,100,100);
  translate(width/2, height/2);
  rect(0, 0, 2, midWidth * volume*80);
  pop();

  // bass square
  push();
  strokeWeight(2);
  stroke(0,0,255);
  noFill();
  translate(width/2, height/2);
  rect(0, 0, bassWidth, bassWidth);
  pop();

  // text
  push();
  fill(255,255,255);
  textSize(30);
  textAlign(CENTER,CENTER);
  text('SQUARE', width/2, 100, width, height);
  pop();

}

function swapViz() {
  if (flagViz) { flagViz = false; } else if(flagViz == false) { flagViz = true; }
}
