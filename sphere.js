class Hanabi {
  constructor(r, N) {
    this.r = r; // 半径
    this.N = N; // 総粒子数
    this.n = this.optim_pos(); // 法線の方向
    this.x = new Array(this.N).fill(0);
    this.v = this.n.slice();
    this.line = [this.x.slice()];
    this.t = 0;
  }
  optim_pos() { // https://www.ism.ac.jp/editsec/toukei/pdf/46-2-359.pdf
    let dt = 1e-2;
    let n = new Array(this.N).fill();
    n = n.map(() => [2*Math.random()-1, 2*Math.random()-1, 2*Math.random()-1]);
    n = n.map(x => re(x));
    const F = function(n, i, j) {
      let scale = 1/(angle(n[i],n[j])+0.2)**3 // 0.1は発散の回避←？
      let nij = con(n[i], -1, n[j]);
      // if (len(nij) <= 1e-3) return [0,0,0];
      let p_nij = con(nij, -ip(n[i], nij), n[i]); // 球面上に沿わせる
      return sp(scale, p_nij);
    }
    for (let step = 0; step < 5; step++) { // 計算量えぐい
      let new_n = n.slice();
      for (let i = 0; i < this.N; i++) {
        for (let j = i+1; j < this.N; j++) {
          new_n[i] = con(new_n[i], dt, F(n, i, j));
          new_n[j] = con(new_n[j], dt, F(n, j, i));
        }
      }
      n = new_n.slice();
    }
    n = n.map(x => re(x));
    return n;
  }
  expl_step(dt, t_max) {
    // 自由落下するだけ
    if (this.line.length >= 30) {
      this.line.pop();
    }
    if (t <= t_max) {
      let g = [0,-0.5,0];
      for (let i=0; i<this.N; i++) {
        this.v[i] = con(this.v[i], dt, g);
        this.x[i] = con(this.x[i], dt, this.v[i]);
      }
      this.line.unshift(this.x.slice());
    }
  }
  draw() {
    const f = function(x) {
      let V = 255*exp(-x/7);
      let filter = [1,0.9,0.8];
      // filter = [1,1,1];
      let color = sp(V, filter);
      return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
    }
    const g = function(x) {
      return 4*exp(-x/30);
    }
    for (let i=0; i<this.N; i++) {
      // point(this.line[0][i], "white", 2);
      ctx.globalCompositeOperation = "screen";
      for (let s=0; s<this.line.length-1; s++) {
        segment(this.line[s][i], this.line[s+1][i], f(s), g(s));
      }
      ctx.globalCompositeOperation = "source-over";
    }
  }
}

let hanabi = new Hanabi(1, 200);
//console.log(hanabi.n);