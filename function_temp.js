const e = Math.E;
const pi = Math.PI;
const ln = Math.ln;
const log10 = Math.log10;
const log2 = Math.log2;
const exp = Math.exp;
const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const sinh = Math.sinh;
const cosh = Math.cosh;
const tanh = Math.tanh;
const asin = Math.asin;
const acos = Math.acos;
const atan = Math.atan;
const pow = Math.pow;
const fl = Math.floor
function ifl(x) {
  return x - Math.floor(x);
}
const sqrt = Math.sqrt;
const abs = Math.abs;
const max = Math.max;
function maxv(...x) {
  let ans = []
  let xT = x.trans();
  for (let i=0; i<xT.length; i++) {
    ans.push(max(xT[0]));
  }
  return ans;
}

function VtoRGB(V) {
  return "rgb(" + V + ", " + V + ", " + V + ")";
}