/* 矩陣入門實驗室 — 馬Sir教室 · 中五 M2 · 第 11 章 */
(function () {
  "use strict";

  const LABELS = [
    { key: "row", name: "行矩陣" },
    { key: "col", name: "列矩陣" },
    { key: "zero", name: "零矩陣" },
    { key: "square", name: "n 階方矩陣" },
    { key: "diag", name: "對角矩陣" },
    { key: "identity", name: "單位矩陣" },
  ];

  const READ_ITEMS = [
    { id: "intro", hash: "intro", title: "引入例子", tag: "價目表" },
    { id: "explore", hash: "read", title: "調階探索", tag: "可改階" },
    { id: "check11.1", hash: "check11.1", title: "概念測試站 11.1", tag: "讀階與元素" },
    { id: "contrast", hash: "contrast", title: "2×3 與 3×2", tag: "不同階" },
    { id: "practice-1", hash: "practice-1", title: "自擬 1", tag: "自擬" },
  ];

  const IDENTIFY_ITEMS = [
    { id: "row-1", hash: "row-1", title: "行矩陣 (0 1)" },
    { id: "row-2", hash: "row-2", title: "行矩陣 (4 −1 5)" },
    { id: "col-1", hash: "col-1", title: "列矩陣（含分數）" },
    { id: "col-2", hash: "col-2", title: "列矩陣 (3 0 0)ᵀ" },
    { id: "zero-2", hash: "zero-2", title: "零矩陣 0₂ₓ₂" },
    { id: "zero-3", hash: "zero-3", title: "零矩陣 0₃ₓ₂" },
    { id: "square-3", hash: "square-3", title: "3 階方矩陣 A" },
    { id: "diag-2", hash: "diag-2", title: "對角矩陣 2×2" },
    { id: "diag-3", hash: "diag-3", title: "對角矩陣 3×3" },
    { id: "I1", hash: "I1", title: "單位矩陣 I₁" },
    { id: "I2", hash: "I2", title: "單位矩陣 I₂" },
    { id: "I3", hash: "I3", title: "單位矩陣 I₃" },
    { id: "ones", hash: "ones", title: "全部是 1 的方矩陣", tag: "常見誤會（自擬）" },
    { id: "practice-2", hash: "practice-2", title: "自擬 2", tag: "自擬判斷" },
  ];

  const EQUAL_ITEMS = [
    { id: "equal-a", hash: "equal-a", title: "對照（a）", tag: "相等" },
    { id: "equal-b", hash: "equal-b", title: "對照（b）", tag: "階不同" },
    { id: "equal-c", hash: "equal-c", title: "對照（c）", tag: "對應元素不同" },
    { id: "ex11.1", hash: "ex11.1", title: "例 11.1", tag: "示範題" },
    { id: "qp11.1", hash: "qp11.1", title: "課堂練習 11.1", tag: "過關" },
    { id: "extra11.1", hash: "extra11.1", title: "附加例題 11.1", tag: "挑戰" },
    { id: "practice-3", hash: "practice-3", title: "自擬 3", tag: "自擬" },
  ];

  const IDENTIFY_DATA = {
    "row-1": {
      name: "A",
      matrix: [["0", "1"]],
      note: "只有一行的矩陣稱為行矩陣。",
    },
    "row-2": {
      name: "A",
      matrix: [["4", "-1", "5"]],
      note: "只有一行的矩陣稱為行矩陣。",
    },
    "col-1": {
      name: "A",
      matrix: [["1"], ["\\dfrac{1}{2}"], ["-1"]],
      note: "只有一列的矩陣稱為列矩陣。",
    },
    "col-2": {
      name: "A",
      matrix: [["3"], ["0"], ["0"]],
      note: "只有一列的矩陣稱為列矩陣。",
    },
    "zero-2": {
      name: "0_{2\\times 2}",
      matrix: [["0", "0"], ["0", "0"]],
      note: "零矩陣是一個所有元素均是零的矩陣。一個 m×n 零矩陣記作 0_{m\\times n}，可簡寫為 0。",
    },
    "zero-3": {
      name: "0_{3\\times 2}",
      matrix: [["0", "0"], ["0", "0"], ["0", "0"]],
      note: "零矩陣是一個所有元素均是零的矩陣。注意 0_{3\\times 2} 與 0_{2\\times 2} 的階不同。",
    },
    "square-3": {
      name: "A",
      matrix: [["-1", "0", "2"], ["3", "5", "1"], ["1", "2", "4"]],
      highlightDiag: true,
      note: "行數和列數均等於 n 的矩陣稱為 n 階方矩陣。元素 a_{11},\\,a_{22},\\,\\ldots,\\,a_{nn} 稱為主對角線元素。這裏 −1、5 和 4 是主對角線元素。此例不是對角矩陣。",
    },
    "diag-2": {
      name: "A",
      matrix: [["2", "0"], ["0", "-1"]],
      highlightDiag: true,
      note: "對角矩陣是所有非主對角線元素均等於零的方矩陣。對角元素可以不相同，也不必等於 1。",
    },
    "diag-3": {
      name: "A",
      matrix: [["1", "0", "0"], ["0", "2", "0"], ["0", "0", "-3"]],
      highlightDiag: true,
      note: "對角矩陣是所有非主對角線元素均等於零的方矩陣。對角元素是 1、2、−3，可以不相同，也不必全部為 1，因此不是單位矩陣。",
    },
    I1: {
      name: "I_1",
      matrix: [["1"]],
      highlightDiag: true,
      note: "單位矩陣是主對角線元素均是 1 的對角矩陣。一個 n×n 單位矩陣記作 I_n，可簡寫為 I。I_1=(1)。1×1 矩陣既是行矩陣，也是列矩陣。",
    },
    I2: {
      name: "I_2",
      matrix: [["1", "0"], ["0", "1"]],
      highlightDiag: true,
      note: "單位矩陣是主對角線元素均是 1 的對角矩陣。",
    },
    I3: {
      name: "I_3",
      matrix: [["1", "0", "0"], ["0", "1", "0"], ["0", "0", "1"]],
      highlightDiag: true,
      note: "單位矩陣是主對角線元素均是 1 的對角矩陣。",
    },
    ones: {
      name: "A",
      homemade: true,
      matrix: [["1", "1"], ["1", "1"]],
      note: "這是自擬的常見誤會例子，不是課本題圖。全部是 1 的方矩陣不是單位矩陣。",
    },
  };

  const EQUAL_DATA = {
    "equal-a": {
      title: "對照（a）：相等",
      lead: "比較下面兩個矩陣，判斷它們是否相等，並說明理由。",
      A: { name: "A", matrix: [["1", "0"], ["3", "2"]] },
      B: { name: "B", matrix: [["1", "0"], ["3", "2"]] },
      equal: true,
      reason: "它們的階都是 2×2，而且每一個對應元素都相同，所以 A＝B。",
    },
    "equal-b": {
      title: "對照（b）：階不同",
      lead: "比較下面兩個矩陣，判斷它們是否相等，並說明理由。",
      A: { name: "A", matrix: [["0"], ["0"], ["0"]] },
      B: { name: "B", matrix: [["0", "0", "0"]] },
      equal: false,
      reason: "A 的階是 3×1，而 B 的階是 1×3。階不同，即使「看起來都是三個零」，一個是列矩陣，一個是行矩陣，兩個矩陣不相等。",
    },
    "equal-c": {
      title: "對照（c）：對應元素不盡相同",
      lead: "比較下面兩個矩陣，判斷它們是否相等，並說明理由。注意這兩個都是 1×2 行矩陣，比較的是 a₁₁ 與 b₁₁、a₁₂ 與 b₁₂，不是 a₂₁。",
      A: { name: "A", matrix: [["0", "1"]] },
      B: { name: "B", matrix: [["1", "0"]] },
      equal: false,
      reason: "它們的階都是 1×2，但對應元素不盡相同：a_{11}=0\\neq b_{11}=1，而且 a_{12}=1\\neq b_{12}=0，所以 A 與 B 不相等。",
    },
    "ex11.1": {
      title: "例 11.1",
      lead: "已知矩陣 A 及 B 如下。若 A＝B，求 a、b、c 和 d 的值。",
      A: { name: "A", matrix: [["a", "0", "-1"], ["b", "2", "7-d"]] },
      B: { name: "B", matrix: [["-4", "1+c", "-1"], ["3c+4", "2", "2d+1"]] },
      unknowns: ["a", "b", "c", "d"],
      answers: { a: -4, b: 1, c: -1, d: 2 },
      equations: [
        { tex: "a=-4", kind: "solve" },
        { tex: "0=1+c", kind: "solve" },
        { tex: "-1=-1", kind: "check" },
        { tex: "b=3c+4", kind: "solve" },
        { tex: "2=2", kind: "check" },
        { tex: "7-d=2d+1", kind: "solve" },
      ],
      solution: [
        "先核對階：兩邊都是 2×3，可以談相等。根據矩陣相等的定義，對應元素分別相等。",
        "列出全部方程：a＝−4，0＝1＋c，−1＝−1（核對），b＝3c＋4，2＝2（核對），7−d＝2d＋1。",
        "先解最簡單的一條：由 0＝1＋c，得 c＝−1。",
        "把 c＝−1 代入 b＝3c＋4，得 b＝3(−1)＋4＝1。",
        "由 7−d＝2d＋1，得 7−1＝3d，6＝3d，d＝2。又 a＝−4。",
        "核對：−1＝−1，2＝2，兩邊吻合。",
        "所以 a＝−4，b＝1，c＝−1，d＝2。",
      ],
    },
    "qp11.1": {
      title: "課堂練習 11.1",
      gate: true,
      lead: "已知矩陣 C 及 D 如下。若 C＝D，求 w、x、y 和 z 的值。",
      A: { name: "C", matrix: [["7z+3", "8"], ["-3", "2y"], ["3-x", "2"]] },
      B: { name: "D", matrix: [["3z-9", "w"], ["-3", "5x-8"], ["9", "2"]] },
      unknowns: ["w", "x", "y", "z"],
      answers: { w: 8, x: -6, y: -19, z: -3 },
      equations: [
        { tex: "7z+3=3z-9", kind: "solve" },
        { tex: "8=w", kind: "solve" },
        { tex: "-3=-3", kind: "check" },
        { tex: "2y=5x-8", kind: "solve" },
        { tex: "3-x=9", kind: "solve" },
        { tex: "2=2", kind: "check" },
      ],
      solution: [
        "先核對階：兩邊都是 3×2，可以談相等。",
        "列出全部方程：7z＋3＝3z−9，8＝w，−3＝−3（核對），2y＝5x−8，3−x＝9，2＝2（核對）。",
        "由 8＝w，得 w＝8。",
        "由 3−x＝9，得 −x＝6，x＝−6。",
        "由 7z＋3＝3z−9，得 4z＝−12，z＝−3。",
        "把 x＝−6 代入 2y＝5x−8，得 2y＝5(−6)−8＝−30−8＝−38，故 y＝−19。",
        "核對：−3＝−3，2＝2，兩邊吻合。",
        "所以 w＝8，x＝−6，y＝−19，z＝−3。",
      ],
    },
    "extra11.1": {
      title: "附加例題 11.1",
      lead: "已知矩陣 A 及 B 如下。若 A＝B，求 w、x、y 和 z 的值。",
      A: { name: "A", matrix: [["5y", "4x-1", "5"], ["6", "3x+y", "x-4y"]] },
      B: { name: "B", matrix: [["15", "2x-5", "w"], ["6", "-y", "z"]] },
      unknowns: ["w", "x", "y", "z"],
      answers: { w: 5, x: -2, y: 3, z: -14 },
      equations: [
        { tex: "5y=15", kind: "solve" },
        { tex: "4x-1=2x-5", kind: "solve" },
        { tex: "5=w", kind: "solve" },
        { tex: "6=6", kind: "check" },
        { tex: "3x+y=-y", kind: "check" },
        { tex: "x-4y=z", kind: "solve" },
      ],
      solution: [
        "先核對階：兩邊都是 2×3，可以談相等。",
        "列出全部方程：5y＝15，4x−1＝2x−5，5＝w，6＝6（核對），3x＋y＝−y（核對），z＝x−4y。",
        "由 5y＝15，得 y＝3。",
        "由 4x−1＝2x−5，得 2x＝−4，x＝−2。",
        "由 5＝w，得 w＝5。",
        "核對 3x＋y＝−y：3(−2)＋3＝−6＋3＝−3，而 −y＝−3，兩邊一致。",
        "最後 z＝x−4y＝−2−4(3)＝−14。",
        "所以 w＝5，x＝−2，y＝3，z＝−14。",
      ],
    },
    "practice-3": {
      title: "自擬 3",
      homemade: true,
      lead: "這是自擬題，不是課本題。已知矩陣 P 及 Q 如下。若 P＝Q，求 x 和 y 的值。",
      A: { name: "P", matrix: [["x+1", "2"], ["-3", "y"]] },
      B: { name: "Q", matrix: [["4", "2"], ["-3", "1-x"]] },
      unknowns: ["x", "y"],
      answers: { x: 3, y: -2 },
      equations: [
        { tex: "x+1=4", kind: "solve" },
        { tex: "2=2", kind: "check" },
        { tex: "-3=-3", kind: "check" },
        { tex: "y=1-x", kind: "solve" },
      ],
      solution: [
        "先核對階：兩邊都是 2×2，可以談相等。",
        "列出全部方程：x＋1＝4，2＝2（核對），−3＝−3（核對），y＝1−x。",
        "由 x＋1＝4，得 x＝3。",
        "代入 y＝1−x，得 y＝1−3＝−2。",
        "所以 x＝3，y＝−2。",
      ],
    },
  };

  const BOOK_2X3 = [["2", "3", "0"], ["1", "0", "-5"]];
  const CONTRAST_3X2 = [["2", "1"], ["3", "0"], ["0", "-5"]];
  const CHECK_A = [["5", "7"], ["-2", "0"], ["3", "1"]];
  const INTRO = [["15", "16", "14"], ["5", "4", "6"]];

  const state = {
    chapter: "11.1",
    mode: "read",
    item: "intro",
    rows: 2,
    cols: 3,
    values: cloneMatrix(INTRO),
    hiRow: null,
    hiCol: null,
    notesOpen: false,
    picked: {},
    identified: false,
    judge: null,
    revealed: false,
    student: {},
    tf: {},
  };

  const els = {
    items: document.getElementById("items"),
    stage: document.getElementById("stage"),
    notes: document.getElementById("notes"),
    notesBtn: document.getElementById("notes-btn"),
  };

  function cloneMatrix(m) {
    return m.map((row) => row.slice());
  }

  function orderOf(m) {
    return { r: m.length, c: m[0].length };
  }

  function fmtOrder(r, c) {
    return r + "×" + c;
  }

  function classify(matrix) {
    const r = matrix.length;
    const c = matrix[0].length;
    const num = (v) => {
      if (v === "\\dfrac{1}{2}" || v === "1/2") return 0.5;
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
    return {
      row: isRow,
      col: isCol,
      zero: isZero,
      square: isSquare,
      diag: isDiag,
      identity: isIdentity,
      n: isSquare ? r : null,
    };
  }

  function typeset(root) {
    if (!window.katex) return;
    root.querySelectorAll("[data-tex]").forEach((el) => {
      try {
        window.katex.render(el.getAttribute("data-tex"), el, {
          throwOnError: false,
          displayMode: el.getAttribute("data-display") === "1",
        });
      } catch (err) {
        el.textContent = el.getAttribute("data-tex");
      }
    });
  }

  function texSpan(tex, display) {
    const s = document.createElement("span");
    s.setAttribute("data-tex", tex);
    if (display) s.setAttribute("data-display", "1");
    return s;
  }

  function entryText(v) {
    const s = String(v);
    if (/[\\^_{}]/.test(s) || /dfrac|frac/.test(s)) return null;
    return s.replace(/-/g, "−");
  }

  function renderEntry(node, v) {
    const plain = entryText(v);
    if (plain !== null) {
      node.textContent = plain;
      return;
    }
    node.textContent = "";
    node.appendChild(texSpan(String(v)));
  }

  function aijTex(i, j) {
    return "a_{" + (i + 1) + (j + 1) + "}";
  }

  function buildMatrix(matrix, opts) {
    const options = opts || {};
    const r = matrix.length;
    const c = matrix[0].length;
    const wrap = document.createElement("div");
    wrap.className = "mtx-wrap";

    if (options.nameTex) {
      const name = document.createElement("div");
      name.className = "mtx-name-cell";
      name.appendChild(texSpan(options.nameTex + "="));
      wrap.appendChild(name);
    }

    if (options.axis) {
      const colRow = document.createElement("div");
      colRow.className = "col-head-row";
      for (let j = 0; j < c; j++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "axis-btn";
        b.textContent = "第 " + (j + 1) + " 列";
        b.setAttribute("aria-pressed", state.hiCol === j ? "true" : "false");
        b.addEventListener("click", () => {
          state.hiCol = state.hiCol === j ? null : j;
          render();
        });
        colRow.appendChild(b);
      }
      wrap.appendChild(colRow);

      const rowHeads = document.createElement("div");
      rowHeads.className = "row-heads";
      for (let i = 0; i < r; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "axis-btn";
        b.textContent = "第 " + (i + 1) + " 行";
        b.setAttribute("aria-pressed", state.hiRow === i ? "true" : "false");
        b.addEventListener("click", () => {
          state.hiRow = state.hiRow === i ? null : i;
          render();
        });
        rowHeads.appendChild(b);
      }
      wrap.appendChild(rowHeads);
    }

    if (!options.axis) {
      wrap.classList.add(options.nameTex ? "named-only" : "plain");
    }

    const mtx = document.createElement("div");
    mtx.className = "mtx" + (r === 1 && c === 1 ? " one" : "");
    mtx.setAttribute("role", "grid");
    mtx.setAttribute("aria-label", (options.namePlain || "矩陣") + "，" + fmtOrder(r, c));

    const brL = document.createElement("div");
    brL.className = "br br-l";
    brL.setAttribute("aria-hidden", "true");
    const brR = document.createElement("div");
    brR.className = "br br-r";
    brR.setAttribute("aria-hidden", "true");
    const table = document.createElement("table");
    const tb = document.createElement("tbody");

    for (let i = 0; i < r; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < c; j++) {
        const td = document.createElement("td");
        const hiR = options.axis && state.hiRow === i;
        const hiC = options.axis && state.hiCol === j;
        if (hiR && hiC) td.classList.add("hi-both");
        else if (hiR || hiC) td.classList.add("hi");
        if (options.highlightDiag && i === j && r === c) td.classList.add("diag");

        if (options.showSub) {
          const sub = document.createElement("span");
          sub.className = "sub";
          sub.appendChild(texSpan(aijTex(i, j)));
          td.appendChild(sub);
        }

        if (options.editable) {
          const inp = document.createElement("input");
          inp.className = "entry";
          inp.type = "text";
          inp.value = String(matrix[i][j]).replace("−", "-");
          inp.setAttribute("aria-label", "第 " + (i + 1) + " 行第 " + (j + 1) + " 列的元素");
          inp.addEventListener("change", () => {
            state.values[i][j] = inp.value.trim() === "" ? "0" : inp.value.trim();
          });
          inp.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") inp.blur();
          });
          td.appendChild(inp);
        } else {
          const ent = document.createElement("span");
          ent.className = "entry";
          renderEntry(ent, matrix[i][j]);
          td.appendChild(ent);
        }
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    table.appendChild(tb);
    mtx.appendChild(brL);
    mtx.appendChild(table);
    mtx.appendChild(brR);
    wrap.appendChild(mtx);
    return wrap;
  }

  function namedMatrix(spec, opts) {
    const options = Object.assign({ namePlain: spec.name, nameTex: spec.name }, opts || {});
    const wrap = buildMatrix(spec.matrix, options);
    return wrap;
  }

  function resizeValues(r, c) {
    const next = [];
    for (let i = 0; i < r; i++) {
      const row = [];
      for (let j = 0; j < c; j++) {
        row.push(state.values[i] && state.values[i][j] != null ? state.values[i][j] : "0");
      }
      next.push(row);
    }
    state.values = next;
    state.rows = r;
    state.cols = c;
    if (state.hiRow != null && state.hiRow >= r) state.hiRow = null;
    if (state.hiCol != null && state.hiCol >= c) state.hiCol = null;
  }

  function loadExplore(matrix) {
    state.values = cloneMatrix(matrix);
    state.rows = matrix.length;
    state.cols = matrix[0].length;
    state.hiRow = null;
    state.hiCol = null;
  }

  function currentItems() {
    if (state.mode === "read") return READ_ITEMS;
    if (state.mode === "identify") return IDENTIFY_ITEMS;
    return EQUAL_ITEMS;
  }

  function show11_1Chrome() {
    const m111 = document.getElementById("modes-111");
    const m112 = document.getElementById("modes-112");
    const m113 = document.getElementById("modes-113");
    if (m111) m111.hidden = false;
    if (m112) m112.hidden = true;
    if (m113) m113.hidden = true;
    const n1 = document.getElementById("notes-111");
    const n2 = document.getElementById("notes-112");
    const n3 = document.getElementById("notes-113");
    if (n1) n1.hidden = false;
    if (n2) n2.hidden = true;
    if (n3) n3.hidden = true;
    const sub = document.getElementById("brand-sub");
    if (sub) sub.textContent = "馬Sir教室 · 中五 M2 · §11.1 矩陣";
    document.querySelectorAll("#chapters [data-chapter]").forEach((btn) => {
      btn.setAttribute("aria-selected", btn.getAttribute("data-chapter") === "11.1" ? "true" : "false");
    });
  }

  function enter11_1() {
    state.chapter = "11.1";
    show11_1Chrome();
    setMode("read", "intro");
  }

  function setMode(mode, item, fromHash) {
    if (state.mode !== mode) {
      state.mode = mode;
      state.picked = {};
      state.identified = false;
      state.judge = null;
      state.revealed = false;
      state.student = {};
      state.tf = {};
      state.checkMsg = null;
      state.hiRow = null;
      state.hiCol = null;
    }
    const items = currentItems();
    const found = items.find((it) => it.id === item) || items[0];
    state.item = found.id;
    if (mode === "read") {
      if (found.id === "intro") loadExplore(INTRO);
      else if (found.id === "check11.1") loadExplore(CHECK_A);
      else if (found.id === "contrast") loadExplore(BOOK_2X3);
      else if (found.id === "practice-1") {
        /* keep or reset */
      } else if (found.id === "explore" && state.values.length === 0) {
        loadExplore(INTRO);
      }
    }
    if (!fromHash) syncHash();
    render();
  }

  function hashFor() {
    const items = currentItems();
    const it = items.find((x) => x.id === state.item);
    if (it && it.hash && it.hash !== state.mode) return it.hash;
    return state.mode;
  }

  function syncHash() {
    const h = hashFor();
    if (location.hash.replace(/^#/, "") !== h) {
      history.replaceState(null, "", "#" + h);
    }
  }

  function applyHash() {
    const raw = (location.hash || "").replace(/^#/, "");
    if (raw === "ch11.1") {
      state.chapter = "11.1";
      show11_1Chrome();
      setMode("read", "intro", true);
      return;
    }
    if (window.LabDet && window.LabDet.hasHash(raw)) {
      state.chapter = "11.3";
      window.LabDet.apply(raw);
      window.LabDet.render();
      return;
    }
    if (window.LabOps && window.LabOps.hasHash(raw)) {
      state.chapter = "11.2";
      window.LabOps.apply(raw);
      window.LabOps.render();
      return;
    }
    state.chapter = "11.1";
    show11_1Chrome();
    if (!raw) {
      setMode("read", "intro", true);
      return;
    }
    const maps = [
      ["read", READ_ITEMS],
      ["identify", IDENTIFY_ITEMS],
      ["equal", EQUAL_ITEMS],
    ];
    if (raw === "read" || raw === "identify" || raw === "equal") {
      const items = currentItemsFor(raw);
      setMode(raw, items[0].id, true);
      return;
    }
    for (const [mode, items] of maps) {
      const it = items.find((x) => x.hash === raw || x.id === raw);
      if (it) {
        setMode(mode, it.id, true);
        return;
      }
    }
    setMode("read", "intro", true);
  }

  function currentItemsFor(mode) {
    if (mode === "read") return READ_ITEMS;
    if (mode === "identify") return IDENTIFY_ITEMS;
    return EQUAL_ITEMS;
  }

  function renderItems() {
    const items = currentItems();
    els.items.innerHTML = "";
    items.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", it.id === state.item ? "true" : "false");
      b.innerHTML = it.title + (it.tag ? '<span class="tag">' + it.tag + "</span>" : "");
      b.addEventListener("click", () => {
        state.picked = {};
        state.identified = false;
        state.judge = null;
        state.revealed = false;
        state.student = {};
        state.tf = {};
        state.checkMsg = null;
        if (state.mode === "read") {
          if (it.id === "intro") loadExplore(INTRO);
          else if (it.id === "check11.1") loadExplore(CHECK_A);
          else if (it.id === "contrast") loadExplore(BOOK_2X3);
        }
        setMode(state.mode, it.id);
      });
      els.items.appendChild(b);
    });
  }

  function orderLine(r, c, extra) {
    const p = document.createElement("p");
    p.className = "order-line";
    p.innerHTML =
      "此為 " +
      fmtOrder(r, c) +
      " 矩陣" +
      '<span class="also">（也可讀作 ' +
      r +
      " 行 " +
      c +
      " 列矩陣）</span>" +
      (extra || "");
    return p;
  }

  function renderRead() {
    const stage = els.stage;
    stage.innerHTML = "";
    const title = document.createElement("p");
    title.className = "kicker";
    const lead = document.createElement("p");
    lead.className = "lead";

    if (state.item === "intro") {
      title.textContent = "引入例子：三間商店的貨價";
      lead.textContent =
        "現實生活中，我們可用實數組成的長方形陣列去記錄和處理資料。下表列出了每件貨物 X 和 Y 在商店 A、B 和 C 的價錢。";
      stage.appendChild(title);
      stage.appendChild(lead);
      const table = document.createElement("table");
      table.className = "price";
      table.innerHTML =
        "<thead><tr><th></th><th>商店 A</th><th>商店 B</th><th>商店 C</th></tr></thead>" +
        "<tbody>" +
        "<tr><td>每件貨物 X 的價錢 ($)</td><td>15</td><td>16</td><td>14</td></tr>" +
        "<tr><td>每件貨物 Y 的價錢 ($)</td><td>5</td><td>4</td><td>6</td></tr>" +
        "</tbody>";
      stage.appendChild(table);
      const p = document.createElement("p");
      p.className = "body";
      p.textContent = "把以上數據按其位置寫成一個陣列，放在一對括號中，這種陣列稱為矩陣。點第 i 行或第 j 列，可高亮該行或該列。";
      stage.appendChild(p);
      stage.appendChild(namedMatrix({ name: "", matrix: state.values }, { axis: true, showSub: true, editable: false }));
      stage.appendChild(orderLine(2, 3));
      return;
    }

    if (state.item === "explore") {
      title.textContent = "調階探索";
      lead.textContent =
        "自行設定行數和列數（含 1×n 行矩陣與 m×1 列矩陣）。格內顯示 aij 下標，元素可改。點第 i 行或第 j 列會高亮。";
      stage.appendChild(title);
      stage.appendChild(lead);
      stage.appendChild(stepperBar());
      stage.appendChild(buildMatrix(state.values, { axis: true, showSub: true, editable: true }));
      const extra =
        state.rows === 1 && state.cols === 1
          ? '<span class="also">。1×1 矩陣寫成 (α)，不要寫成不帶括號的純量。</span>'
          : "";
      stage.appendChild(orderLine(state.rows, state.cols, extra));
      if (state.hiRow != null || state.hiCol != null) {
        const info = document.createElement("p");
        info.className = "muted";
        const bits = [];
        if (state.hiRow != null) bits.push("第 " + (state.hiRow + 1) + " 行");
        if (state.hiCol != null) bits.push("第 " + (state.hiCol + 1) + " 列");
        if (state.hiRow != null && state.hiCol != null) {
          const v = state.values[state.hiRow][state.hiCol];
          bits.push("相交處是 " + aijTex(state.hiRow, state.hiCol) + "＝" + v);
        }
        info.textContent = "現正高亮：" + bits.join("、");
        stage.appendChild(info);
      }
      const actions = document.createElement("div");
      actions.className = "actions";
      const reset = button("還原為引入例子", "btn-quiet", () => {
        loadExplore(INTRO);
        render();
      });
      actions.appendChild(reset);
      stage.appendChild(actions);
      return;
    }

    if (state.item === "check11.1") {
      title.textContent = "概念測試站 11.1";
      const intro = document.createElement("p");
      intro.className = "lead";
      intro.appendChild(document.createTextNode("設 "));
      intro.appendChild(texSpan("a_{ij}"));
      intro.appendChild(document.createTextNode(" 為矩陣 A 第 i 行、第 j 列的元素，其中"));
      stage.appendChild(title);
      stage.appendChild(intro);
      stage.appendChild(namedMatrix({ name: "A", matrix: CHECK_A }, { axis: true, showSub: true }));
      stage.appendChild(orderLine(3, 2));

      const qa = document.createElement("div");
      qa.className = "qa";
      qa.appendChild(inputRow("（a）A 的階是", "orderR", " × ", "orderC", "。"));
      const rowB = document.createElement("div");
      rowB.className = "row";
      rowB.appendChild(text("（b）"));
      rowB.appendChild(texSpan("a_{12}"));
      rowB.appendChild(text("＝"));
      rowB.appendChild(field("a12"));
      rowB.appendChild(text("，"));
      rowB.appendChild(texSpan("a_{21}"));
      rowB.appendChild(text("＝"));
      rowB.appendChild(field("a21"));
      rowB.appendChild(text("，"));
      rowB.appendChild(texSpan("a_{32}"));
      rowB.appendChild(text("＝"));
      rowB.appendChild(field("a32"));
      rowB.appendChild(text("。"));
      qa.appendChild(rowB);
      stage.appendChild(qa);

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(button("核對", "btn-primary", checkConcept));
      actions.appendChild(button("揭曉答案", "btn", revealConcept));
      stage.appendChild(actions);
      if (state.judge) stage.appendChild(state.judge);
      return;
    }

    if (state.item === "contrast") {
      title.textContent = "2×3 與 3×2 是不同的階";
      lead.textContent =
        "書上這個例子的階是 2×3，不是 3×2。右邊把同一組數字改排成 3 行 2 列以後，得到的是另一個矩陣（此對照圖不是課本題圖）。階不同，兩個矩陣就不可能相等。";
      stage.appendChild(title);
      stage.appendChild(lead);
      const pair = document.createElement("div");
      pair.className = "pair";
      const left = document.createElement("div");
      left.className = "panel";
      left.appendChild(namedMatrix({ name: "A", matrix: BOOK_2X3 }, { axis: true, showSub: true }));
      left.appendChild(orderLine(2, 3));
      const right = document.createElement("div");
      right.className = "panel";
      right.appendChild(namedMatrix({ name: "B", matrix: CONTRAST_3X2 }, { axis: true, showSub: true }));
      right.appendChild(orderLine(3, 2));
      pair.appendChild(left);
      pair.appendChild(right);
      stage.appendChild(pair);
      const note = document.createElement("p");
      note.className = "muted";
      note.textContent = "A 是 2 行 3 列，B 是 3 行 2 列。不要把行、列對調。";
      stage.appendChild(note);
      return;
    }

    if (state.item === "practice-1") {
      title.textContent = "自擬 1：讀階與 a₂₁";
      lead.textContent = "這是自擬題，不是課本題。寫出下列各矩陣的階，並指出 a₂₁（若該元素不存在，請說明）。";
      stage.appendChild(title);
      stage.appendChild(lead);
      const list = document.createElement("div");
      list.className = "steps";
      list.appendChild(practiceBlock("（i）", "只有一行、元素為 2、0、−5 的行矩陣。", { name: "A", matrix: [["2", "0", "-5"]] }));
      list.appendChild(practiceBlock("（ii）", "3×2 零矩陣。", { name: "0_{3\\times 2}", matrix: [["0", "0"], ["0", "0"], ["0", "0"]] }));
      list.appendChild(practiceBlock("（iii）", "", { name: "I_2", matrix: [["1", "0"], ["0", "1"]] }));
      stage.appendChild(list);
      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(
        button(state.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
          state.revealed = !state.revealed;
          render();
        })
      );
      stage.appendChild(actions);
      if (state.revealed) {
        const fb = document.createElement("div");
        fb.className = "feedback ok";
        fb.innerHTML =
          "<h3>答案</h3><ul>" +
          "<li>（i）階是 1×3。沒有 a₂₁（只有一行）。</li>" +
          "<li>（ii）階是 3×2，a₂₁＝0。</li>" +
          "<li>（iii）階是 2×2，a₂₁＝0。</li>" +
          "</ul>";
        stage.appendChild(fb);
      }
    }
  }

  function practiceBlock(label, text, spec) {
    const div = document.createElement("div");
    div.className = "step";
    const h = document.createElement("h3");
    h.textContent = label + (text || "");
    div.appendChild(h);
    div.appendChild(namedMatrix(spec, { showSub: true }));
    return div;
  }

  function stepperBar() {
    const bar = document.createElement("div");
    bar.className = "controls";
    bar.appendChild(stepper("行數", state.rows, (n) => resizeValues(n, state.cols)));
    bar.appendChild(stepper("列數", state.cols, (n) => resizeValues(state.rows, n)));
    return bar;
  }

  function stepper(label, value, onChange) {
    const box = document.createElement("div");
    box.className = "stepper";
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "減少" + label);
    minus.disabled = value <= 1;
    minus.addEventListener("click", () => {
      onChange(Math.max(1, value - 1));
      render();
    });
    const val = document.createElement("span");
    val.className = "val num";
    val.textContent = String(value);
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "＋";
    plus.setAttribute("aria-label", "增加" + label);
    plus.disabled = value >= 5;
    plus.addEventListener("click", () => {
      onChange(Math.min(5, value + 1));
      render();
    });
    box.appendChild(lbl);
    box.appendChild(minus);
    box.appendChild(val);
    box.appendChild(plus);
    return box;
  }

  function field(id) {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.id = "f-" + id;
    inp.value = state.student[id] || "";
    inp.addEventListener("input", () => {
      state.student[id] = inp.value;
    });
    return inp;
  }

  function text(s) {
    return document.createTextNode(s);
  }

  function inputRow(before, id1, mid, id2, after) {
    const row = document.createElement("div");
    row.className = "row";
    row.appendChild(text(before + " "));
    row.appendChild(field(id1));
    row.appendChild(text(mid));
    row.appendChild(field(id2));
    if (after) row.appendChild(text(after));
    return row;
  }

  function button(label, cls, fn) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    b.textContent = label;
    b.addEventListener("click", fn);
    return b;
  }

  function parseOrderPart(s) {
    const t = String(s || "").trim().replace(/[×xX＊*]/g, "");
    const n = Number(t);
    return Number.isInteger(n) ? n : NaN;
  }

  function parseNum(s) {
    const t = String(s || "").trim().replace(/−/g, "-").replace(/\s/g, "");
    if (t === "") return NaN;
    const n = Number(t);
    return Number.isFinite(n) ? n : NaN;
  }

  function checkConcept() {
    const r = parseOrderPart(state.student.orderR);
    const c = parseOrderPart(state.student.orderC);
    const a12 = parseNum(state.student.a12);
    const a21 = parseNum(state.student.a21);
    const a32 = parseNum(state.student.a32);
    const box = document.createElement("div");
    const bits = [];
    let all = true;
    if (r === 3 && c === 2) {
      bits.push("（a）階是 3×2，正確。");
    } else {
      all = false;
      if (r === 2 && c === 3) {
        bits.push("（a）常見混淆：先數行、再數列。這個矩陣有 3 行 2 列，階是 3×2，不是 2×3。");
      } else {
        bits.push("（a）尚未正確。A 有 3 行 2 列，階是 3×2。");
      }
    }
    const ok12 = a12 === 7;
    const ok21 = a21 === -2;
    const ok32 = a32 === 1;
    if (ok12 && ok21 && ok32) {
      bits.push("（b）a₁₂＝7，a₂₁＝−2，a₃₂＝1，正確。");
    } else {
      all = false;
      if (a12 === -2 || a21 === 7) {
        bits.push("（b）a₁₂ 是第 1 行第 2 列，等於 7；a₂₁ 是第 2 行第 1 列，等於 −2。不要把行、列對調。");
      } else {
        bits.push("（b）尚未全部正確。a₁₂＝7，a₂₁＝−2，a₃₂＝1。");
      }
    }
    box.className = "feedback " + (all ? "ok" : "warn");
    const h = document.createElement("h3");
    h.textContent = all ? "全部正確" : "再看一看";
    box.appendChild(h);
    const ul = document.createElement("ul");
    bits.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    box.appendChild(ul);
    state.judge = box;
    render();
  }

  function revealConcept() {
    const box = document.createElement("div");
    box.className = "feedback ok";
    box.innerHTML =
      "（a）A 的階是 3×2。<br>（b）a₁₂＝7，a₂₁＝−2，a₃₂＝1。<br>常見混淆：把階寫成 2×3，或把 a₁₂ 與 a₂₁ 對調。";
    state.judge = box;
    state.student = Object.assign({}, state.student, {
      orderR: "3",
      orderC: "2",
      a12: "7",
      a21: "−2",
      a32: "1",
    });
    render();
  }

  function renderIdentify() {
    const stage = els.stage;
    stage.innerHTML = "";
    if (state.item === "practice-2") {
      renderPractice2();
      return;
    }
    const data = IDENTIFY_DATA[state.item];
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "辨認特殊矩陣";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent =
      (data.homemade ? "這是自擬的常見誤會例子，不是課本題圖。" : "這是書上的例子。") +
      " 勾選所有適用的名稱；一個矩陣可以同時屬於多類。只涵蓋行矩陣、列矩陣、零矩陣、n 階方矩陣、對角矩陣與單位矩陣。";
    stage.appendChild(title);
    stage.appendChild(lead);
    stage.appendChild(namedMatrix({ name: data.name, matrix: data.matrix }, { showSub: true, highlightDiag: data.highlightDiag }));
    const { r, c } = orderOf(data.matrix);
    stage.appendChild(orderLine(r, c));

    const boxes = document.createElement("div");
    boxes.className = "boxes";
    const truth = classify(data.matrix);
    LABELS.forEach((lab) => {
      const id = "lab-" + lab.key;
      const label = document.createElement("label");
      const inp = document.createElement("input");
      inp.type = "checkbox";
      inp.id = id;
      inp.checked = !!state.picked[lab.key];
      if (state.identified) {
        const want = !!truth[lab.key];
        const got = !!state.picked[lab.key];
        if (want && got) label.classList.add("ok");
        else if (want && !got) label.classList.add("miss");
        else if (!want && got) label.classList.add("bad");
      }
      inp.addEventListener("change", () => {
        state.picked[lab.key] = inp.checked;
        if (state.identified) {
          /* keep result until re-check */
        }
      });
      label.appendChild(inp);
      label.appendChild(document.createTextNode(lab.name));
      boxes.appendChild(label);
    });
    stage.appendChild(boxes);

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(button("核對", "btn-primary", () => {
      state.identified = true;
      render();
    }));
    actions.appendChild(button("清除勾選", "btn-quiet", () => {
      state.picked = {};
      state.identified = false;
      render();
    }));
    stage.appendChild(actions);

    if (state.identified) {
      stage.appendChild(identifyFeedback(data, truth));
    } else if (data.note && data.highlightDiag) {
      const hint = document.createElement("p");
      hint.className = "muted";
      hint.textContent = "若此為方矩陣，綠色框線標出主對角線元素。";
      stage.appendChild(hint);
    }
  }

  function identifyFeedback(data, truth) {
    const box = document.createElement("div");
    const correctKeys = LABELS.filter((l) => truth[l.key]).map((l) => l.name);
    const missed = LABELS.filter((l) => truth[l.key] && !state.picked[l.key]).map((l) => l.name);
    const extra = LABELS.filter((l) => !truth[l.key] && state.picked[l.key]).map((l) => l.name);
    const allOk = missed.length === 0 && extra.length === 0;
    box.className = "feedback " + (allOk ? "ok" : "warn");
    const h = document.createElement("h3");
    h.textContent = allOk ? "名稱全部正確" : "再對照定義看一看";
    box.appendChild(h);
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("適用的名稱：" + (correctKeys.join("、") || "（以上六類都不適用）") + "。"));
    box.appendChild(p);
    if (missed.length) {
      const m = document.createElement("p");
      m.textContent = "漏選：" + missed.join("、") + "。";
      box.appendChild(m);
    }
    if (extra.length) {
      const m = document.createElement("p");
      m.textContent = "不應選：" + extra.join("、") + "。";
      box.appendChild(m);
    }
    const why = document.createElement("p");
    why.textContent = explainClassify(data, truth);
    box.appendChild(why);
    return box;
  }

  function explainClassify(data, truth) {
    const { r, c } = orderOf(data.matrix);
    const parts = [];
    parts.push("這是一個 " + fmtOrder(r, c) + " 矩陣。");
    if (truth.row) parts.push("只有 1 行，所以是行矩陣。");
    else parts.push("行數不是 1，所以不是行矩陣。");
    if (truth.col) parts.push("只有 1 列，所以是列矩陣。");
    else parts.push("列數不是 1，所以不是列矩陣。");
    if (truth.zero) parts.push("所有元素均是零，所以是零矩陣。");
    else parts.push("元素不全部是零，所以不是零矩陣。");
    if (truth.square) parts.push("行數和列數都是 " + r + "，所以是 " + r + " 階方矩陣。");
    else parts.push("行數與列數不同，所以不是 n 階方矩陣；對角矩陣和單位矩陣都必須先是方矩陣。");
    if (truth.square) {
      if (truth.diag) {
        parts.push("所有非主對角線元素均等於零，所以是對角矩陣。對角元素可以不相同，也不必為 1。");
      } else {
        parts.push("有些非主對角線元素不是零，所以不是對角矩陣，更不是單位矩陣。");
      }
      if (truth.identity) {
        parts.push("主對角線元素均是 1，其餘均是 0，所以也是單位矩陣。");
      } else if (truth.diag) {
        parts.push("主對角線元素並非均是 1，所以不是單位矩陣。");
      } else if (state.item === "ones") {
        parts.push("單位矩陣只有主對角線是 1，其餘必須是 0；全部是 1 的方矩陣不是單位矩陣。");
      }
    }
    return parts.join("");
  }

  function renderPractice2() {
    const stage = els.stage;
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "自擬 2：判斷陳述";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = "這是自擬題，不是課本題。判斷下列陳述是否正確，並用一句話解釋。";
    stage.appendChild(title);
    stage.appendChild(lead);
    const qs = [
      { id: "t1", text: "（i）對角矩陣一定是單位矩陣。" },
      { id: "t2", text: "（ii）單位矩陣一定是對角矩陣。" },
      { id: "t3", text: "（iii）2×3 零矩陣與 3×2 零矩陣相等。" },
    ];
    const tf = document.createElement("div");
    tf.className = "tf";
    qs.forEach((q) => {
      const item = document.createElement("div");
      item.className = "tf-item";
      const p = document.createElement("p");
      p.textContent = q.text;
      item.appendChild(p);
      const choice = document.createElement("div");
      choice.className = "choice";
      ["正確", "不正確"].forEach((lab) => {
        const b = button(lab, "btn", () => {
          state.tf[q.id] = lab;
          render();
        });
        b.setAttribute("aria-pressed", state.tf[q.id] === lab ? "true" : "false");
        choice.appendChild(b);
      });
      item.appendChild(choice);
      tf.appendChild(item);
    });
    stage.appendChild(tf);
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(
      button(state.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
        state.revealed = !state.revealed;
        render();
      })
    );
    stage.appendChild(actions);
    if (state.revealed) {
      const fb = document.createElement("div");
      fb.className = "feedback ok";
      fb.innerHTML =
        "<h3>答案</h3><ul>" +
        "<li>（i）不正確。對角元素不必是 1，例如主對角線為 2、−1 的 2×2 對角矩陣就不是單位矩陣。</li>" +
        "<li>（ii）正確。單位矩陣是主對角線元素均是 1 的對角矩陣。</li>" +
        "<li>（iii）不正確。兩個零矩陣的階不同（2×3 對 3×2），不相等。</li>" +
        "</ul>";
      stage.appendChild(fb);
    }
  }

  function renderEqual() {
    const stage = els.stage;
    stage.innerHTML = "";
    const data = EQUAL_DATA[state.item];
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = data.title + (data.gate ? "（過關）" : "") + (data.homemade ? "（自擬）" : "");
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = data.lead;
    stage.appendChild(title);
    stage.appendChild(lead);

    const pair = document.createElement("div");
    pair.className = "pair";
    pair.appendChild(namedMatrix(data.A, { showSub: true }));
    if (data.unknowns) {
      const eq = document.createElement("span");
      eq.className = "pair-eq";
      eq.textContent = "＝";
      eq.setAttribute("aria-hidden", "true");
      pair.appendChild(eq);
    }
    pair.appendChild(namedMatrix(data.B, { showSub: true }));
    stage.appendChild(pair);

    const oA = orderOf(data.A.matrix);
    const oB = orderOf(data.B.matrix);
    const same = oA.r === oB.r && oA.c === oB.c;
    const steps = document.createElement("div");
    steps.className = "steps";

    const s1 = document.createElement("div");
    s1.className = "step";
    const h1 = document.createElement("h3");
    h1.textContent = "先比階";
    s1.appendChild(h1);
    if (!state.revealed && state.judge !== "order" && state.judge !== "eqs" && state.judge !== "done") {
      const p = document.createElement("p");
      p.textContent = "這兩個矩陣的階是否相同？";
      s1.appendChild(p);
      const choice = document.createElement("div");
      choice.className = "choice";
      ["相同", "不相同"].forEach((lab) => {
        choice.appendChild(
          button(lab, "btn", () => {
            state.student.orderGuess = lab;
            state.judge = "order";
            render();
          })
        );
      });
      s1.appendChild(choice);
    } else {
      const p = document.createElement("p");
      p.appendChild(texSpan(data.A.name));
      p.appendChild(document.createTextNode(" 的階是 " + fmtOrder(oA.r, oA.c) + "，"));
      p.appendChild(texSpan(data.B.name));
      p.appendChild(document.createTextNode(" 的階是 " + fmtOrder(oB.r, oB.c) + "。"));
      p.appendChild(document.createTextNode(same ? "階相同，可以比較對應元素。" : "階不同，兩個矩陣不相等。不必再比較元素。"));
      s1.appendChild(p);
      if (state.student.orderGuess) {
        const ok = (state.student.orderGuess === "相同") === same;
        const tip = document.createElement("p");
        tip.className = "muted";
        tip.textContent = ok ? "你的判斷正確。" : "再看一看：先數行、再數列，兩邊的階要逐一比較。";
        s1.appendChild(tip);
      }
    }
    steps.appendChild(s1);

    if (same && data.equations && (state.judge === "eqs" || state.judge === "done" || state.revealed)) {
      const s2 = document.createElement("div");
      s2.className = "step";
      const h2 = document.createElement("h3");
      h2.textContent = "列出方程";
      s2.appendChild(h2);
      const p = document.createElement("p");
      p.textContent = "根據矩陣相等的定義，對應元素分別相等。兩邊已經相同的式子只作核對，不必再求未知數。";
      s2.appendChild(p);
      const ul = document.createElement("ul");
      ul.className = "eq-list";
      data.equations.forEach((eq) => {
        const li = document.createElement("li");
        if (eq.kind === "check") li.className = "check";
        li.appendChild(texSpan(eq.tex));
        li.appendChild(document.createTextNode(eq.kind === "check" ? "（核對）" : ""));
        ul.appendChild(li);
      });
      s2.appendChild(ul);
      steps.appendChild(s2);
    }

    if (data.unknowns && same) {
      const s3 = document.createElement("div");
      s3.className = "step";
      const h3 = document.createElement("h3");
      h3.textContent = "求解";
      s3.appendChild(h3);
      const qa = document.createElement("div");
      qa.className = "qa";
      const row = document.createElement("div");
      row.className = "row";
      data.unknowns.forEach((u, i) => {
        row.appendChild(texSpan(u));
        row.appendChild(text("＝"));
        row.appendChild(field(u));
        if (i < data.unknowns.length - 1) row.appendChild(text("， "));
      });
      qa.appendChild(row);
      s3.appendChild(qa);
      steps.appendChild(s3);
    } else if (!data.unknowns && (state.judge === "order" || state.revealed || state.judge === "done")) {
      const s3 = document.createElement("div");
      s3.className = "step";
      const h3 = document.createElement("h3");
      h3.textContent = "判斷";
      s3.appendChild(h3);
      if (!state.revealed) {
        const p = document.createElement("p");
        p.textContent = "這兩個矩陣是否相等？";
        s3.appendChild(p);
        const choice = document.createElement("div");
        choice.className = "choice";
        ["相等", "不相等"].forEach((lab) => {
          const b = button(lab, "btn", () => {
            state.student.eqGuess = lab;
            state.judge = "done";
            render();
          });
          b.setAttribute("aria-pressed", state.student.eqGuess === lab ? "true" : "false");
          choice.appendChild(b);
        });
        s3.appendChild(choice);
      }
      if (state.revealed || state.student.eqGuess) {
        const fb = document.createElement("div");
        const okGuess =
          state.student.eqGuess == null
            ? true
            : (state.student.eqGuess === "相等") === data.equal;
        fb.className = "feedback " + (state.revealed || okGuess ? (okGuess ? "ok" : "warn") : "ok");
        const h = document.createElement("h3");
        h.textContent = data.equal ? "A 與 B 相等" : "A 與 B 不相等";
        fb.appendChild(h);
        const reason = document.createElement("p");
        reason.appendChild(texSpan ? document.createTextNode("") : document.createTextNode(""));
        fb.appendChild(reasonParagraph(data.reason));
        if (state.student.eqGuess && !state.revealed) {
          const tip = document.createElement("p");
          tip.className = "muted";
          tip.textContent = okGuess ? "你的判斷正確。" : "再對照定義：先比階，再比每一個對應元素。";
          fb.appendChild(tip);
        }
        s3.appendChild(fb);
      }
      steps.appendChild(s3);
    }

    stage.appendChild(steps);

    const actions = document.createElement("div");
    actions.className = "actions";
    if (data.equations && same && state.judge !== "eqs" && state.judge !== "done" && !state.revealed) {
      actions.appendChild(
        button("列出方程", "btn", () => {
          state.judge = "eqs";
          render();
        })
      );
    }
    if (data.unknowns) {
      actions.appendChild(button("核對答案", "btn-primary", () => checkUnknowns(data)));
    }
    actions.appendChild(
      button(state.revealed ? "隱藏答案" : "揭曉答案", "btn", () => {
        state.revealed = !state.revealed;
        if (state.revealed) {
          state.checkMsg = null;
          state.judge = "done";
          if (data.unknowns) {
            data.unknowns.forEach((u) => {
              state.student[u] = String(data.answers[u]).replace("-", "−");
            });
          }
        }
        render();
      })
    );
    stage.appendChild(actions);

    if (state.checkMsg && data.unknowns && !state.revealed) {
      const fb = document.createElement("div");
      fb.className = "feedback " + state.checkMsg.kind;
      const h = document.createElement("h3");
      h.textContent = state.checkMsg.title;
      fb.appendChild(h);
      const p = document.createElement("p");
      p.textContent = state.checkMsg.text;
      fb.appendChild(p);
      stage.appendChild(fb);
    }

    if (data.unknowns && state.revealed) {
      const fb = document.createElement("div");
      fb.className = "feedback ok";
      const h = document.createElement("h3");
      h.textContent = "解答";
      fb.appendChild(h);
      const ul = document.createElement("ul");
      data.solution.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        ul.appendChild(li);
      });
      fb.appendChild(ul);
      const ans = document.createElement("p");
      ans.style.fontWeight = "700";
      ans.textContent =
        "答案：" +
        data.unknowns.map((u) => u + "＝" + String(data.answers[u]).replace("-", "−")).join("，") +
        "。";
      fb.appendChild(ans);
      stage.appendChild(fb);
    }
  }

  function reasonParagraph(text) {
    const p = document.createElement("p");
    p.textContent = text.replace(/\\\\/g, "");
    // Keep unicode already in reason; if it contains tex like a_{11}, typeset by splitting
    p.textContent = "";
    const parts = text.split(/(\$[^$]+\$|\\\\?[a-zA-Z]_{[^}]+}|[ab]_{[0-9]+})/g);
    if (text.indexOf("_{") === -1 && text.indexOf("\\neq") === -1) {
      p.textContent = text;
      return p;
    }
    // Manual: render whole as mixed. Simpler: put as data-tex free text with katex fragments.
    const chunks = [];
    let remaining = text;
    const re = /([ab]_{[0-9]+}|\\\\neq|\\neq)/g;
    let last = 0;
    let m;
    const rx = /([abAB]_{[0-9]+}|\\neq)/g;
    while ((m = rx.exec(text))) {
      if (m.index > last) p.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[0] === "\\neq") p.appendChild(texSpan("\\neq"));
      else p.appendChild(texSpan(m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) p.appendChild(document.createTextNode(text.slice(last)));
    return p;
  }

  function checkUnknowns(data) {
    const missing = [];
    const wrong = [];
    data.unknowns.forEach((u) => {
      const got = parseNum(state.student[u]);
      const want = data.answers[u];
      if (!Number.isFinite(got)) missing.push(u);
      else if (got !== want) wrong.push(u);
    });
    if (!missing.length && !wrong.length) {
      state.checkMsg = {
        kind: "ok",
        title: "全部正確",
        text: data.unknowns.length === 2
          ? "對應方程都對上了。"
          : "各未知數都對上了。若還未列出核對式，也請看一眼兩邊已經相同的元素。",
      };
    } else {
      const bits = [];
      if (missing.length) bits.push("尚未填：" + missing.join("、"));
      if (wrong.length) bits.push("再檢查：" + wrong.join("、"));
      state.checkMsg = {
        kind: "warn",
        title: "尚未全部正確",
        text: bits.join("。") + "。建議先列齊方程，再解最簡單的那一條。",
      };
    }
    state.judge = "eqs";
    render();
  }

  function render() {
    if (state.chapter === "11.3" && window.LabDet) {
      window.LabDet.render();
      return;
    }
    if (state.chapter === "11.2" && window.LabOps) {
      window.LabOps.render();
      return;
    }
    show11_1Chrome();
    document.querySelectorAll(".modes [data-mode]").forEach((btn) => {
      btn.setAttribute("aria-selected", btn.getAttribute("data-mode") === state.mode ? "true" : "false");
    });
    els.notes.hidden = !state.notesOpen;
    els.notesBtn.setAttribute("aria-pressed", state.notesOpen ? "true" : "false");
    renderItems();
    if (state.mode === "read") renderRead();
    else if (state.mode === "identify") renderIdentify();
    else renderEqual();
    typeset(document);
  }

  function bind() {
    document.querySelectorAll("#chapters [data-chapter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const ch = btn.getAttribute("data-chapter");
        if (ch === "11.3" && window.LabDet) {
          state.chapter = "11.3";
          window.LabDet.apply("det");
          window.LabDet.render();
        } else if (ch === "11.2" && window.LabOps) {
          state.chapter = "11.2";
          window.LabOps.apply("ops");
          window.LabOps.render();
        } else {
          enter11_1();
        }
      });
    });
    document.querySelectorAll(".modes [data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        const items = currentItemsFor(mode);
        setMode(mode, items[0].id);
      });
    });
    els.notesBtn.addEventListener("click", () => {
      state.notesOpen = !state.notesOpen;
      render();
    });
    window.addEventListener("hashchange", applyHash);
  }

  function init() {
    bind();
    const start = function () {
      if (window.LabOps) window.LabOps.bind();
      if (window.LabDet) window.LabDet.bind();
      applyHash();
      if (!location.hash) syncHash();
    };
    if (window.LabOps || window.LabDet) start();
    else setTimeout(start, 0);
  }

  window.LabUI = {
    els: els,
    state: state,
    namedMatrix: namedMatrix,
    buildMatrix: buildMatrix,
    typeset: typeset,
    button: button,
    texSpan: texSpan,
    enter11_1: enter11_1,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
