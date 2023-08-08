let t = 0;
let dt = 0.03;

function draw() {
  //ctx.clearRect(0,0,sastS[0],sastS[1]);
  //ctx.fillStyle = "rgb(20,20,50)";
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,sastS[0],sastS[1]);
  // coordinate();
  hanabi.draw();
}

function anime() {
  draw();
  hanabi.expl_step(dt, 1);
  t += dt;
  setTimeout(function() {anime()}, 50);
}

function setup() {
  window_load();
  reset_pos();
  draw();
} setup();

anime();

window.onresize = function() {
  move_pos([(window.innerWidth-sastS[0])/2, (window.innerHeight-sastS[1])/2]);
  window_load();
  draw();
};

//---カメラ操作---//
let mcoorS, mcoor;
canvas.onmousewheel = function(e) {
  mcoorS = [e.pageX, e.pageY];
  mcoor = toR(mcoorS);
  scaleS *= 1+0.001*e.wheelDelta;
  let x = [-mcoor[0]*(1-1/(1+0.001*e.wheelDelta)),-mcoor[1]*(1-1/(1+0.001*e.wheelDelta))];
  oS = toS(x);
  draw();
}
function md(e) {
  mcoorS = [e.pageX, e.pageY];
  window.addEventListener("mousemove", mm);
}
function mm(e) {
  move_pos([e.pageX-mcoorS[0], e.pageY-mcoorS[1]]);
  draw();
  mcoorS = [e.pageX, e.pageY];
  window.addEventListener("mouseup", ms);
}
function ms(e) {
  window.removeEventListener("mousemove", mm);
}
canvas.addEventListener("mousedown", md);