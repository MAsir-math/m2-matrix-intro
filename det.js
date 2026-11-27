/* §11.3 行列式 — 馬Sir教室。本課程只學 2 階和 3 階。 */
(function () {
  "use strict";

  const GROUPS = [
    { id: "det", title: "行列式示範", hash: "det" },
    { id: "det2", title: "2 階行列式", hash: "det2" },
    { id: "det3", title: "3 階行列式", hash: "det3" },
    { id: "minor", title: "子行列式和餘因式", hash: "minor" },
    { id: "expand", title: "餘因式展式", hash: "expand" },
    { id: "exer11C", title: "練習 11C", hash: "exer11C" },
    { id: "assess11.3", title: "階段評估 11.3", hash: "assess11.3" },
  ];

  const ITEMS = [
    {
      id: "ex11.12", hash: "ex11.12", group: "det2", title: "例 11.12", tag: "2 階",
      lead: "求下列各行列式的值。",
      tasks: [
        { q: "（a）", det: [[1, 0], [0, 1]], answer: 1 },
        { q: "（b）", det: [[0, 0], [1, 3]], answer: 0 },
        { q: "（c）", det: [[-3, 2], [-1, 4]], answer: -10 },
      ],
    },
    {
      id: "qp11.12", hash: "qp11.12", group: "det2", title: "課堂練習 11.12", tag: "2 階",
      lead: "求下列各行列式的值。",
      tasks: [
        { q: "（a）", det: [[5, 0], [0, 3]], answer: 15 },
        { q: "（b）", det: [[0, 4], [3, -1]], answer: -12 },
        { q: "（c）", det: [[3, 0], [-5, 0]], answer: 0 },
        { q: "（d）", det: [[2, 3], [-7, -1]], answer: 19 },
        { q: "（e）", det: [[9, 4], [7, 3]], answer: -1 },
      ],
    },
    {
      id: "extra11.12", hash: "extra11.12", group: "det2", title: "附加例題 11.12", tag: "2 階",
      lead: "求下列各行列式的值。",
      tasks: [
        { q: "（a）", det: [[-1, 0], [0, -1]], answer: 1 },
        { q: "（b）", det: [[5, 0], [8, 0]], answer: 0 },
        { q: "（c）", det: [[-3, -1], [4, 2]], answer: -2 },
      ],
    },
    {
      id: "ex11.13", hash: "ex11.13", group: "det2", title: "例 11.13", tag: "解方程",
      lead: "解下列各方程。",
      tasks: [
        { q: "（a）", det: [["2-4x", -5], ["-7x", -10]], eq: 0, unknowns: { x: 4 },
          steps: ["(2−4x)(−10)−(−5)(−7x)＝0", "5x−20＝0，故 x＝4。"] },
        { q: "（b）", det: [["3x-7", "-8x"], [2, "2x+3"]], eq: 0, unknowns: { x: [7 / 6, -3] },
          steps: ["(3x−7)(2x＋3)−(−8x)(2)＝0", "6x²＋11x−21＝0，(6x−7)(x＋3)＝0，故 x＝7/6 或 −3。"] },
      ],
    },
    {
      id: "qp11.13", hash: "qp11.13", group: "det2", title: "課堂練習 11.13", tag: "解方程",
      lead: "解下列各方程。",
      tasks: [
        { q: "（a）", det: [[2, -1], ["x", "1-x"]], eq: "x", unknowns: { x: 1 } },
        { q: "（b）", det: [["5x+9", 8], ["9x+3", 6]], eq: 0, unknowns: { x: 5 / 7 } },
        { q: "（c）", det: [["x-1", 9], [8, "x-7"]], eq: 0, unknowns: { x: [-5, 13] } },
        { q: "（d）", det: [["9-5x", "-x"], [4, "8-2x"]], eq: 0, unknowns: { x: [3, 12 / 5] } },
      ],
    },
    {
      id: "extra11.13", hash: "extra11.13", group: "det2", title: "附加例題 11.13", tag: "解方程",
      lead: "解下列各方程。",
      tasks: [
        { q: "（a）", det: [["x+1", "2-x"], [5, 2]], eq: 0, unknowns: { x: 8 / 7 } },
        { q: "（b）", det: [["8x+1", 3], ["5x", "x+3"]], eq: 0, unknowns: { x: [-3 / 4, -1 / 2] } },
      ],
    },
    {
      id: "check11.2", hash: "check11.2", group: "det3", title: "概念測試站 11.2", tag: "3 階",
      lead: "求下列行列式的值。可用定義 11.7（或複製首兩列的記法）來算。",
      tasks: [{ q: "求行列式的值。", det: [[9, -1, 8], [6, -2, 7], [-3, 1, -4]], answer: 6 }],
    },
    {
      id: "ex11.15", hash: "ex11.15", group: "expand", title: "例 11.15", tag: "餘因式展式",
      lead: "計算下列各行列式的值。從含最多零的行或列展開，通常更為容易。",
      tasks: [
        { q: "（a）沿第 1 行展開。", det: [[1, 0, -2], [2, 4, 0], [3, -1, 1]], answer: 32,
          steps: ["＝(1)|4 0；−1 1| − (0)|2 0；3 1| ＋ (−2)|2 4；3 −1|＝32。"] },
        { q: "（b）沿第 1 列展開。", det: [[0, 5, -8], [2, 6, 2], [0, -2, 4]], answer: -8,
          steps: ["＝(0)A₁₁ ＋ (2)A₂₁ ＋ (0)A₃₁＝−2|5 −8；−2 4|＝−8。"] },
      ],
    },
    {
      id: "qp11.15", hash: "qp11.15", group: "expand", title: "課堂練習 11.15", tag: "餘因式展式",
      lead: "計算下列各行列式的值。",
      tasks: [
        { q: "（a）", det: [[1, 0, 3], [0, -1, 1], [1, 0, -2]], answer: 5 },
        { q: "（b）", det: [[0, -6, -7], [0, 3, 5], [-2, 9, 8]], answer: 18 },
      ],
    },
    {
      id: "extra11.15", hash: "extra11.15", group: "expand", title: "附加例題 11.15", tag: "餘因式展式",
      lead: "計算下列各行列式的值。",
      tasks: [
        { q: "（a）", det: [[2, 4, 0], [11, 3, 2], [1, -2, 1]], answer: -22 },
        { q: "（b）", det: [[1, 10, -1], [4, 0, 0], [3, 0, -5]], answer: 200 },
      ],
    },
    {
      id: "ex11.14", hash: "ex11.14", group: "minor", title: "例 11.14", tag: "子行列式／餘因式",
      lead: "考慮下列行列式。",
      givenDet: [[1, -1, 0], [2, 2, 5], [3, 4, 1]],
      tasks: [
        { q: "（a）求 M₁₁。", minor: [0, 0], answer: -18, showMinor: [[2, 5], [4, 1]] },
        { q: "（b）求 A₂₃。", cofactor: [1, 2], answer: -7, showMinor: [[1, -1], [3, 4]], sign: -1 },
      ],
    },
    {
      id: "qp11.14", hash: "qp11.14", group: "minor", title: "課堂練習 11.14", tag: "子行列式／餘因式",
      lead: "考慮下列行列式。",
      givenDet: [[1, -1, 2], [3, 0, 4], [5, -1, -3]],
      tasks: [
        { q: "（a）求 M₁₃ 和 M₂₁。", pair: [
          { kind: "M", ij: [0, 2], answer: -3, showMinor: [[3, 0], [5, -1]] },
          { kind: "M", ij: [1, 0], answer: 5, showMinor: [[-1, 2], [-1, -3]] },
        ] },
        { q: "（b）求 A₂₂ 和 A₃₂。", pair: [
          { kind: "A", ij: [1, 1], answer: -13, showMinor: [[1, 2], [5, -3]] },
          { kind: "A", ij: [2, 1], answer: 2, showMinor: [[1, 2], [3, 4]] },
        ] },
      ],
    },
    {
      id: "extra11.14", hash: "extra11.14", group: "minor", title: "附加例題 11.14", tag: "子行列式／餘因式",
      lead: "考慮下列行列式。",
      givenDet: [[1, 0, 2], [-5, 2, 3], [1, -1, 7]],
      tasks: [
        { q: "（a）求 M₂₂。", minor: [1, 1], answer: 5, showMinor: [[1, 2], [1, 7]] },
        { q: "（b）求 A₃₁。", cofactor: [2, 0], answer: -4, showMinor: [[0, 2], [2, 3]], sign: 1 },
      ],
    },
    {
      id: "ex11.16", hash: "ex11.16", group: "expand", title: "例 11.16", tag: "展開再求解",
      lead: "（a）展開下列行列式；（b）由此解方程。",
      tasks: [
        { q: "（a）展開。", det: [["a", 0, 0], ["b", "c", 0], ["d", "e", "f"]], text: "acf",
          steps: ["沿第 1 行：＝a|c 0；e f|＝a[cf]。"] },
        { q: "（b）由此，解方程，右端等於 4。", det: [["2-9m", 0, 0], [7, "5m-3", 0], [-5, 9, "1/m"]], eq: 4,
          unknowns: { m: [1 / 3, 2 / 5] },
          steps: ["由（a），(2−9m)(5m−3)(1/m)＝4。", "15m²−11m＋2＝0，(3m−1)(5m−2)＝0，故 m＝1/3 或 2/5。"] },
      ],
    },
    {
      id: "qp11.16", hash: "qp11.16", group: "expand", title: "課堂練習 11.16", tag: "展開再求解",
      lead: "展開下列行列式，並由此解方程。",
      tasks: [
        { q: "（a）（i）展開。", det: [["a", 1, 0], ["b", 0, 1], ["c", 1, 1]], text: "c−a−b" },
        { q: "（a）（ii）由此解方程，右端等於 −10。", det: [["-5x", 1, 0], ["4x-1", 0, 1], ["x+3", 1, 1]], eq: -10, unknowns: { x: -7 } },
        { q: "（b）（i）展開。", det: [["a", 1, 0], [1, "b", 0], [0, 1, "c"]], text: "abc−c" },
        { q: "（b）（ii）由此解方程，右端等於 y，其中 y≠0。", det: [["9-4y", 1, 0], [1, "(1-y)/3", 0], [0, 1, "y"]], eq: "y", unknowns: { y: [1 / 4, 3] } },
      ],
    },
    {
      id: "extra11.16", hash: "extra11.16", group: "expand", title: "附加例題 11.16", tag: "展開再求解",
      lead: "（a）展開下列行列式；（b）由此解方程。",
      tasks: [
        { q: "（a）展開。", det: [[0, 1, "c"], ["a", 0, 1], [1, "b", 0]], text: "abc＋1" },
        { q: "（b）由此，解方程，右端等於 10。注意中間那一個元素是 1/(k＋1)。", det: [[0, 1, "2k+11"], ["k-5", 0, 1], [1, "1/(k+1)", 0]], eq: 10, unknowns: { k: [8, -4] } },
      ],
    },
    /* 練習 11C */
    {
      id: "exer11C-13", hash: "exer11C-13", group: "exer11C", title: "練習 11C 第 1–3 題", tag: "程度 1",
      lead: "求下列各行列式的值。",
      tasks: [
        { q: "1.", det: [[7, 0], [-4, 0]], answer: 0 },
        { q: "2.", det: [[4, -1], [3, 2]], answer: 11 },
        { q: "3.", det: [[5, 3], [-4, -7]], answer: -23 },
      ],
    },
    {
      id: "exer11C-4", hash: "exer11C-4", group: "exer11C", title: "練習 11C 第 4 題", tag: "程度 1",
      lead: "設 A＝((x＋1  2)；(2x  −1)) 及 B＝((x  2)；(0  3))。",
      tasks: [
        { q: "（a）求 det A 和 det B，答案以 x 表示。", text: "det A＝−5x−1，det B＝3x。" },
        { q: "（b）若 (det A−3)/(det B−3)＝−2/3，求 x 的值。", unknowns: { x: -2 } },
      ],
    },
    {
      id: "exer11C-78", hash: "exer11C-78", group: "exer11C", title: "練習 11C 第 7–8 題", tag: "子行列式／餘因式",
      lead: "求指定的子行列式和餘因式。",
      tasks: [
        { q: "7. 考慮 |2 1；3 0|。（a）求 M₁₂；（b）求 A₁₁。", text: "M₁₂＝3，A₁₁＝0。",
          steps: ["2 階行列式中，M₁₂ 是刪去第 1 行、第 2 列後餘下的 1 階行列式，其值為 3。A₁₁＝(−1)¹⁺¹ M₁₁＝0。"] },
        { q: "8. 考慮下列 3 階行列式。（a）求 M₁₁、M₂₂；（b）求 A₃₂、A₂₁。",
          det: [[2, 3, 2], [11, 1, 0], [5, 2, 6]],
          text: "M₁₁＝6，M₂₂＝2，A₃₂＝22，A₂₁＝−14。" },
      ],
    },
    {
      id: "exer11C-914", hash: "exer11C-914", group: "exer11C", title: "練習 11C 第 9–14 題", tag: "程度 1",
      lead: "計算下列各行列式的值。",
      tasks: [
        { q: "9.", det: [[1, 2, 0], [2, -2, 1], [0, 3, -3]], answer: 15 },
        { q: "10.", det: [[4, 3, 3], [2, 0, -1], [2, 1, 1]], answer: -2 },
        { q: "11.", det: [[-4, 2, -5], [1, 2, -1], [3, -2, 1]], answer: 32 },
        { q: "12.", det: [[0, 2, 1], [1, 15, 6], [0, 3, 4]], answer: -5 },
        { q: "13.", det: [[2, 0, -3], [3, 1, 4], [5, 1, -2]], answer: -6 },
        { q: "14.", det: [[3, 6, 7], [3, 5, 3], [1, 2, 1]], answer: 4 },
      ],
    },
    {
      id: "exer11C-1520", hash: "exer11C-1520", group: "exer11C", title: "練習 11C 第 15–20 題", tag: "程度 2",
      lead: "解下列各方程。",
      tasks: [
        { q: "15.", det: [[-1, "x"], [2, 4]], eq: 6, unknowns: { x: -5 } },
        { q: "16.", det: [["2x-10", 2], ["4x+10", 9]], eq: 0, unknowns: { x: 11 } },
        { q: "17.", det: [["-x-8", 7], ["-4x-2", -10]], eq: -1, unknowns: { x: -5 / 2 } },
        { q: "18.", det: [["6-x", 1], [-2, "3-x"]], eq: 0, unknowns: { x: [4, 5] } },
        { q: "19.", det: [["5x-6", "2x"], [-3, "10-4x"]], eq: 0, unknowns: { x: [1, 3] } },
        { q: "20.", det: [["2x+6", "x"], [-5, "-6x-7"]], eq: 0, unknowns: { x: [-2, -7 / 4] } },
      ],
    },
    {
      id: "exer11C-2122", hash: "exer11C-2122", group: "exer11C", title: "練習 11C 第 21–22 題", tag: "展開",
      lead: "展開下列各行列式。",
      tasks: [
        { q: "21.", det: [["\\sin\\theta", "\\cos\\theta", 0], ["-\\cos\\theta", "\\sin\\theta", 2], ["\\sin 2\\theta", "1+\\cos 2\\theta", 1]], text: "1" },
        { q: "22.", det: [[-1, 0, "2\\sin\\theta"], ["\\cos\\theta", 2, 0], [0, "2\\cot\\theta", 1]], text: "2\\cos 2\\theta" },
      ],
    },
    {
      id: "exer11C-2324", hash: "exer11C-2324", group: "exer11C", title: "練習 11C 第 23–24 題", tag: "展開再求解",
      lead: "展開下列行列式，並由此解方程。",
      tasks: [
        { q: "23.（a）展開。", det: [["a", "-b", 1], [0, "c", 0], [-1, 1, -2]], text: "c−2ac" },
        { q: "23.（b）由此解方程，右端等於 25。", det: [[3, "7-x", 1], [0, "x+2", 0], [-1, 1, -2]], eq: 25, unknowns: { x: -7 } },
        { q: "24.（a）展開。", det: [["p", "q", 0], [0, "q", 0], [0, "q", "r"]], text: "pqr" },
        { q: "24.（b）由此解方程，右端等於 x。", det: [["3x+8", "1/7", 0], [0, "1/7", 0], [0, "1/7", "8x+9"]], eq: "x", unknowns: { x: [-2, -3 / 2] } },
      ],
    },
    {
      id: "exer11C-2526", hash: "exer11C-2526", group: "exer11C", title: "練習 11C 第 25–26 題", tag: "程度 2",
      lead: "解下列各方程。",
      tasks: [
        { q: "25.", det: [["1-s^2", "s", "1-s"], [0, 1, 0], ["-s-1", 2, "s-4"]], eq: 0, unknowns: { s: [-1, 1, 3] } },
        { q: "26.", det: [[1, 1, 1], [1, 0, 7], ["t-1", 0, "t^3-1"]], eq: 0, unknowns: { t: [1, 2, -3] },
          steps: ["可沿第 2 列展開。提示：t³−1＝(t−1)(t²＋t＋1)。"] },
      ],
    },
    {
      id: "exer11C-27", hash: "exer11C-27", group: "exer11C", title: "練習 11C 第 27 題", tag: "計算",
      lead: "（a）證明 det(AB)＝(det A)(det B) 的部分留在課堂板書。（b）設 C 如下。已知對所有正整數 n，det(Cⁿ)＝(−2)ⁿ。由此求 det(C⁷)。",
      givenDet: [[0, -1], [-2, 0]],
      tasks: [{ q: "求 det(C⁷)。", answer: -128, steps: ["det C＝−2，故 det(C⁷)＝(−2)⁷＝−128。"] }],
    },
    {
      id: "assess11.3", hash: "assess11.3", group: "assess11.3", title: "階段評估 11.3", tag: "過關",
      lead: "求下列各行列式的值，並解方程。",
      tasks: [
        { q: "1.", det: [[1, 3], [2, 4]], answer: -2 },
        { q: "2.", det: [[5, -2], [-4, 3]], answer: 7 },
        { q: "3.", det: [[2, 0, 0], [2, 3, 0], [-1, 1, 1]], answer: 6 },
        { q: "4.", det: [[2, 3, 2], [-1, 1, 9], [1, 2, 3]], answer: 0 },
        { q: "5.", det: [["x", "2x-1"], [3, 2]], eq: -1, unknowns: { x: 1 } },
        { q: "6.", det: [["x", 3], [1, "2x+1"]], eq: 0, unknowns: { x: [1, -3 / 2] } },
      ],
    },
  ];

  const detState = {
    group: "det",
    item: "det",
    revealed: false,
    n: 3,
    A: [[1, 0, 3], [-1, 2, -3], [-2, -4, 4]],
    pickI: 0,
    pickJ: 0,
    expand: { kind: "row", index: 0 },
  };

  const HASH = {};
  ITEMS.forEach((it) => { HASH[it.hash] = it; HASH[it.id] = it; });
  GROUPS.forEach((g) => { if (!HASH[g.hash]) HASH[g.hash] = { groupOnly: g.id }; });
  HASH["ch11.3"] = { groupOnly: "det" };

  function ui() { return window.LabUI; }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = a % b; a = b; b = t; }
    return a || 1;
  }
  function fmt(v) {
    if (typeof v === "string") return v;
    if (typeof v !== "number" || !Number.isFinite(v)) return String(v);
    if (Math.abs(v - Math.round(v)) < 1e-10) return String(Math.round(v)).replace("-", "−");
    for (const d of [2, 3, 4, 8, 6, 5, 7]) {
      const n = Math.round(v * d);
      if (Math.abs(v * d - n) < 1e-8) {
        const g = gcd(n, d);
        const nn = n / g, dd = d / g;
        if (dd === 1) return String(nn).replace("-", "−");
        const sign = nn < 0 ? "−" : "";
        return sign + "\\dfrac{" + Math.abs(nn) + "}{" + dd + "}";
      }
    }
    return String(v);
  }
  function plainFmt(v) {
    const s = fmt(v);
    return String(s).replace("\\dfrac{", "").replace("}{", "/").replace("}", "").replace("−", "-");
  }
  function vtex(M) {
    return "\\begin{vmatrix}" + M.map((row) => row.map((v) => fmt(v)).join("&")).join("\\\\") + "\\end{vmatrix}";
  }

  function isNumericMatrix(M) {
    return M && M.every((row) => row.every((v) => typeof v === "number"));
  }
  function det2(A) { return A[0][0] * A[1][1] - A[0][1] * A[1][0]; }
  function det3(A) {
    const a = A[0][0], b = A[0][1], c = A[0][2];
    const d = A[1][0], e = A[1][1], f = A[1][2];
    const g = A[2][0], h = A[2][1], i = A[2][2];
    return a * e * i + b * f * g + c * d * h - c * e * g - a * f * h - b * d * i;
  }
  function detOf(A) {
    if (!A || !A.length) return null;
    if (A.length === 1 && A[0].length === 1) return Number(A[0][0]);
    if (A.length === 2 && A[0].length === 2) return det2(A);
    if (A.length === 3 && A[0].length === 3) return det3(A);
    return null;
  }
  function minorMat(A, i, j) {
    return A.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j));
  }
  function cofactorVal(A, i, j) {
    const m = detOf(minorMat(A, i, j));
    return ((i + j) % 2 === 0 ? 1 : -1) * m;
  }

  function detEl(M, opts) {
    const o = opts || {};
    const wrap = document.createElement("div");
    wrap.className = "det";
    wrap.setAttribute("role", "grid");
    const barL = document.createElement("div"); barL.className = "bar"; barL.setAttribute("aria-hidden", "true");
    const barR = document.createElement("div"); barR.className = "bar"; barR.setAttribute("aria-hidden", "true");
    const table = document.createElement("table");
    const tb = document.createElement("tbody");
    const L = ui();
    for (let i = 0; i < M.length; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < M[0].length; j++) {
        const td = document.createElement("td");
        if (o.dimRow === i || o.dimCol === j) td.classList.add("dim");
        if (o.hiRow === i || o.hiCol === j) td.classList.add("hi");
        if (o.pickI === i && o.pickJ === j) td.classList.add("pick");
        if (o.editable) {
          const inp = document.createElement("input");
          inp.className = "entry";
          inp.type = "text";
          inp.value = String(M[i][j]);
          inp.setAttribute("aria-label", "第 " + (i + 1) + " 行第 " + (j + 1) + " 列");
          inp.addEventListener("change", () => {
            const v = Number(String(inp.value).replace("−", "-"));
            M[i][j] = Number.isFinite(v) ? v : 0;
          });
          td.appendChild(inp);
        } else if (o.clickable) {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "cell";
          const ent = document.createElement("span");
          ent.className = "entry";
          if (typeof M[i][j] === "string" && /[\\^_{}]/.test(String(M[i][j]))) {
            b.appendChild(L.texSpan(String(M[i][j])));
          } else {
            b.textContent = String(fmt(M[i][j])).replace("\\dfrac{", "").replace("}{", "/").replace("}", "");
          }
          b.addEventListener("click", () => o.onPick && o.onPick(i, j));
          td.appendChild(b);
        } else {
          const ent = document.createElement("span");
          ent.className = "entry";
          const raw = M[i][j];
          if (typeof raw === "string" && /[\\^_{}]/.test(raw)) ent.appendChild(L.texSpan(raw));
          else ent.appendChild(L.texSpan ? (String(fmt(raw)).indexOf("\\") >= 0 ? L.texSpan(fmt(raw)) : document.createTextNode(String(fmt(raw)).replace("-", "−"))) : document.createTextNode(String(raw)));
          td.appendChild(ent);
        }
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    table.appendChild(tb);
    wrap.appendChild(barL); wrap.appendChild(table); wrap.appendChild(barR);
    return wrap;
  }

  function namedDet(label, M, opts) {
    const L = ui();
    const box = document.createElement("div");
    box.style.display = "inline-flex";
    box.style.alignItems = "center";
    box.style.gap = "8px";
    if (label) {
      const n = document.createElement("span");
      n.style.fontWeight = "700";
      if (/[\\^_{}]/.test(label) || label.indexOf("det") >= 0) n.appendChild(L.texSpan(label));
      else n.textContent = label;
      box.appendChild(n);
    }
    box.appendChild(detEl(M, opts));
    return box;
  }

  function itemsInGroup(gid) { return ITEMS.filter((it) => it.group === gid); }

  function setOrder(n) {
    n = n === 2 ? 2 : 3;
    const src = detState.A;
    const next = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) row.push(src[i] && src[i][j] != null ? src[i][j] : (i === j ? 1 : 0));
      next.push(row);
    }
    detState.n = n;
    detState.A = next;
    detState.pickI = Math.min(detState.pickI, n - 1);
    detState.pickJ = Math.min(detState.pickJ, n - 1);
    detState.expand.index = Math.min(detState.expand.index, n - 1);
    renderDet();
  }

  function renderPlayground(stage) {
    const L = ui();
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "行列式示範";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = "選 2 階或 3 階，填入元素後可看定義求值、子行列式、餘因式，以及沿某一行或某一列的餘因式展式。點選一個元素，會刪去它所在的行和列。非方矩陣的行列式是未定義的；本課程只學 2 階和 3 階。";
    stage.appendChild(title);
    stage.appendChild(lead);

    const ctrls = document.createElement("div");
    ctrls.className = "op-row";
    [[2, "2 階"], [3, "3 階"]].forEach(([n, lab]) => {
      ctrls.appendChild(L.button(lab, "btn" + (detState.n === n ? " btn-primary" : ""), () => setOrder(n)));
    });
    [
      { title: "載入例 11.12（c）", A: [[-3, 2], [-1, 4]] },
      { title: "載入書中 3 階例子", A: [[1, 0, 3], [-1, 2, -3], [-2, -4, 4]] },
      { title: "載入概念測試站 11.2", A: [[9, -1, 8], [6, -2, 7], [-3, 1, -4]] },
    ].forEach((p) => {
      ctrls.appendChild(L.button(p.title, "btn-quiet", () => {
        detState.n = p.A.length;
        detState.A = p.A.map((r) => r.slice());
        detState.pickI = 0; detState.pickJ = 0;
        renderDet();
      }));
    });
    ctrls.appendChild(L.button("更新計算", "btn-primary", () => renderDet()));
    stage.appendChild(ctrls);

    const board = document.createElement("div");
    board.className = "given-row";
    board.appendChild(namedDet("|A|＝", detState.A, {
      editable: true,
      clickable: false,
    }));
    // also clickable overlay? use separate clickable copy after blur — keep editable, plus "選取" buttons around
    stage.appendChild(board);

    const pickRow = document.createElement("div");
    pickRow.className = "op-row";
    pickRow.appendChild(document.createTextNode("選取元素："));
    for (let i = 0; i < detState.n; i++) {
      for (let j = 0; j < detState.n; j++) {
        const lab = "a" + (i + 1) + (j + 1);
        pickRow.appendChild(L.button(lab, "btn" + (detState.pickI === i && detState.pickJ === j ? " btn-primary" : ""), () => {
          detState.pickI = i; detState.pickJ = j;
          renderDet();
        }));
      }
    }
    stage.appendChild(pickRow);

    const A = detState.A;
    const value = detOf(A);
    const valBox = document.createElement("div");
    valBox.className = "panel";
    const vk = document.createElement("p");
    vk.className = "kicker";
    vk.textContent = "用定義求值";
    valBox.appendChild(vk);
    const vp = document.createElement("p");
    vp.style.fontSize = "20px";
    vp.style.fontWeight = "700";
    if (detState.n === 2) {
      vp.appendChild(L.texSpan(
        vtex(A) + "=" + fmt(A[0][0]) + "\\cdot" + fmt(A[1][1]) + "-" + fmt(A[0][1]) + "\\cdot" + fmt(A[1][0]) + "=" + fmt(value)
      ));
    } else {
      vp.appendChild(L.texSpan(vtex(A) + "=" + fmt(value)));
      const hint = document.createElement("p");
      hint.className = "muted";
      hint.textContent = "3 階可用定義 11.7，或把首兩列複製在右側，再沿對角相乘：三條綠色方向相加，三條橙色方向相減。";
      valBox.appendChild(hint);
    }
    valBox.appendChild(vp);
    stage.appendChild(valBox);

    const i = detState.pickI, j = detState.pickJ;
    const Mij = minorMat(A, i, j);
    const sign = (i + j) % 2 === 0 ? 1 : -1;
    const Mval = detOf(Mij);
    const Aval = sign * Mval;
    const minorBox = document.createElement("div");
    minorBox.className = "panel";
    const mk = document.createElement("p");
    mk.className = "kicker";
    mk.textContent = "子行列式和餘因式";
    minorBox.appendChild(mk);
    const md = document.createElement("p");
    md.textContent = "刪去第 " + (i + 1) + " 行和第 " + (j + 1) + " 列（圖 11.1 的正負號格是「＋−＋／−＋−／＋−＋」）。";
    minorBox.appendChild(md);
    const row = document.createElement("div");
    row.className = "given-row";
    row.appendChild(namedDet("", A, { dimRow: i, dimCol: j, pickI: i, pickJ: j }));
    row.appendChild(namedDet("M_{" + (i + 1) + (j + 1) + "}=", Mij));
    minorBox.appendChild(row);
    const mp = document.createElement("p");
    mp.style.fontWeight = "700";
    mp.appendChild(L.texSpan(
      "M_{" + (i + 1) + (j + 1) + "}=" + fmt(Mval) + ",\\quad A_{" + (i + 1) + (j + 1) + "}=(-1)^{" + (i + 1) + "+" + (j + 1) + "}M_{" + (i + 1) + (j + 1) + "}=" + fmt(Aval)
    ));
    minorBox.appendChild(mp);
    stage.appendChild(minorBox);

    const expBox = document.createElement("div");
    expBox.className = "panel";
    const ek = document.createElement("p");
    ek.className = "kicker";
    ek.textContent = "餘因式展式";
    expBox.appendChild(ek);
    const ebtns = document.createElement("div");
    ebtns.className = "op-row";
    for (let r = 0; r < detState.n; r++) {
      ebtns.appendChild(L.button("第 " + (r + 1) + " 行", "btn" + (detState.expand.kind === "row" && detState.expand.index === r ? " btn-primary" : ""), () => {
        detState.expand = { kind: "row", index: r }; renderDet();
      }));
    }
    for (let c = 0; c < detState.n; c++) {
      ebtns.appendChild(L.button("第 " + (c + 1) + " 列", "btn" + (detState.expand.kind === "col" && detState.expand.index === c ? " btn-primary" : ""), () => {
        detState.expand = { kind: "col", index: c }; renderDet();
      }));
    }
    expBox.appendChild(ebtns);
    const k = detState.expand.index;
    const terms = [];
    let sum = 0;
    if (detState.expand.kind === "row") {
      for (let t = 0; t < detState.n; t++) {
        const cof = cofactorVal(A, k, t);
        terms.push(fmt(A[k][t]) + "\\cdot(" + fmt(cof) + ")");
        sum += A[k][t] * cof;
      }
    } else {
      for (let t = 0; t < detState.n; t++) {
        const cof = cofactorVal(A, t, k);
        terms.push(fmt(A[t][k]) + "\\cdot(" + fmt(cof) + ")");
        sum += A[t][k] * cof;
      }
    }
    const ep = document.createElement("p");
    ep.style.fontWeight = "700";
    ep.appendChild(L.texSpan("|A|=" + terms.join("+") + "=" + fmt(sum)));
    expBox.appendChild(ep);
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = "這是定理 11.1：沿第 i 行，|A|＝aᵢ₁Aᵢ₁＋…＋aᵢₙAᵢₙ；沿第 j 列亦然。";
    expBox.appendChild(note);
    stage.appendChild(expBox);
  }

  function renderUnknowns(L, obj) {
    const p = document.createElement("p");
    p.style.fontWeight = "700";
    const keys = Object.keys(obj);
    keys.forEach((k, idx) => {
      let v = obj[k];
      if (Array.isArray(v)) {
        const parts = v.map((x) => k + "=" + fmt(x));
        p.appendChild(L.texSpan(parts.join("\\text{ 或 }")));
      } else {
        p.appendChild(L.texSpan(k + "=" + fmt(v)));
      }
      if (idx < keys.length - 1) p.appendChild(document.createTextNode("，"));
    });
    p.appendChild(document.createTextNode("。"));
    return p;
  }

  function renderItem(stage, item) {
    const L = ui();
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = item.title;
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = item.lead;
    stage.appendChild(title);
    stage.appendChild(lead);
    if (item.givenDet) {
      const row = document.createElement("div");
      row.className = "given-row";
      row.appendChild(namedDet("", item.givenDet));
      stage.appendChild(row);
    }

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(L.button(detState.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
      detState.revealed = !detState.revealed;
      renderDet();
    }));
    const numeric = item.givenDet && isNumericMatrix(item.givenDet) ? item.givenDet
      : (item.tasks && item.tasks[0] && item.tasks[0].det && isNumericMatrix(item.tasks[0].det) ? item.tasks[0].det : null);
    if (numeric) {
      actions.appendChild(L.button("載入到行列式示範", "btn-quiet", () => {
        detState.n = numeric.length;
        detState.A = numeric.map((r) => r.slice());
        detState.group = "det";
        detState.item = "det";
        detState.pickI = 0; detState.pickJ = 0;
        sync();
        renderDet();
      }));
    }
    stage.appendChild(actions);

    if (!detState.revealed) {
      item.tasks.forEach((t) => {
        const box = document.createElement("div");
        box.className = "task";
        const h = document.createElement("h3");
        h.style.fontSize = "16px";
        h.textContent = t.q;
        box.appendChild(h);
        if (t.det) box.appendChild(namedDet(t.eq != null ? "" : "", t.det));
        if (t.eq != null) {
          const p = document.createElement("p");
          p.appendChild(document.createTextNode("  ＝ "));
          p.insertBefore(namedDet("", t.det), p.firstChild);
          const right = document.createElement("span");
          right.style.fontWeight = "700";
          right.appendChild(L.texSpan("=" + (typeof t.eq === "string" ? t.eq : fmt(t.eq))));
          p.appendChild(right);
          box.appendChild(p);
        }
        stage.appendChild(box);
      });
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "先讓學生動手算，再揭曉答案。";
      stage.appendChild(p);
      return;
    }

    item.tasks.forEach((t) => {
      const box = document.createElement("div");
      box.className = "feedback ok task";
      const h = document.createElement("h3");
      h.textContent = t.q;
      box.appendChild(h);
      if (t.det) box.appendChild(namedDet("", t.det));
      if (t.eq != null) {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode("方程：行列式等於 " + (typeof t.eq === "string" ? t.eq : String(t.eq).replace("-", "−")) + "。"));
        box.appendChild(p);
      }
      if (t.showMinor) {
        const lab = t.minor ? "M_{" + (t.minor[0] + 1) + (t.minor[1] + 1) + "}="
          : t.cofactor ? "A_{" + (t.cofactor[0] + 1) + (t.cofactor[1] + 1) + "}="
          : "";
        box.appendChild(namedDet(lab, t.showMinor));
      }
      if (t.pair) {
        t.pair.forEach((p) => {
          const lab = p.kind + "_{" + (p.ij[0] + 1) + (p.ij[1] + 1) + "}=";
          const line = document.createElement("p");
          line.style.fontWeight = "700";
          line.appendChild(L.texSpan(lab + fmt(p.answer)));
          box.appendChild(line);
          if (p.showMinor) box.appendChild(namedDet("", p.showMinor));
        });
      }
      if (t.unknowns) box.appendChild(renderUnknowns(L, t.unknowns));
      else if (t.text) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        if (/[\\^_{}]/.test(t.text) || /det|cos|sin|abc/.test(t.text)) p.appendChild(L.texSpan(t.text.replace("−", "-").replace("＋", "+") === t.text ? t.text : t.text));
        // always typeset if it looks like math words
        p.textContent = "";
        p.appendChild(L.texSpan(String(t.text).replace("−", "-").replace("＋", "+") ? texifyText(t.text) : t.text));
        box.appendChild(p);
      } else if (typeof t.answer === "number") {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        const lab = t.minor ? "M_{" + (t.minor[0] + 1) + (t.minor[1] + 1) + "}="
          : t.cofactor ? "A_{" + (t.cofactor[0] + 1) + (t.cofactor[1] + 1) + "}="
          : (t.det ? vtex(t.det) + "=" : "");
        p.appendChild(L.texSpan(lab + fmt(t.answer)));
        box.appendChild(p);
      }
      if (t.steps) {
        const ul = document.createElement("ul");
        t.steps.forEach((s) => {
          const li = document.createElement("li");
          li.textContent = s;
          ul.appendChild(li);
        });
        box.appendChild(ul);
      }
      stage.appendChild(box);
    });
  }

  function texifyText(s) {
    return String(s)
      .replace(/det /g, "\\det ")
      .replace(/＋/g, "+")
      .replace(/−/g, "-");
  }

  function renderGroupBar() {
    const L = ui();
    const host = L.els.items;
    host.innerHTML = "";
    const list = detState.group === "det" ? [] : itemsInGroup(detState.group);
    list.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", it.id === detState.item ? "true" : "false");
      b.innerHTML = it.title + (it.tag ? '<span class="tag">' + it.tag + "</span>" : "");
      b.addEventListener("click", () => {
        detState.item = it.id;
        detState.revealed = false;
        sync();
        renderDet();
      });
      host.appendChild(b);
    });
  }

  function renderDet() {
    const L = ui();
    document.getElementById("modes-111").hidden = true;
    document.getElementById("modes-112").hidden = true;
    document.getElementById("modes-113").hidden = false;
    const m114 = document.getElementById("modes-114");
    if (m114) m114.hidden = true;
    const m115 = document.getElementById("modes-115");
    if (m115) m115.hidden = true;
    document.getElementById("notes-111").hidden = true;
    document.getElementById("notes-112").hidden = true;
    document.getElementById("notes-113").hidden = false;
    const n114 = document.getElementById("notes-114");
    if (n114) n114.hidden = true;
    const n115 = document.getElementById("notes-115");
    if (n115) n115.hidden = true;
    document.getElementById("brand-sub").textContent = "馬Sir教室 · 中五 M2 · §11.3 行列式";
    document.querySelectorAll("#chapters [data-chapter]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-chapter") === "11.3" ? "true" : "false");
    });
    document.querySelectorAll("#modes-113 [data-det]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-det") === detState.group ? "true" : "false");
    });
    L.els.notes.hidden = !L.state.notesOpen;
    L.els.notesBtn.setAttribute("aria-pressed", L.state.notesOpen ? "true" : "false");
    renderGroupBar();
    const stage = L.els.stage;
    stage.innerHTML = "";
    if (detState.group === "det" || detState.item === "det") renderPlayground(stage);
    else {
      const item = ITEMS.find((it) => it.id === detState.item) || itemsInGroup(detState.group)[0];
      if (item) renderItem(stage, item);
    }
    L.typeset(document);
  }

  function sync() {
    let h = "det";
    if (detState.item && detState.item !== "det") {
      const it = ITEMS.find((x) => x.id === detState.item);
      h = (it && it.hash) || detState.group;
    } else {
      h = detState.group === "det" ? "det" : detState.group;
    }
    if (location.hash.replace(/^#/, "") !== h) history.replaceState(null, "", "#" + h);
  }

  function hasHash(raw) {
    if (!raw) return false;
    if (raw === "ch11.3" || raw === "det" || raw === "det2" || raw === "det3" || raw === "minor" || raw === "expand" || raw === "exer11C" || raw === "assess11.3") return true;
    return !!HASH[raw];
  }

  function apply(raw) {
    if (!raw || raw === "ch11.3" || raw === "det") {
      detState.group = "det";
      detState.item = "det";
      return;
    }
    if (GROUPS.some((g) => g.id === raw)) {
      detState.group = raw;
      const list = itemsInGroup(raw);
      detState.item = list.length ? list[0].id : "det";
      detState.revealed = false;
      return;
    }
    const it = HASH[raw];
    if (it && it.group) {
      detState.group = it.group;
      detState.item = it.id;
      detState.revealed = false;
    } else if (it && it.groupOnly) {
      detState.group = it.groupOnly;
      const list = itemsInGroup(it.groupOnly);
      detState.item = list.length ? list[0].id : it.groupOnly;
      detState.revealed = false;
    }
  }

  function bind() {
    document.querySelectorAll("#modes-113 [data-det]").forEach((b) => {
      b.addEventListener("click", () => {
        const g = b.getAttribute("data-det");
        detState.group = g;
        detState.revealed = false;
        if (g === "det") detState.item = "det";
        else {
          const list = itemsInGroup(g);
          detState.item = list[0] ? list[0].id : g;
        }
        sync();
        renderDet();
      });
    });
  }

  window.LabDet = {
    hasHash, apply, render: renderDet, bind, ITEMS, det2, det3, detOf, minorMat, cofactorVal,
  };
})();
