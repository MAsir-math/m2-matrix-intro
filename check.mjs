#!/usr/bin/env node
// Independent checks for locked §11.1 and §11.2 items.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function classify(matrix) {
  const r = matrix.length;
  const c = matrix[0].length;
  const num = (v) => {
    if (v === "1/2") return 0.5;
    const n = Number(String(v).replace("−", "-"));
    return Number.isFinite(n) ? n : NaN;
  };
  const isRow = r === 1;
  const isCol = c === 1;
  const isSquare = r === c;
  const isZero = matrix.every((row) => row.every((v) => num(v) === 0));
  const isDiag =
    isSquare &&
    matrix.every((row, i) => row.every((v, j) => i === j || num(v) === 0));
  const isIdentity = isDiag && matrix.every((row, i) => num(row[i]) === 1);
  return { row: isRow, col: isCol, zero: isZero, square: isSquare, diag: isDiag, identity: isIdentity, r, c };
}

function keys(c) {
  return ["row", "col", "zero", "square", "diag", "identity"].filter((k) => c[k]);
}

function same(c, expected) {
  assert.deepEqual(keys(c).sort(), expected.slice().sort(), JSON.stringify(c));
}

// Mode A
assert.deepEqual([[15, 16, 14], [5, 4, 6]].length, 2);
assert.equal([[15, 16, 14], [5, 4, 6]][0].length, 3);
const checkA = [[5, 7], [-2, 0], [3, 1]];
assert.equal(checkA.length, 3);
assert.equal(checkA[0].length, 2);
assert.equal(checkA[0][1], 7);
assert.equal(checkA[1][0], -2);
assert.equal(checkA[2][1], 1);

// Mode B book examples
same(classify([[0, 1]]), ["row"]);
same(classify([[4, -1, 5]]), ["row"]);
same(classify([[1], [0.5], [-1]]), ["col"]);
same(classify([[3], [0], [0]]), ["col"]);
same(classify([[0, 0], [0, 0]]), ["zero", "square", "diag"]);
same(classify([[0, 0], [0, 0], [0, 0]]), ["zero"]);
same(classify([[-1, 0, 2], [3, 5, 1], [1, 2, 4]]), ["square"]);
same(classify([[2, 0], [0, -1]]), ["square", "diag"]);
same(classify([[1, 0, 0], [0, 2, 0], [0, 0, -3]]), ["square", "diag"]);
same(classify([[1]]), ["row", "col", "square", "diag", "identity"]);
same(classify([[1, 0], [0, 1]]), ["square", "diag", "identity"]);
same(classify([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), ["square", "diag", "identity"]);
same(classify([[1, 1], [1, 1]]), ["square"]);

// Mode C: 例 11.1
// a=-4, 0=1+c, b=3c+4, 7-d=2d+1
let c = -1;
assert.equal(0, 1 + c);
let b = 3 * c + 4;
assert.equal(b, 1);
let d;
// 7-d=2d+1 → 7-1=3d → d=2
d = (7 - 1) / 3;
assert.equal(d, 2);
assert.equal(-4, -4);
console.log("例 11.1", { a: -4, b, c, d });

// 課堂練習 11.1
// 7z+3=3z-9 → 4z=-12 → z=-3
// 8=w → w=8
// 3-x=9 → x=-6
// 2y=5x-8
const z = ( -9 - 3 ) / (7 - 3);
assert.equal(z, -3);
const w = 8;
const x = 3 - 9;
assert.equal(x, -6);
const y = (5 * x - 8) / 2;
assert.equal(y, -19);
console.log("課堂練習 11.1", { w, x, y, z });

// 附加例題 11.1 from p-04.png
// A=[[5y, 4x-1, 5],[6, 3x+y, x-4y]]
// B=[[15, 2x-5, w],[6, -y, z]]
const y2 = 15 / 5;
assert.equal(y2, 3);
const x2 = (-5 + 1) / (4 - 2);
assert.equal(x2, -2);
const w2 = 5;
assert.equal(3 * x2 + y2, -y2);
const z2 = x2 - 4 * y2;
assert.equal(z2, -14);
console.log("附加例題 11.1", { w: w2, x: x2, y: y2, z: z2 });

// 自擬 3
const x3 = 4 - 1;
assert.equal(x3, 3);
const y3 = 1 - x3;
assert.equal(y3, -2);
console.log("自擬 3", { x: x3, y: y3 });

// §11.2 arithmetic
function add(A, B, sign = 1) {
  return A.map((row, i) => row.map((v, j) => v + sign * B[i][j]));
}
function scale(k, A) {
  return A.map((row) => row.map((v) => k * v));
}
function mul(A, B) {
  const r = A.length, n = A[0].length, c = B[0].length;
  assert.equal(n, B.length);
  const C = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      let s = 0;
      for (let t = 0; t < n; t++) s += A[i][t] * B[t][j];
      row.push(s);
    }
    C.push(row);
  }
  return C;
}
function nearly(A, B) {
  assert.equal(A.length, B.length);
  for (let i = 0; i < A.length; i++) {
    assert.equal(A[i].length, B[i].length);
    for (let j = 0; j < A[i].length; j++) {
      assert.ok(Math.abs(A[i][j] - B[i][j]) < 1e-10, `${A[i][j]} vs ${B[i][j]}`);
    }
  }
}

// 例 11.2
nearly(add([[2,7,-3],[0,9,-6]], [[-5,0,-2],[-1,-7,0]]), [[-3,7,-5],[-1,2,-6]]);
nearly(add([[-5,0,-2],[-1,-7,0]], [[-9,-5,3],[-3,-4,-1]], -1), [[4,5,-5],[2,-3,1]]);
// 課堂練習 11.2
nearly(add([[-3,-6],[7,3],[6,-1]], [[2,1],[0,0],[-1,-8]]), [[-1,-5],[7,3],[5,-9]]);
nearly(add([[2,1],[0,0],[-1,-8]], [[7,3],[5,1],[0,-8]], -1), [[-5,-2],[-5,-1],[-1,0]]);
// 附加例題 11.2
nearly(add([[0,2,4],[1,-6,5]], [[-4,1,5],[7,0,-2]]), [[-4,3,9],[8,-6,3]]);
nearly(add([[0,2,4],[1,-6,5]], [[1,4,1],[9,1,-1]], -1), [[-1,-2,3],[-8,-7,6]]);
// 例 11.3
nearly(scale(3, [[4,0],[3,-2]]), [[12,0],[9,-6]]);
nearly(scale(1/2, [[4,0],[3,-2]]), [[2,0],[1.5,-1]]);
// 課堂練習 11.3
nearly(scale(2, [[7,6],[0,-9]]), [[14,12],[0,-18]]);
nearly(scale(1/3, [[7,6],[0,-9]]), [[7/3,2],[0,-3]]);
nearly(scale(-1, [[7,6],[0,-9]]), [[-7,-6],[0,9]]);
// 附加例題 11.3
nearly(scale(-3, [[-4],[0],[2]]), [[12],[0],[-6]]);
nearly(scale(3/4, [[-4],[0],[2]]), [[-3],[0],[1.5]]);
// 例 11.4
{
  const A=[[9,0],[1,-8]], B=[[7,4],[3,-4]], I=[[1,0],[0,1]];
  const C=add(add(I, scale(2,B)), A, -1);
  nearly(add(add(scale(4,C), scale(7,B), -1), scale(4,A)), [[11,4],[3,0]]);
}
// 課堂練習 11.4
{
  const A=[[-6,10],[-3,-3]], B=[[4,-5],[5,-2]], I=[[1,0],[0,1]];
  const C=add(add(scale(2,I), scale(2,B)), A);
  nearly(add(add(scale(3,C), scale(6,B), -1), scale(2,A), -1), [[0,10],[-3,3]]);
}
// 附加例題 11.4
{
  const A=[[0,3],[2,-1]], B=[[1,-2],[4,3]], I=[[1,0],[0,1]];
  const C=add(add(scale(2,I), A), scale(3,B), -1);
  nearly(add(add(scale(5,A), scale(6,B)), scale(2,C)), [[4,21],[14,-3]]);
}
// 例 11.5
{
  const Sp=[[0,2],[2,0]], Sm=[[1,0],[0,3]];
  nearly(scale(1/2, add(Sp, Sm)), [[1/2,1],[1,3/2]]);
  nearly(scale(1/2, add(Sp, Sm, -1)), [[-1/2,1],[1,-3/2]]);
}
// 課堂練習 11.5  A=( (A+B)-(B-A) )/2
{
  const Sp=[[8,9],[-1,2]], D=[[9,-5],[-9,-2]];
  nearly(scale(1/2, add(Sp, D, -1)), [[-1/2,7],[4,2]]);
  nearly(scale(1/2, add(Sp, D)), [[17/2,2],[-5,0]]);
}
// 附加例題 11.5  2A+3B=P, 3A-2B=Q → 13A=2P+3Q, 13B=3P-2Q
{
  const P=[[3,8],[7,2]], Q=[[-2,-1],[-9,16]];
  nearly(scale(1/13, add(scale(2,P), scale(3,Q))), [[0,1],[-1,4]]);
  nearly(scale(1/13, add(scale(3,P), scale(2,Q), -1)), [[1,2],[3,-2]]);
}
// 例 11.6
{
  const A=[[2,3]], B=[[5],[-3]], C=[[2,2],[-3,-8]];
  nearly(mul(A,B), [[1]]);
  nearly(mul(B,A), [[10,15],[-6,-9]]);
  nearly(mul(C,B), [[4],[9]]);
}
// 課堂練習 11.6
{
  const P=[[-4,7]], Q=[[2],[1]], R=[[-1,9],[-2,4]];
  nearly(mul(P,Q), [[-1]]);
  nearly(mul(Q,P), [[-8,14],[-4,7]]);
  nearly(mul(R,Q), [[7],[0]]);
  const A=[[-3,-1]], B=[[-4],[5]], C=[[6,-3],[-5,-7]];
  nearly(mul(A,B), [[7]]);
  nearly(mul(B,A), [[12,4],[-15,-5]]);
  nearly(mul(A,C), [[-13,16]]);
}
// 例 11.7
{
  const A=[[2,4],[-1,-2]], B=[[2,0],[-1,0]], C=[[1,2],[3,5]], D=[[5,10],[1,1]];
  nearly(mul(A,B), [[0,0],[0,0]]);
  nearly(mul(B,A), [[4,8],[-2,-4]]);
  nearly(mul(A,C), [[14,24],[-7,-12]]);
  nearly(mul(A,D), [[14,24],[-7,-12]]);
}
// 課堂練習 11.7 / 附加例題 11.7
{
  const A=[[1,0],[-2,0]], B=[[0,0],[-1,-2]];
  nearly(mul(A,B), [[0,0],[0,0]]);
  nearly(mul(B,A), [[0,0],[3,0]]);
  const P=[[3,9],[-1,-3]], Q=[[-3,3],[1,-1]], R=[[1,0],[0,-1]], S=[[7,-3],[-2,0]];
  nearly(mul(P,Q), [[0,0],[0,0]]);
  nearly(mul(Q,P), [[-12,-36],[4,12]]);
  nearly(mul(P,R), [[3,-9],[-1,3]]);
  nearly(mul(P,S), [[3,-9],[-1,3]]);
  const A2=[[-2,2],[3,-3]], B2=[[1,-2],[1,-2]], C2=[[1,0],[0,1]], D2=[[0,-1],[-1,0]];
  nearly(mul(A2,B2), [[0,0],[0,0]]);
  nearly(mul(B2,A2), [[-8,8],[-8,8]]);
  nearly(mul(A2,C2), A2);
  nearly(mul(A2,D2), A2);
}
// 例 11.8 / 課堂練習 11.8
{
  const A=[[-3,0,1],[2,1,0],[0,0,-1]], B=[[1],[-1],[0]], C=[[0,2,-1]];
  nearly(mul(A,B), [[-3],[1],[0]]);
  nearly(mul(mul(A,B), C), [[0,-6,3],[0,2,-1],[0,0,0]]);
  const A2=[[1,2,0],[0,0,-1],[-3,1,0]], B2=[[3],[1],[0]], C2=[[0,-1,2]];
  nearly(mul(A2,B2), [[5],[0],[-8]]);
  nearly(mul(mul(A2,B2), C2), [[0,-5,10],[0,0,0],[0,8,-16]]);
  const P=[[-3],[1],[-1]], Q=[[2,0,1]], R=[[0,-1,1],[2,0,-1],[3,2,0]];
  nearly(mul(Q,R), [[3,0,2]]);
  nearly(mul(P, mul(Q,R)), [[-9,0,-6],[3,0,2],[-3,0,-2]]);
  nearly(mul(mul(P,Q), R), [[-9,0,-6],[3,0,2],[-3,0,-2]]);
}
// 例 11.9
{
  const x=-6, y=9/8;
  const left = mul([[3,-4*x],[-4*y,-9]], [[8],[-3]]);
  const right = scale(8, [[x],[-y]]);
  nearly(left, right);
}
// 課堂練習 11.9
{
  const x=1, y=3;
  nearly(scale(6, mul([[-2,-2*x],[-y,2]], [[-1],[1]])), [[0],[10*y]]);
  const x2=-7, y2=10;
  nearly(mul([[-7,-x2],[5*y2,-9]], [[1],[5]]), scale(-1/2, [[8*x2],[-y2]]));
}
// 例 11.10 / 課堂練習 11.10
{
  const A=[[2,1],[0,-1]], I=[[1,0],[0,1]];
  const B=add(I, scale(2,A), -1);
  nearly(B, [[-3,-2],[0,3]]);
  nearly(mul(A,B), mul(B,A));
  nearly(mul(A,B), [[-6,-1],[0,-3]]);
  const A2=[[0,-4],[1,-2]];
  const B2=add(scale(3,I), A2);
  nearly(B2, [[3,-4],[1,1]]);
  nearly(mul(A2,B2), mul(B2,A2));
  nearly(mul(A2,B2), [[-4,-4],[1,-6]]);
}
// 例 11.11(b) / 課堂練習 11.11(b) / 附加例題 11.11
nearly([[128-4*32,0,0],[0,1-4,0],[0,0,-1-4*(-1)]], [[0,0,0],[0,-3,0],[0,0,3]]);
nearly([[1+2,0,0],[0,-1+2,0],[2*9+2*8,0,1+2]], [[3,0,0],[0,1,0],[34,0,3]]);
nearly([[256-9*64,0,(256-1)-9*(64-1)],[0,6561-9*729,0],[0,0,1-9]], [[-320,0,-312],[0,0,0],[0,0,-8]]);
// 練習 11A
nearly(add([[-1,2,0]], [[-5,7,4]]), [[-6,9,4]]);
nearly(add([[7,-2],[1,-8]], [[6,-1],[1,-5]], -1), [[1,-1],[0,-3]]);
nearly(scale(4, [[1,0],[2,-3],[-1,2]]), [[4,0],[8,-12],[-4,8]]);
nearly(add(scale(5, [[1,-1,5],[2,0,0]]), scale(2, [[2,-3,0],[2,0,-4]]), -1), [[1,1,25],[6,0,8]]);
{
  const A=[[2,-3],[2,0]], B=[[1,-1],[4,-5]], C=[[1,-1],[-1,1]];
  nearly(add(A,B), [[3,-4],[6,-5]]);
  nearly(add(B, scale(2,C), -1), [[-1,1],[6,-7]]);
  nearly(add(add(A,B), scale(2,C), -1), [[1,-2],[8,-7]]);
}
{
  const A=[[8,-3],[0,-8]], B=[[-9,5],[4,6]], I=[[1,0],[0,1]];
  const C=add(add(scale(-1,I), B, -1), scale(2,A), -1);
  nearly(add(add(scale(3,C), scale(6,A)), scale(2,B)), [[6,-5],[-4,-9]]);
}
{
  const A=[[0,-1],[2,-5]], B=[[-3,5],[0,-2]], I=[[1,0],[0,1]];
  const C=add(add(scale(5,I), scale(2,A)), B);
  nearly(add(add(scale(2,C), scale(2, add(scale(4,I), B)), -1), scale(3,A), -1), [[2,-1],[2,-3]]);
}
// 練習 11A 第 8 題
assert.equal(0, 0); // x=0 from x = -0? A=−B: x=0, 2=2, 2=2, 3=−y → y=-3
assert.equal(3, -(-3));
// 練習 11B
{
  const A=[[3,0]], B=[[3,2]], C=[[2],[1]], D=[[1,2],[0,1]], E=[[-1,1],[-2,3]];
  nearly(mul(A,C), [[6]]);
  nearly(mul(C,B), [[6,4],[3,2]]);
  nearly(mul(E,C), [[-1],[-1]]);
  nearly(mul(D,E), [[-5,7],[-2,3]]);
  nearly(mul(add(D, scale(2,E)), C), [[2],[-1]]);
  nearly(add(mul(B,E), scale(1/2, mul(A,D)), -1), [[-17/2, 6]]);
}
{
  const A=[[2,1,0],[3,4,6],[-1,1,0]], B=[[1,0,-1]], C=[[2],[2],[6]];
  nearly(mul(A,C), [[6],[50],[0]]);
  nearly(mul(B, mul(A,C)), [[6]]);
}
{
  const A=[[2,0,1],[0,0,2],[1,4,1]], B=[[2,0,2],[1,0,2],[1,3,1]], C=[[1,0,1],[0,1,0],[0,0,1]];
  nearly(mul(B,C), [[2,0,4],[1,0,3],[1,3,2]]);
  nearly(add(mul(B, mul(C,B)), mul(B, mul(C,A)), -1), [[0,-4,2],[0,-3,1],[3,-2,1]]);
}
// 練習 11B 9–13
{
  const M=[[3,0],[0,-2]];
  nearly(mul(mul(M,M),M), [[27,0],[0,-8]]);
  const N=[[1,0],[2,1]];
  const N2=mul(N,N);
  nearly(mul(N2,N2), [[1,0],[8,1]]);
  const P=[[1,0,0],[-1,1,0],[0,1,1]];
  nearly(mul(mul(P,P),P), [[1,0,0],[-3,1,0],[-3,3,1]]);
  const x=2, y=7;
  nearly(mul([[6,-x],[2*y,1]], [[3],[7]]), [[2*x],[7*y]]);
  const x2=2, y2=-1/3;
  nearly(mul([[-2,x2],[9*y2,-5]], [[-4],[2]]), [[6*x2],[-6*y2]]);
}
console.log("§11.2 arithmetic ok");

// Guard: public files
// §11.3 determinants
function det2(A){return A[0][0]*A[1][1]-A[0][1]*A[1][0];}
function det3(A){
  const [[a,b,c],[d,e,f],[g,h,i]]=A;
  return a*e*i+b*f*g+c*d*h-c*e*g-a*f*h-b*d*i;
}
function nearlyN(a,b,msg){assert.ok(Math.abs(a-b)<1e-9, (msg||"")+` ${a} vs ${b}`);}
nearlyN(det2([[1,0],[0,1]]),1);
nearlyN(det2([[0,0],[1,3]]),0);
nearlyN(det2([[-3,2],[-1,4]]),-10);
nearlyN(det2([[5,0],[0,3]]),15);
nearlyN(det2([[0,4],[3,-1]]),-12);
nearlyN(det2([[2,3],[-7,-1]]),19);
nearlyN(det2([[9,4],[7,3]]),-1);
nearlyN(det2([[-1,0],[0,-1]]),1);
nearlyN(det2([[5,0],[8,0]]),0);
nearlyN(det2([[-3,-1],[4,2]]),-2);
// 例 11.13
{ const x=4; nearlyN((2-4*x)*(-10)-(-5)*(-7*x),0); }
{ const xs=[7/6,-3]; xs.forEach(x=>nearlyN((3*x-7)*(2*x+3)-(-8*x)*2,0,"ex11.13b")); }
{ const x=1; nearlyN(2*(1-x)-(-1)*x,x,"qp11.13a"); }
{ const x=5/7; nearlyN((5*x+9)*6-8*(9*x+3),0,"qp11.13b"); }
nearlyN(det3([[9,-1,8],[6,-2,7],[-3,1,-4]]),6);
nearlyN(det3([[1,0,-2],[2,4,0],[3,-1,1]]),32);
nearlyN(det3([[0,5,-8],[2,6,2],[0,-2,4]]),-8);
nearlyN(det3([[1,0,3],[0,-1,1],[1,0,-2]]),5);
nearlyN(det3([[0,-6,-7],[0,3,5],[-2,9,8]]),18);
nearlyN(det3([[2,4,0],[11,3,2],[1,-2,1]]),-22);
nearlyN(det3([[1,10,-1],[4,0,0],[3,0,-5]]),200);
// minors 例 11.14
nearlyN(det2([[2,5],[4,1]]),-18);
nearlyN(-det2([[1,-1],[3,4]]),-7);
nearlyN(det2([[3,0],[5,-1]]),-3);
nearlyN(det2([[-1,2],[-1,-3]]),5);
nearlyN(det2([[1,2],[5,-3]]),-13);
nearlyN(-det2([[1,2],[3,4]]),2);
nearlyN(det2([[1,2],[1,7]]),5);
nearlyN(det2([[0,2],[2,3]]),-4);
// 練習 11C
nearlyN(det2([[7,0],[-4,0]]),0);
nearlyN(det2([[4,-1],[3,2]]),11);
nearlyN(det2([[5,3],[-4,-7]]),-23);
nearlyN(det3([[1,2,0],[2,-2,1],[0,3,-3]]),15);
nearlyN(det3([[4,3,3],[2,0,-1],[2,1,1]]),-2);
nearlyN(det3([[-4,2,-5],[1,2,-1],[3,-2,1]]),32);
nearlyN(det3([[0,2,1],[1,15,6],[0,3,4]]),-5);
nearlyN(det3([[2,0,-3],[3,1,4],[5,1,-2]]),-6);
nearlyN(det3([[3,6,7],[3,5,3],[1,2,1]]),4);
nearlyN(det2([[2,3],[2,6]]),6);
nearlyN(det2([[2,2],[5,6]]),2);
nearlyN(-det2([[2,2],[11,0]]),22);
nearlyN(-det2([[3,2],[2,6]]),-14);
nearlyN(det3([[2,0,0],[2,3,0],[-1,1,1]]),6);
nearlyN(det3([[2,3,2],[-1,1,9],[1,2,3]]),0);
nearlyN((-2)**7,-128);
console.log("§11.3 arithmetic ok");

function ident(n) {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
}
function eqM(A, B, msg) {
  assert.equal(A.length, B.length, msg);
  for (let i = 0; i < A.length; i++) {
    assert.equal(A[i].length, B[i].length, msg);
    for (let j = 0; j < A[i].length; j++) nearlyN(A[i][j], B[i][j], msg);
  }
}
eqM(mul([[3,5],[-1,-2]], [[2,5],[-1,-3]]), ident(2), "intro AB");
eqM(mul([[2,5],[-1,-3]], [[3,5],[-1,-2]]), ident(2), "intro BA");
eqM(mul([[8,5],[3,2]], [[2,-5],[-3,8]]), ident(2), "check11.3a");
eqM(mul([[2,1,2],[-3,0,-1],[-4,-1,-3]], [[1,-1,1],[5,-2,4],[-3,2,-3]]), ident(3), "check11.3c");
eqM(mul([[7,-2],[-3,1]], [[1,2],[3,7]]), ident(2), "ex11.17 Ainv");
eqM(mul([[2,-3],[-1,2]], [[2,3],[1,2]]), ident(2), "ex11.17 Binv");
eqM(mul([[2,3],[1,2]], [[1,2],[3,7]]), [[11,25],[7,16]], "ex11.17 BinvAinv");
eqM(mul([[1,2],[3,7]], [[2,3],[1,2]]), [[4,7],[13,23]], "ex11.17 AinvBinv");
eqM(mul([[1,-3],[1,-2]], [[-2,3],[-1,1]]), ident(2), "qp11.17 A");
eqM(mul([[-5,-3],[2,1]], [[1,3],[-2,-5]]), ident(2), "qp11.17 B");
eqM(mul([[1,3],[-2,-5]], [[-2,3],[-1,1]]), [[-5,6],[9,-11]], "qp11.17 BinvAinv");
eqM(mul([[-2,3],[-1,1]], [[1,3],[-2,-5]]), [[-8,-21],[-3,-8]], "qp11.17 AinvBinv");
eqM(mul([[2,-1],[-5,3]], [[3,1],[5,2]]), ident(2), "extra11.17 A");
eqM(mul([[4,3],[-3,-2]], [[-2,-3],[3,4]]), ident(2), "extra11.17 B");
eqM(mul([[-2,-3],[3,4]], [[3,1],[5,2]]), [[-21,-8],[29,11]], "extra11.17 BinvAinv");
eqM(mul([[3,1],[5,2]], [[-2,-3],[3,4]]), [[-3,-5],[-4,-7]], "extra11.17 AinvBinv");
eqM(mul([[3,1],[5,2]], [[2,-1],[-5,3]]), ident(2), "ex11.18");
eqM(mul([[2,-1],[-5,3]], [[2,-1],[-5,3]]), [[9,-5],[-25,14]], "ex11.18 Pinv2");
eqM(mul([[2,11],[1,5]], [[-5,11],[1,-2]]), ident(2), "qp11.18");
{
  const Ainv2 = mul([[-5,11],[1,-2]], [[-5,11],[1,-2]]);
  eqM(mul(Ainv2, [[-5,11],[1,-2]]), [[-257,550],[50,-107]], "qp11.18 Ainv3");
}
eqM(mul([[-3,2],[-2,1]], [[1,-2],[2,-3]]), ident(2), "extra11.18");
{
  const M2 = mul([[1,-2],[2,-3]], [[1,-2],[2,-3]]);
  eqM(mul(M2, M2), [[-7,8],[-8,9]], "extra11.18 M4");
}
{
  const A = [[4,0],[-9,1]];
  eqM(add(add(mul(A,A), scale(-5,A)), scale(4, ident(2))), [[0,0],[0,0]], "ex11.20 id");
  eqM(scale(-1/4, add(A, scale(-5, ident(2)))), [[1/4,0],[9/4,1]], "ex11.20 inv");
}
{
  const A = [[2,1],[-3,-1]];
  eqM(add(add(mul(A,A), scale(-1,A)), ident(2)), [[0,0],[0,0]], "qp11.20a id");
  eqM(add(ident(2), scale(-1,A)), [[-1,-1],[3,2]], "qp11.20a inv");
}
{
  const B = [[-1,6],[2,-9]];
  eqM(add(add(mul(B,B), scale(10,B)), scale(-3, ident(2))), [[0,0],[0,0]], "qp11.20b id");
  eqM(scale(1/3, add(B, scale(10, ident(2)))), [[3,2],[2/3,1/3]], "qp11.20b inv");
}
{
  const P = [[6,3],[-7,-4]];
  eqM(add(add(mul(P,P), scale(-2,P)), scale(-3, ident(2))), [[0,0],[0,0]], "extra11.20 id");
  eqM(scale(1/3, add(P, scale(-2, ident(2)))), [[4/3,1],[-7/3,-2]], "extra11.20 inv");
}
eqM(mul([[3,-4],[-5,7]], [[7,4],[5,3]]), ident(2), "11D-1");
eqM(mul([[-2,2,-1],[1,-1,1],[1,0,2]], [[-2,-4,1],[-1,-3,1],[1,2,0]]), ident(3), "11D-2");
eqM(mul([[4,5],[3,4]], [[4,-5],[-3,4]]), ident(2), "11D-9");
eqM(mul([[4,-5],[-3,4]], [[4,-5],[-3,4]]), [[31,-40],[-24,31]], "11D-9 A2inv");
eqM(mul([[1,0],[11,-1]], [[1,0],[11,-1]]), ident(2), "11D-10 A2");
eqM(mul([[3,-2],[2,1]], [[1,0],[11,-1]]), [[-19,2],[13,-1]], "11D-10 BA");
eqM(mul([[2,0,1],[2,4,-1],[2,3,-1]], [[1,-3,4],[0,4,-4],[2,6,-8]]), [[4,0,0],[0,4,0],[0,0,4]], "11D-11 AB");
eqM(scale(1/4, [[1,-3,4],[0,4,-4],[2,6,-8]]), [[1/4,-3/4,1],[0,1,-1],[1/2,3/2,-2]], "11D-11 Ainv");
eqM(scale(1/4, [[2,0,1],[2,4,-1],[2,3,-1]]), [[1/2,0,1/4],[1/2,1,-1/4],[1/2,3/4,-1/4]], "11D-11 Binv");
{
  const A = [[8,-5],[3,-2]];
  eqM(add(add(mul(A,A), scale(-6,A)), scale(-1, ident(2))), [[0,0],[0,0]], "11D-12 id");
  eqM(add(A, scale(-6, ident(2))), [[2,-5],[3,-8]], "11D-12 inv");
}
{
  const A = [[3,-1,1],[-1,3,1],[1,1,3]];
  eqM(add(add(mul(A,A), scale(-5,A)), scale(4, ident(3))), scale(0, ident(3)), "11D-13 id");
  const invA = scale(1/4, add(scale(5, ident(3)), scale(-1,A)));
  eqM(invA, [[1/2,1/4,-1/4],[1/4,1/2,-1/4],[-1/4,-1/4,1/2]], "11D-13 inv");
  eqM(scale(8, invA), [[4,2,-2],[2,4,-2],[-2,-2,4]], "11D-13 8inv");
}
{
  const A = [[0,1,1],[0,2,0],[-2,1,3]];
  const A2 = mul(A,A), A3 = mul(A2,A);
  eqM(add(add(add(A3, scale(-5,A2)), scale(8,A)), scale(-4, ident(3))), scale(0, ident(3)), "11D-14");
}
{
  const A = [[-1/2,1/2,1],[3/2,1/2,-1],[0,1,0]];
  const A2 = mul(A,A);
  eqM(mul(A,A2), ident(3), "11D-15 A3");
}
eqM(mul([[1,2,3],[0,1,-1],[0,0,1]], [[1,-2,-5],[0,1,1],[0,0,1]]), ident(3), "11D-16c");
eqM(mul([[2,1],[0,5]], [[1/2,-1/10],[0,1/5]]), ident(2), "11D-17 Binv");
eqM(mul([[2,1],[0,5]], [[2,5/2],[0,-3]]), mul([[2,0],[0,-3]], [[2,1],[0,5]]), "11D-17 BA=CB");
eqM(mul([[9,1],[8,1]], [[1,-1],[-8,9]]), ident(2), "assess1");
{
  const A = [[-5,2],[2,0]];
  eqM(add(mul(A,A), scale(5,A)), scale(4, ident(2)), "assess3 id");
  eqM(scale(1/4, add(A, scale(5, ident(2)))), [[0,1/2],[1/2,5/4]], "assess3 inv");
}
console.log("§11.4 arithmetic ok");

const publicSrc = readFileSync(new URL("./index.html", import.meta.url), "utf8") +
  readFileSync(new URL("./app.js", import.meta.url), "utf8") +
  readFileSync(new URL("./ops.js", import.meta.url), "utf8") +
  readFileSync(new URL("./det.js", import.meta.url), "utf8") +
  readFileSync(new URL("./inv.js", import.meta.url), "utf8") +
  readFileSync(new URL("./README.md", import.meta.url), "utf8");
for (const forbidden of ["轉置", "伴隨", "AI=IA", "教師版", "教師專用", "T.28", "T.30", "T.31", "T.32", "T.33", "T.34", "T.35", "\u5e42", "\u966a\u96a8"]) {
  assert.equal(publicSrc.includes(forbidden), false, "forbidden: " + forbidden);
}
for (const need of ["A 讀矩陣", "B 辨認特殊矩陣", "C 矩陣相等", "加減法", "純量乘法", "矩陣乘法", "矩陣的冪", "練習 11A", "練習 11B", "行列式", "子行列式", "餘因式", "餘因式展式", "練習 11C", "逆矩陣", "練習 11D", "方矩陣的逆矩陣", "非奇異", "奇異"]) {
  assert.equal(publicSrc.includes(need), true, "missing: " + need);
}

console.log("all checks passed");
