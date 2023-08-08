let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

//---座標の基本操作---//
let sastS = new Array(2);
function window_load() {
  sastS[0] = window.innerWidth;
  sastS[1] = window.innerHeight;
  canvas.width = sastS[0];
  canvas.height = sastS[1];
}
let oS, scaleS, basescaleS;
function reset_pos() {
  oS = [sastS[0]/2,sastS[1]/2];
  scaleS = (sastS[0]+sastS[1])/20;
  basescaleS = scaleS;
}
function move_pos(xS) {
  oS[0] += xS[0];
  oS[1] += xS[1];
}

// カメラの操作に対して不変な座標から/へ
function toS(x) {
  return [scaleS*x[0]+oS[0], -scaleS*x[1]+oS[1]];
}
function toR(xS) {
  return [(xS[0]-oS[0])/scaleS, -(xS[1]-oS[1])/scaleS];
}

//---基本的な描画関数---//
function segment(x, y, color="black", width=1) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(toS(x)[0], toS(x)[1]);
  ctx.lineTo(toS(y)[0], toS(y)[1]);
  ctx.lineWidth = width;
  ctx.stroke();
}
function segmentS(x, y, color="black", width=1) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x[0], x[1]);
  ctx.lineTo(y[0], y[1]);
  ctx.lineWidth = width;
  ctx.stroke();
}

function point(x, color="black", size=2) {
  ctx.beginPath();
  ctx.arc(toS(x)[0], toS(x)[1], size, 0, 2*pi, true);
  ctx.fillStyle = color;
  ctx.fill();
}

function coordinate() {
  let f = function(x) {
    return 255 * (1 - 0.2*(1+tanh(x)));
  }
  let logsc = log10(basescaleS/scaleS);
  let R0 = toR([0,sastS[1]]), R1 = toR([sastS[0],0]);
  for (let k=-1; k<=1; k++) {
    let color = f(k - ifl(logsc));
    color = "rgb(" + color + ", " + color + ", " + color + ")";
    let dx = pow(10,fl(logsc) + k);
    let min = R0.map(x => fl(x/dx)*dx);
    let max = R1.map(x => fl(x/dx)*dx);
    for (let i = min[1]; i <= max[1]; i += dx) {
      segment([R0[0], i], [R1[0], i], color);
    }
    for (let i = min[0]; i <= max[0]; i += dx) {
      segment([i, R0[1]], [i, R1[1]], color);
    }
  }
  segment([R0[0], 0], [R1[0], 0], "rgb(100,100,100)");
  segment([0, R0[1]], [0, R1[1]], "rgb(100,100,100)");
}