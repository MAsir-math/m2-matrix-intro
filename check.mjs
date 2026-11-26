#!/usr/bin/env node
// Independent checks for locked §11.1 items. No operations from §11.2.
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

// Guard: source must not leak later-section words
const publicSrc = readFileSync(new URL("./index.html", import.meta.url), "utf8") +
  readFileSync(new URL("./app.js", import.meta.url), "utf8") +
  readFileSync(new URL("./README.md", import.meta.url), "utf8");
for (const forbidden of ["行列式", "逆矩陣", "轉置", "伴隨", "AI=IA", "教師版", "T.28", "純量乘法", "矩陣加法", "矩陣乘法"]) {
  assert.equal(publicSrc.includes(forbidden), false, "forbidden: " + forbidden);
}

console.log("all checks passed");
