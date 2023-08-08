// https://wwwnucl.ph.tsukuba.ac.jp/~hinohara/compphys2-18/doc/compphys2-5.pdf
function dif(f, h=1e-4) {
  return function(x) {
    return (f(x+h) - f(x))/h;
  }
}

function dif_3p(f, h=1e-4) {
  return function(x) {
    return (-f(x-h) + f(x+h))/h/2;
  }
}

function dif_5p(f, h=1e-4) {
  return function(x) {
    return (f(x-2*h) - 8*f(x-h) + 8*f(x+h) - f(x+2*h))/h/12;
  }
}

function dif_7p(f, h=1e-4) {
  return function(x) {
    return (-f(x-3*h) + 9*f(x-2*h) - 45*f(x-h) + 45*f(x+h) - 9*f(x+2*h) + f(x+3*h))/h/60;
  }
}

function dif_9p(f, h=1e-4) {
  return function(x) {
    return (3*f(x-4*h) - 32*f(x-3*h) + 168*f(x-2*h) - 672*f(x-h) + 672*f(x+h) - 168*f(x+2*h) + 32*f(x+3*h) - 3*f(x+4*h))/h/840;
  }
}

function partial(f, i, h=1e-4) {
  return function(x) {
    let e = new Array(x.length).fill(0);
    e[i] = 1;
    return (f(con(x, -2*h, e)) - 8*f(con(x, -h, e)) + 8*f(con(x, h, e)) - f(con(x, 2*h, e)))/h/12;
  }
}

function grad(f, h=1e-4) {
  return function(x) {
    let ans = new Array(x.length);
    for (let i=0; i<dim; i++) {
      ans[i] = partial(f, i, h=1e-4)(x);
    }
    return ans;
  }
}