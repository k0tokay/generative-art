// 加算
function add(x, y) {
  if (Array.isArray(x)) {
    let ans = [];
    for (let i = 0; i < x.length; i++) {
      ans.push(add(x[i], y[i]));
    }
    return ans;
  } else if (x == 0) {
    return y; // yは配列が入る可能性がある
  } else {
    return x + y;
  }
}

// スカラー倍
function sp(a, x) {
  if (Array.isArray(x)) {
    return x.map(xi => sp(a, xi));
  } else {
    return a * x;
  }
}

// 減算
function sub(x, y) {
  if (Array.isArray(x)) {
    ans = [];
    for (let i = 0; i < x.length; i++) {
      ans.push(sub(x[i], y[i]));
    }
    return ans;
  } else {
    return x - y;
  }
}

// 線型結合
function con(...x) {
  let sc = 1;
  let ans = 0;
  x.forEach(xi => {
    if (Array.isArray(xi)) {
      ans = add(ans, sp(sc, xi));
      sc = 1;
    } else { sc *= xi; }
  });
  return ans;
}

// 複素数の乗法
function cm(...x) {
  if (x.length === 2) {
    return [x[0][0]*x[1][0]-x[0][1]*x[1][1], x[0][1]*x[1][0]+x[0][0]*x[1][1]];
  } else {
    let xpop = x.slice(1);
    return cm(x[0], cm(...xpop));
  }
}

// 複素数の除法
function cv(x, y) {
  return sp(1/(len(y)**2), [x[0]*y[0]+x[1]*y[1], x[1]*y[0]-x[0]*y[1]]);
}

// ノルム
function len(x) {
  let ans = 0;
  x.forEach(xi => { ans += xi**2; });
  return Math.sqrt(ans);
}

// 正規化
function re(x) {
  let ans = [];
  let lenx = len(x);
  x.forEach(xi => { ans.push(xi/lenx); });
  return ans;
}

// 距離
function dist(x, y) {
  let ans = 0;
  for (let i = 0; i < x.length; i++) {
    ans += (x[i] - y[i]) ** 2;
  }
  return Math.sqrt(ans);
}

//内積
function ip(x, y) {
  let ans = 0;
  for (let i = 0; i < x.length; i++) {
    ans += x[i] * y[i];
  }
  return ans;
}

//角度
function angle(x, y) {
  return acos(ip(x, y) / len(x) / len(y));
}