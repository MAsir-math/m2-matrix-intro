/* §11.2 矩陣的運算 — 馬Sir教室。用語：矩陣的冪。 */
(function () {
  "use strict";

  const GROUPS = [
    { id: "ops", title: "運算示範", hash: "ops" },
    { id: "add", title: "加減法", hash: "add" },
    { id: "scalar", title: "純量乘法", hash: "scalar" },
    { id: "mul", title: "矩陣乘法", hash: "mul" },
    { id: "power", title: "矩陣的冪", hash: "power" },
    { id: "exer11A", title: "練習 11A", hash: "exer11A" },
    { id: "exer11B", title: "練習 11B", hash: "exer11B" },
  ];

  /* matrices are number[][] ; undefined answers use null */
  const ITEMS = [
    /* ---- 加減 ---- */
    {
      id: "ex11.2", hash: "ex11.2", group: "add", title: "例 11.2", tag: "加減法",
      lead: "設矩陣 A、B 及 C 如下。求 (a) A＋B；(b) B−C。",
      given: [
        { name: "A", matrix: [[2, 7, -3], [0, 9, -6]] },
        { name: "B", matrix: [[-5, 0, -2], [-1, -7, 0]] },
        { name: "C", matrix: [[-9, -5, 3], [-3, -4, -1]] },
      ],
      tasks: [
        { q: "（a）求 A＋B。", answer: [[-3, 7, -5], [-1, 2, -6]] },
        { q: "（b）求 B−C。", answer: [[4, 5, -5], [2, -3, 1]] },
      ],
    },
    {
      id: "qp11.2", hash: "qp11.2", group: "add", title: "課堂練習 11.2", tag: "加減法",
      lead: "設矩陣 A、B 及 C 如下。求 (a) A＋B；(b) B−C。",
      given: [
        { name: "A", matrix: [[-3, -6], [7, 3], [6, -1]] },
        { name: "B", matrix: [[2, 1], [0, 0], [-1, -8]] },
        { name: "C", matrix: [[7, 3], [5, 1], [0, -8]] },
      ],
      tasks: [
        { q: "（a）求 A＋B。", answer: [[-1, -5], [7, 3], [5, -9]] },
        { q: "（b）求 B−C。", answer: [[-5, -2], [-5, -1], [-1, 0]] },
      ],
    },
    {
      id: "extra11.2", hash: "extra11.2", group: "add", title: "附加例題 11.2", tag: "加減法",
      lead: "設矩陣 A、B 及 C 如下。求 (a) A＋B；(b) A−C。",
      given: [
        { name: "A", matrix: [[0, 2, 4], [1, -6, 5]] },
        { name: "B", matrix: [[-4, 1, 5], [7, 0, -2]] },
        { name: "C", matrix: [[1, 4, 1], [9, 1, -1]] },
      ],
      tasks: [
        { q: "（a）求 A＋B。", answer: [[-4, 3, 9], [8, -6, 3]] },
        { q: "（b）求 A−C。", answer: [[-1, -2, 3], [-8, -7, 6]] },
      ],
    },
    /* ---- 純量 ---- */
    {
      id: "ex11.3", hash: "ex11.3", group: "scalar", title: "例 11.3", tag: "純量乘法",
      lead: "設 A 如下。求 3A 和 (1/2)A。",
      given: [{ name: "A", matrix: [[4, 0], [3, -2]] }],
      tasks: [
        { q: "求 3A。", answer: [[12, 0], [9, -6]] },
        { q: "求 \\dfrac{1}{2}A。", answer: [[2, 0], [1.5, -1]] },
      ],
    },
    {
      id: "qp11.3", hash: "qp11.3", group: "scalar", title: "課堂練習 11.3", tag: "純量乘法",
      lead: "設 A 如下。求 (a) 2A；(b) (1/3)A；(c) −A。",
      given: [{ name: "A", matrix: [[7, 6], [0, -9]] }],
      tasks: [
        { q: "（a）求 2A。", answer: [[14, 12], [0, -18]] },
        { q: "（b）求 \\dfrac{1}{3}A。", answer: [[7 / 3, 2], [0, -3]] },
        { q: "（c）求 −A。", answer: [[-7, -6], [0, 9]] },
      ],
    },
    {
      id: "extra11.3", hash: "extra11.3", group: "scalar", title: "附加例題 11.3", tag: "純量乘法",
      lead: "設 A 如下。求 −3A 和 (3/4)A。",
      given: [{ name: "A", matrix: [[-4], [0], [2]] }],
      tasks: [
        { q: "求 −3A。", answer: [[12], [0], [-6]] },
        { q: "求 \\dfrac{3}{4}A。", answer: [[-3], [0], [1.5]] },
      ],
    },
    {
      id: "ex11.4", hash: "ex11.4", group: "scalar", title: "例 11.4", tag: "運算性質",
      lead: "設 A、B 如下，及 C＝I₂＋2B−A。求 4C−7B＋4A。",
      given: [
        { name: "A", matrix: [[9, 0], [1, -8]] },
        { name: "B", matrix: [[7, 4], [3, -4]] },
      ],
      tasks: [
        { q: "先求 C＝I₂＋2B−A，再求 4C−7B＋4A。", answer: [[11, 4], [3, 0]],
          steps: ["C＝I₂＋2B−A。", "4C−7B＋4A＝4(I₂＋2B−A)−7B＋4A＝4I₂＋B＝[[11, 4], [3, 0]]。"] },
      ],
    },
    {
      id: "qp11.4", hash: "qp11.4", group: "scalar", title: "課堂練習 11.4", tag: "運算性質",
      lead: "設 A、B 如下，及 C＝2I₂＋2B＋A。求 3C−6B−2A。",
      given: [
        { name: "A", matrix: [[-6, 10], [-3, -3]] },
        { name: "B", matrix: [[4, -5], [5, -2]] },
      ],
      tasks: [{ q: "求 3C−6B−2A。", answer: [[0, 10], [-3, 3]] }],
    },
    {
      id: "extra11.4", hash: "extra11.4", group: "scalar", title: "附加例題 11.4", tag: "運算性質",
      lead: "設 A、B 如下，及 C＝2I₂＋A−3B。求 5A＋6B＋2C。",
      given: [
        { name: "A", matrix: [[0, 3], [2, -1]] },
        { name: "B", matrix: [[1, -2], [4, 3]] },
      ],
      tasks: [{ q: "求 5A＋6B＋2C。", answer: [[4, 21], [14, -3]] }],
    },
    {
      id: "ex11.5", hash: "ex11.5", group: "scalar", title: "例 11.5", tag: "求矩陣",
      lead: "設 A 和 B 為 2×2 矩陣。已知 A＋B 及 A−B 如下。求 A 和 B。",
      given: [
        { name: "A+B", matrix: [[0, 2], [2, 0]] },
        { name: "A-B", matrix: [[1, 0], [0, 3]] },
      ],
      tasks: [
        { q: "求 A。", answer: [[0.5, 1], [1, 1.5]] },
        { q: "求 B。", answer: [[-0.5, 1], [1, -1.5]] },
        { steps: ["(A＋B)＋(A−B)＝2A，故 A＝(1/2)[[1, 2], [2, 3]]。", "把 A 代入 A＋B 求 B。"] },
      ],
    },
    {
      id: "qp11.5", hash: "qp11.5", group: "scalar", title: "課堂練習 11.5", tag: "求矩陣",
      lead: "設 A 和 B 為 2×2 矩陣。已知 A＋B 及 B−A 如下。求 A 和 B。",
      given: [
        { name: "A+B", matrix: [[8, 9], [-1, 2]] },
        { name: "B-A", matrix: [[9, -5], [-9, -2]] },
      ],
      tasks: [
        { q: "求 A。", answer: [[-0.5, 7], [4, 2]] },
        { q: "求 B。", answer: [[8.5, 2], [-5, 0]] },
      ],
    },
    {
      id: "extra11.5", hash: "extra11.5", group: "scalar", title: "附加例題 11.5", tag: "求矩陣",
      lead: "設 A 和 B 為 2×2 矩陣。已知 2A＋3B 及 3A−2B 如下。求 A 和 B。",
      given: [
        { name: "2A+3B", matrix: [[3, 8], [7, 2]] },
        { name: "3A-2B", matrix: [[-2, -1], [-9, 16]] },
      ],
      tasks: [
        { q: "求 A。", answer: [[0, 1], [-1, 4]] },
        { q: "求 B。", answer: [[1, 2], [3, -2]] },
      ],
    },
    /* ---- 乘法 ---- */
    {
      id: "ex11.6", hash: "ex11.6", group: "mul", title: "例 11.6", tag: "矩陣乘法",
      lead: "設 A、B 及 C 如下。求 (a) AB；(b) BA；(c) CB；(d) BC。",
      given: [
        { name: "A", matrix: [[2, 3]] },
        { name: "B", matrix: [[5], [-3]] },
        { name: "C", matrix: [[2, 2], [-3, -8]] },
      ],
      tasks: [
        { q: "（a）求 AB。", answer: [[1]] },
        { q: "（b）求 BA。", answer: [[10, 15], [-6, -9]] },
        { q: "（c）求 CB。", answer: [[4], [9]] },
        { q: "（d）求 BC。", undefined: true, why: "B 是 2×1 矩陣，C 是 2×2 矩陣。B 的列數與 C 的行數不同，故 BC 是未定義的。" },
      ],
      notes: "由此可見：AB 和 BA 的階未必相同；即使 CB 有定義，BC 亦可能是未定義的。又，1 是一個數，但 (1) 是一個 1×1 矩陣。",
    },
    {
      id: "qp11.6", hash: "qp11.6", group: "mul", title: "課堂練習 11.6", tag: "矩陣乘法",
      lead: "按題求各項。若該乘法未定義，請說明。",
      given: [
        { name: "P", matrix: [[-4, 7]] },
        { name: "Q", matrix: [[2], [1]] },
        { name: "R", matrix: [[-1, 9], [-2, 4]] },
        { name: "A", matrix: [[-3, -1]] },
        { name: "B", matrix: [[-4], [5]] },
        { name: "C", matrix: [[6, -3], [-5, -7]] },
      ],
      tasks: [
        { q: "（a）（i）求 PQ。", answer: [[-1]] },
        { q: "（a）（ii）求 QP。", answer: [[-8, 14], [-4, 7]] },
        { q: "（a）（iii）求 RQ。", answer: [[7], [0]] },
        { q: "（a）（iv）求 QR。", undefined: true, why: "Q 是 2×1 矩陣，R 是 2×2 矩陣，列數與行數不同，QR 未定義。" },
        { q: "（b）（i）求 AB。", answer: [[7]] },
        { q: "（b）（ii）求 BA。", answer: [[12, 4], [-15, -5]] },
        { q: "（b）（iii）求 CA。", undefined: true, why: "C 是 2×2 矩陣，A 是 1×2 矩陣，列數與行數不同，CA 未定義。" },
        { q: "（b）（iv）求 AC。", answer: [[-13, 16]] },
      ],
    },
    {
      id: "ex11.7", hash: "ex11.7", group: "mul", title: "例 11.7", tag: "乘法對照",
      lead: "設 A、B、C 及 D 如下。求 (a) AB；(b) BA；(c) AC；(d) AD。",
      given: [
        { name: "A", matrix: [[2, 4], [-1, -2]] },
        { name: "B", matrix: [[2, 0], [-1, 0]] },
        { name: "C", matrix: [[1, 2], [3, 5]] },
        { name: "D", matrix: [[5, 10], [1, 1]] },
      ],
      tasks: [
        { q: "（a）求 AB。", answer: [[0, 0], [0, 0]] },
        { q: "（b）求 BA。", answer: [[4, 8], [-2, -4]] },
        { q: "（c）求 AC。", answer: [[14, 24], [-7, -12]] },
        { q: "（d）求 AD。", answer: [[14, 24], [-7, -12]] },
      ],
      notes: "一般來說 AB≠BA，矩陣乘法沒有交換性質。AB＝0 不表示 A＝0 或 B＝0。AC＝AD 不表示 C＝D。",
    },
    {
      id: "qp11.7", hash: "qp11.7", group: "mul", title: "課堂練習 11.7", tag: "乘法對照",
      lead: "按題求各項，並判斷 BA 是否等於 AB。",
      given: [
        { name: "A", matrix: [[1, 0], [-2, 0]] },
        { name: "B", matrix: [[0, 0], [-1, -2]] },
        { name: "P", matrix: [[3, 9], [-1, -3]] },
        { name: "Q", matrix: [[-3, 3], [1, -1]] },
        { name: "R", matrix: [[1, 0], [0, -1]] },
        { name: "S", matrix: [[7, -3], [-2, 0]] },
      ],
      tasks: [
        { q: "（a）（i）求 AB。", answer: [[0, 0], [0, 0]] },
        { q: "（a）（ii）BA 是否等於 AB？", text: "否。BA＝[[0, 0], [3, 0]]，與 AB＝0 不同。" },
        { q: "（b）（i）求 PQ。", answer: [[0, 0], [0, 0]] },
        { q: "（b）（ii）求 QP。", answer: [[-12, -36], [4, 12]] },
        { q: "（b）（iii）求 PR。", answer: [[3, -9], [-1, 3]] },
        { q: "（b）（iv）求 PS。", answer: [[3, -9], [-1, 3]] },
      ],
      notes: "這裡 AB＝0，但 A、B 都不是零矩陣。又 PR＝PS，但 R≠S。",
    },
    {
      id: "extra11.7", hash: "extra11.7", group: "mul", title: "附加例題 11.7", tag: "乘法對照",
      lead: "設 A、B、C 及 D 如下。求 (a) AB；(b) BA；(c) AC；(d) AD。",
      given: [
        { name: "A", matrix: [[-2, 2], [3, -3]] },
        { name: "B", matrix: [[1, -2], [1, -2]] },
        { name: "C", matrix: [[1, 0], [0, 1]] },
        { name: "D", matrix: [[0, -1], [-1, 0]] },
      ],
      tasks: [
        { q: "（a）求 AB。", answer: [[0, 0], [0, 0]] },
        { q: "（b）求 BA。", answer: [[-8, 8], [-8, 8]] },
        { q: "（c）求 AC。", answer: [[-2, 2], [3, -3]] },
        { q: "（d）求 AD。", answer: [[-2, 2], [3, -3]] },
      ],
      notes: "AB＝0 但 A、B 非零；AC＝AD 但 C≠D。",
    },
    {
      id: "ex11.8", hash: "ex11.8", group: "mul", title: "例 11.8", tag: "結合性",
      lead: "設 A、B 及 C 如下。求 (a) AB；(b) (AB)C。",
      given: [
        { name: "A", matrix: [[-3, 0, 1], [2, 1, 0], [0, 0, -1]] },
        { name: "B", matrix: [[1], [-1], [0]] },
        { name: "C", matrix: [[0, 2, -1]] },
      ],
      tasks: [
        { q: "（a）求 AB。", answer: [[-3], [1], [0]] },
        { q: "（b）求 (AB)C。", answer: [[0, -6, 3], [0, 2, -1], [0, 0, 0]] },
      ],
    },
    {
      id: "qp11.8", hash: "qp11.8", group: "mul", title: "課堂練習 11.8", tag: "結合性",
      lead: "按題求各項。",
      given: [
        { name: "A", matrix: [[1, 2, 0], [0, 0, -1], [-3, 1, 0]] },
        { name: "B", matrix: [[3], [1], [0]] },
        { name: "C", matrix: [[0, -1, 2]] },
        { name: "P", matrix: [[-3], [1], [-1]] },
        { name: "Q", matrix: [[2, 0, 1]] },
        { name: "R", matrix: [[0, -1, 1], [2, 0, -1], [3, 2, 0]] },
      ],
      tasks: [
        { q: "（a）（i）求 AB。", answer: [[5], [0], [-8]] },
        { q: "（a）（ii）求 (AB)C。", answer: [[0, -5, 10], [0, 0, 0], [0, 8, -16]] },
        { q: "（b）（i）求 QR。", answer: [[3, 0, 2]] },
        { q: "（b）（ii）求 P(QR)。", answer: [[-9, 0, -6], [3, 0, 2], [-3, 0, -2]] },
        { q: "（b）（iii）求 (PQ)R。", answer: [[-9, 0, -6], [3, 0, 2], [-3, 0, -2]] },
      ],
      notes: "P(QR)＝(PQ)R，這是矩陣乘法的結合性質。",
    },
    {
      id: "ex11.9", hash: "ex11.9", group: "mul", title: "例 11.9", tag: "列方程",
      lead: "若左邊兩個矩陣之積等於右邊，求 x 和 y 的值。",
      given: [],
      formula: "\\begin{pmatrix}3&-4x\\\\-4y&-9\\end{pmatrix}\\begin{pmatrix}8\\\\-3\\end{pmatrix}=8\\begin{pmatrix}x\\\\-y\\end{pmatrix}",
      tasks: [
        { q: "求 x 和 y。", unknowns: { x: -6, y: 9 / 8 },
          steps: ["左邊＝[[24＋12x], [−32y＋27]]，右邊＝[[8x], [−8y]]。", "由 24＋12x＝8x 得 x＝−6。", "由 −32y＋27＝−8y 得 24y＝27，y＝9/8。"] },
      ],
    },
    {
      id: "qp11.9", hash: "qp11.9", group: "mul", title: "課堂練習 11.9", tag: "列方程",
      lead: "求下列各題的 x 和 y。",
      given: [],
      tasks: [
        { q: "（a）若 6[[-2, -2x], [-y, 2]][[-1], [1]]＝[[0], [10y]]，求 x 和 y。", unknowns: { x: 1, y: 3 } },
        { q: "（b）若 [[-7, -x], [5y, -9]][[1], [5]]＝(-1/2)[[8x], [-y]]，求 x 和 y。", unknowns: { x: -7, y: 10 } },
      ],
    },
    /* ---- 冪 ---- */
    {
      id: "ex11.10", hash: "ex11.10", group: "power", title: "例 11.10", tag: "矩陣的冪",
      lead: "設 A 如下，及 B＝I−2A，其中 I 是 2×2 單位矩陣。(a) 求 B；(b) 證明 AB＝BA。",
      given: [{ name: "A", matrix: [[2, 1], [0, -1]] }],
      tasks: [
        { q: "（a）求 B＝I−2A。", answer: [[-3, -2], [0, 3]] },
        { q: "（b）AB 與 BA。", answer: [[-6, -1], [0, -3]], note: "AB＝BA＝[[-6, -1], [0, -3]]，所以 AB＝BA。" },
      ],
      notes: "一般來說，若 AB≠BA，則 (A＋B)²≠A²＋2AB＋B²。本例 AB＝BA，故可用這個交換關係化簡 (A＋2B)(A−2B)＝A²−4B²。數學歸納法證明不必在本頁展開。",
    },
    {
      id: "qp11.10", hash: "qp11.10", group: "power", title: "課堂練習 11.10", tag: "矩陣的冪",
      lead: "設 A 如下，及 B＝3I＋A，其中 I 是 2×2 單位矩陣。(a) 求 B；(b) 驗證 AB＝BA。",
      given: [{ name: "A", matrix: [[0, -4], [1, -2]] }],
      tasks: [
        { q: "（a）求 B＝3I＋A。", answer: [[3, -4], [1, 1]] },
        { q: "（b）求 AB 及 BA。", answer: [[-4, -4], [1, -6]], note: "AB＝BA＝[[-4, -4], [1, -6]]。" },
      ],
    },
    {
      id: "ex11.11", hash: "ex11.11", group: "power", title: "例 11.11", tag: "方矩陣的冪",
      lead: "設 B 如下。(a) 書上用數學歸納法證明對所有正整數 n，Bⁿ 如下式（證明留在課堂板書，本頁只引用結果）；(b) 由此計算 B⁷−4B⁵。",
      given: [
        { name: "B", matrix: [[2, 0, 0], [0, 1, 0], [0, 0, -1]] },
        { name: "B^n", matrix: [["2^n", 0, 0], [0, 1, 0], [0, 0, "(-1)^n"]] },
      ],
      tasks: [
        { q: "（b）求 B⁷−4B⁵。", answer: [[0, 0, 0], [0, -3, 0], [0, 0, 3]],
          steps: ["B⁷＝[[128, 0, 0], [0, 1, 0], [0, 0, −1]]，4B⁵＝[[128, 0, 0], [0, 4, 0], [0, 0, −4]]。"] },
      ],
    },
    {
      id: "qp11.11", hash: "qp11.11", group: "power", title: "課堂練習 11.11", tag: "方矩陣的冪",
      lead: "設 A 如下。書上要求用數學歸納法證明 Aⁿ 的公式（證明留在課堂板書）。本頁計算 (b) A⁹＋2A⁴。",
      given: [{ name: "A", matrix: [[1, 0, 0], [0, -1, 0], [2, 0, 1]] }],
      tasks: [
        { q: "已知 Aⁿ＝[[1, 0, 0], [0, (−1)ⁿ, 0], [2n, 0, 1]]。求 A⁹＋2A⁴。", answer: [[3, 0, 0], [0, 1, 0], [34, 0, 3]] },
      ],
    },
    {
      id: "extra11.11", hash: "extra11.11", group: "power", title: "附加例題 11.11", tag: "方矩陣的冪",
      lead: "設 A 如下。已知對所有正整數 n，Aⁿ＝[[2ⁿ, 0, 2ⁿ−1], [0, (−3)ⁿ, 0], [0, 0, 1]]。求 A⁸−9A⁶。",
      given: [{ name: "A", matrix: [[2, 0, 1], [0, -3, 0], [0, 0, 1]] }],
      tasks: [{ q: "求 A⁸−9A⁶。", answer: [[-320, 0, -312], [0, 0, 0], [0, 0, -8]] }],
    },
    /* ---- 練習 11A 程度 1 ---- */
    {
      id: "exer11A-1", hash: "exer11A-1", group: "exer11A", title: "練習 11A 第 1 題", tag: "程度 1",
      lead: "計算 (−1  2  0)＋(−5  7  4)。",
      given: [
        { name: "", matrix: [[-1, 2, 0]] },
        { name: "", matrix: [[-5, 7, 4]] },
      ],
      tasks: [{ q: "求它們的和。", answer: [[-6, 9, 4]] }],
    },
    {
      id: "exer11A-2", hash: "exer11A-2", group: "exer11A", title: "練習 11A 第 2 題", tag: "程度 1",
      lead: "計算下列差。",
      given: [
        { name: "", matrix: [[7, -2], [1, -8]] },
        { name: "", matrix: [[6, -1], [1, -5]] },
      ],
      tasks: [{ q: "求左邊減去右邊。", answer: [[1, -1], [0, -3]] }],
    },
    {
      id: "exer11A-3", hash: "exer11A-3", group: "exer11A", title: "練習 11A 第 3 題", tag: "程度 1",
      lead: "計算 4 乘以下列矩陣。",
      given: [{ name: "", matrix: [[1, 0], [2, -3], [-1, 2]] }],
      tasks: [{ q: "求 4A。", answer: [[4, 0], [8, -12], [-4, 8]] }],
    },
    {
      id: "exer11A-4", hash: "exer11A-4", group: "exer11A", title: "練習 11A 第 4 題", tag: "程度 1",
      lead: "計算 5A−2B，其中 A、B 如下。",
      given: [
        { name: "A", matrix: [[1, -1, 5], [2, 0, 0]] },
        { name: "B", matrix: [[2, -3, 0], [2, 0, -4]] },
      ],
      tasks: [{ q: "求 5A−2B。", answer: [[1, 1, 25], [6, 0, 8]] }],
    },
    {
      id: "exer11A-5", hash: "exer11A-5", group: "exer11A", title: "練習 11A 第 5 題", tag: "程度 1",
      lead: "設 A、B 及 C 如下。求 (a) A＋B；(b) B−2C；(c) A＋B−2C。",
      given: [
        { name: "A", matrix: [[2, -3], [2, 0]] },
        { name: "B", matrix: [[1, -1], [4, -5]] },
        { name: "C", matrix: [[1, -1], [-1, 1]] },
      ],
      tasks: [
        { q: "（a）求 A＋B。", answer: [[3, -4], [6, -5]] },
        { q: "（b）求 B−2C。", answer: [[-1, 1], [6, -7]] },
        { q: "（c）求 A＋B−2C。", answer: [[1, -2], [8, -7]] },
      ],
    },
    {
      id: "exer11A-6", hash: "exer11A-6", group: "exer11A", title: "練習 11A 第 6 題", tag: "程度 1",
      lead: "設 A、B 如下，及 C＝−I₂−B−2A。求 3C＋6A＋2B。",
      given: [
        { name: "A", matrix: [[8, -3], [0, -8]] },
        { name: "B", matrix: [[-9, 5], [4, 6]] },
      ],
      tasks: [{ q: "求 3C＋6A＋2B。", answer: [[6, -5], [-4, -9]] }],
    },
    {
      id: "exer11A-7", hash: "exer11A-7", group: "exer11A", title: "練習 11A 第 7 題", tag: "程度 1",
      lead: "設 A、B 如下，及 C＝5I₂＋2A＋B。求 2C−2(4I₂＋B)−3A。",
      given: [
        { name: "A", matrix: [[0, -1], [2, -5]] },
        { name: "B", matrix: [[-3, 5], [0, -2]] },
      ],
      tasks: [{ q: "求 2C−2(4I₂＋B)−3A。", answer: [[2, -1], [2, -3]] }],
    },
    {
      id: "exer11A-8", hash: "exer11A-8", group: "exer11A", title: "練習 11A 第 8 題", tag: "程度 1",
      lead: "已知 A 及 B 如下。若 A＝−B，求 x 和 y 的值。",
      given: [
        { name: "A", matrix: [[2, 3], ["x", 2]] },
        { name: "B", matrix: [[-2, "y"], [0, -2]] },
      ],
      tasks: [{ q: "求 x 和 y。", unknowns: { x: 0, y: -3 } }],
    },
    /* ---- 練習 11B ---- */
    {
      id: "exer11B-16", hash: "exer11B-16", group: "exer11B", title: "練習 11B 第 1–6 題", tag: "程度 1",
      lead: "設 A＝(3  0)，B＝(3  2)，以及 C、D、E 如下。求下列各項。",
      given: [
        { name: "A", matrix: [[3, 0]] },
        { name: "B", matrix: [[3, 2]] },
        { name: "C", matrix: [[2], [1]] },
        { name: "D", matrix: [[1, 2], [0, 1]] },
        { name: "E", matrix: [[-1, 1], [-2, 3]] },
      ],
      tasks: [
        { q: "1. 求 AC。", answer: [[6]] },
        { q: "2. 求 CB。", answer: [[6, 4], [3, 2]] },
        { q: "3. 求 EC。", answer: [[-1], [-1]] },
        { q: "4. 求 DE。", answer: [[-5, 7], [-2, 3]] },
        { q: "5. 求 (D＋2E)C。", answer: [[2], [-1]] },
        { q: "6. 求 BE−(1/2)AD。", answer: [[-8.5, 6]] },
      ],
    },
    {
      id: "exer11B-7", hash: "exer11B-7", group: "exer11B", title: "練習 11B 第 7 題", tag: "程度 1",
      lead: "設 A、B 及 C 如下。求 (a) AC；(b) B(AC)。",
      given: [
        { name: "A", matrix: [[2, 1, 0], [3, 4, 6], [-1, 1, 0]] },
        { name: "B", matrix: [[1, 0, -1]] },
        { name: "C", matrix: [[2], [2], [6]] },
      ],
      tasks: [
        { q: "（a）求 AC。", answer: [[6], [50], [0]] },
        { q: "（b）求 B(AC)。", answer: [[6]] },
      ],
    },
    {
      id: "exer11B-8", hash: "exer11B-8", group: "exer11B", title: "練習 11B 第 8 題", tag: "程度 1",
      lead: "設 A、B 及 C 如下。求 (a) BC；(b) B(CB)−B(CA)。",
      given: [
        { name: "A", matrix: [[2, 0, 1], [0, 0, 2], [1, 4, 1]] },
        { name: "B", matrix: [[2, 0, 2], [1, 0, 2], [1, 3, 1]] },
        { name: "C", matrix: [[1, 0, 1], [0, 1, 0], [0, 0, 1]] },
      ],
      tasks: [
        { q: "（a）求 BC。", answer: [[2, 0, 4], [1, 0, 3], [1, 3, 2]] },
        { q: "（b）求 B(CB)−B(CA)。", answer: [[0, -4, 2], [0, -3, 1], [3, -2, 1]] },
      ],
    },
    {
      id: "exer11B-911", hash: "exer11B-911", group: "exer11B", title: "練習 11B 第 9–11 題", tag: "矩陣的冪",
      lead: "求下列各方矩陣的冪。",
      given: [],
      tasks: [
        { q: "9. 求 [[3, 0], [0, −2]]³。", answer: [[27, 0], [0, -8]] },
        { q: "10. 求 [[1, 0], [2, 1]]⁴。", answer: [[1, 0], [8, 1]] },
        { q: "11. 求 [[1, 0, 0], [−1, 1, 0], [0, 1, 1]]³。", answer: [[1, 0, 0], [-3, 1, 0], [-3, 3, 1]] },
      ],
    },
    {
      id: "exer11B-1213", hash: "exer11B-1213", group: "exer11B", title: "練習 11B 第 12–13 題", tag: "列方程",
      lead: "根據矩陣相等的定義求未知數。",
      given: [],
      tasks: [
        { q: "12. 若 [[6, −x], [2y, 1]][[3], [7]]＝[[2x], [7y]]，求 x 和 y。", unknowns: { x: 2, y: 7 } },
        { q: "13. 若 [[-2, x], [9y, −5]][[-4], [2]]＝[[6x], [−6y]]，求 x 和 y。", unknowns: { x: 2, y: -1 / 3 } },
      ],
    },
  ];

  const PRESETS = [
    { id: "add-ok", title: "加減（同階）", A: [[2, 7, -3], [0, 9, -6]], B: [[-5, 0, -2], [-1, -7, 0]], op: "add" },
    { id: "add-bad", title: "加減（不同階）", A: [[1, 2], [3, 4]], B: [[1, 2, 3]], op: "add" },
    { id: "scalar", title: "純量乘法", A: [[4, 0], [3, -2]], B: [[1, 0], [0, 1]], k: 3, op: "scalar" },
    { id: "ab-ba", title: "AB 與 BA", A: [[2, 3]], B: [[5], [-3]], op: "mul" },
    { id: "ab0", title: "AB＝0 但非零", A: [[2, 4], [-1, -2]], B: [[2, 0], [-1, 0]], op: "mul" },
    { id: "power", title: "矩陣的冪", A: [[3, 0], [0, -2]], B: [[1, 0], [0, 1]], n: 3, op: "pow" },
  ];

  const opsState = {
    group: "ops",
    item: "ops",
    revealed: false,
    preset: "add-ok",
    k: 3,
    n: 2,
    A: [[2, 7, -3], [0, 9, -6]],
    B: [[-5, 0, -2], [-1, -7, 0]],
    lastOp: "add",
  };

  const HASH = {};
  ITEMS.forEach((it) => {
    HASH[it.hash] = it;
    HASH[it.id] = it;
  });
  GROUPS.forEach((g) => {
    if (!HASH[g.hash]) HASH[g.hash] = { groupOnly: g.id };
  });
  HASH["exer11A"] = { groupOnly: "exer11A" };
  HASH["exer11B"] = { groupOnly: "exer11B" };
  HASH["ch11.2"] = { groupOnly: "ops" };

  function ui() {
    return window.LabUI;
  }

  function fmt(v) {
    if (typeof v === "string") return v;
    if (typeof v !== "number" || !Number.isFinite(v)) return String(v);
    if (Math.abs(v - Math.round(v)) < 1e-10) return String(Math.round(v)).replace("-", "−");
    for (const d of [2, 3, 4, 8, 6, 5]) {
      const n = Math.round(v * d);
      if (Math.abs(v * d - n) < 1e-8) {
        const g = gcd(Math.abs(n), d);
        const nn = n / g;
        const dd = d / g;
        if (dd === 1) return String(nn).replace("-", "−");
        const sign = nn < 0 ? "−" : "";
        return sign + "\\dfrac{" + Math.abs(nn) + "}{" + dd + "}";
      }
    }
    return String(v);
  }
  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = a % b; a = b; b = t; }
    return a || 1;
  }
  function displayMatrix(M) {
    return M.map((row) => row.map((v) => (typeof v === "string" ? v : fmt(v))));
  }

  function dim(M) {
    return { r: M.length, c: M[0].length };
  }
  function sameOrder(A, B) {
    const a = dim(A), b = dim(B);
    return a.r === b.r && a.c === b.c;
  }
  function add(A, B, sign) {
    if (!sameOrder(A, B)) return null;
    const s = sign == null ? 1 : sign;
    return A.map((row, i) => row.map((v, j) => Number(v) + s * Number(B[i][j])));
  }
  function scale(k, A) {
    return A.map((row) => row.map((v) => k * Number(v)));
  }
  function mul(A, B) {
    const a = dim(A), b = dim(B);
    if (a.c !== b.r) return null;
    const C = [];
    for (let i = 0; i < a.r; i++) {
      const row = [];
      for (let j = 0; j < b.c; j++) {
        let s = 0;
        for (let t = 0; t < a.c; t++) s += Number(A[i][t]) * Number(B[t][j]);
        row.push(s);
      }
      C.push(row);
    }
    return C;
  }
  function pow(A, n) {
    const a = dim(A);
    if (a.r !== a.c || n < 1 || !Number.isInteger(n)) return null;
    let P = A.map((row) => row.slice());
    for (let k = 1; k < n; k++) {
      P = mul(P, A);
      if (!P) return null;
    }
    return P;
  }
  function parseMat(strRows, fallback) {
    /* keep numeric */
    return fallback;
  }

  function loadPreset(id) {
    const p = PRESETS.find((x) => x.id === id) || PRESETS[0];
    opsState.preset = p.id;
    opsState.A = p.A.map((r) => r.slice());
    opsState.B = p.B.map((r) => r.slice());
    if (p.k != null) opsState.k = p.k;
    if (p.n != null) opsState.n = p.n;
    opsState.lastOp = p.op;
  }

  function resultOf(op) {
    const A = opsState.A, B = opsState.B;
    if (op === "add") return { label: "A＋B", M: add(A, B, 1) };
    if (op === "sub") return { label: "A−B", M: add(A, B, -1) };
    if (op === "scalar") return { label: fmt(opsState.k) + "A", M: scale(Number(opsState.k), A) };
    if (op === "mul") return { label: "AB", M: mul(A, B) };
    if (op === "mulBA") return { label: "BA", M: mul(B, A) };
    if (op === "pow") return { label: "A^{" + opsState.n + "}", M: pow(A, Number(opsState.n)) };
    return { label: "", M: null };
  }

  function renderPlayground(stage) {
    const L = ui();
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "運算示範";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = "調好兩個矩陣後，選一種運算。若該運算未定義，頁面會直接說明原因。可用下面的情境一次載入書上的對照例子。";
    stage.appendChild(title);
    stage.appendChild(lead);

    const bar = document.createElement("div");
    bar.className = "op-row";
    PRESETS.forEach((p) => {
      const b = L.button(p.title, "btn" + (opsState.preset === p.id ? " btn-primary" : ""), () => {
        loadPreset(p.id);
        renderOps();
      });
      bar.appendChild(b);
    });
    stage.appendChild(bar);

    const pair = document.createElement("div");
    pair.className = "given-row";
    pair.appendChild(editBlock("A", "A"));
    pair.appendChild(editBlock("B", "B"));
    stage.appendChild(pair);

    const ctrls = document.createElement("div");
    ctrls.className = "controls";
    ctrls.appendChild(numField("純量 k", "k", opsState.k, (v) => { opsState.k = v; }));
    ctrls.appendChild(numField("冪的次數 n", "n", opsState.n, (v) => { opsState.n = Math.max(1, Math.round(v)); }));
    stage.appendChild(ctrls);

    const ops = document.createElement("div");
    ops.className = "op-row";
    [
      ["add", "A＋B"],
      ["sub", "A−B"],
      ["scalar", "kA"],
      ["mul", "AB"],
      ["mulBA", "BA"],
      ["pow", "Aⁿ"],
    ].forEach(([op, lab]) => {
      const b = L.button(lab, "btn" + (opsState.lastOp === op ? " btn-primary" : ""), () => {
        opsState.lastOp = op;
        renderOps();
      });
      ops.appendChild(b);
    });
    stage.appendChild(ops);

    const res = resultOf(opsState.lastOp);
    const out = document.createElement("div");
    out.className = "panel";
    const h = document.createElement("p");
    h.className = "kicker";
    h.appendChild(L.texSpan ? L.texSpan(res.label) : document.createTextNode(res.label));
    out.appendChild(h);
    if (res.M) {
      out.appendChild(L.namedMatrix({ name: res.label, matrix: displayMatrix(res.M) }, { showSub: false }));
      const o = dim(res.M);
      const p = document.createElement("p");
      p.className = "order-line";
      p.textContent = "結果是 " + o.r + "×" + o.c + " 矩陣。";
      out.appendChild(p);
    } else {
      const u = document.createElement("p");
      u.className = "undef";
      u.textContent = undefinedReason(opsState.lastOp);
      out.appendChild(u);
    }
    stage.appendChild(out);
  }

  function undefinedReason(op) {
    const a = dim(opsState.A), b = dim(opsState.B);
    if (op === "add" || op === "sub") {
      return "A 的階是 " + a.r + "×" + a.c + "，B 的階是 " + b.r + "×" + b.c + "。階不相同，加減法未定義。";
    }
    if (op === "mul") {
      return "A 是 " + a.r + "×" + a.c + " 矩陣，B 是 " + b.r + "×" + b.c + " 矩陣。A 的列數必須等於 B 的行數，AB 才有定義。";
    }
    if (op === "mulBA") {
      return "B 是 " + b.r + "×" + b.c + " 矩陣，A 是 " + a.r + "×" + a.c + " 矩陣。B 的列數必須等於 A 的行數，BA 才有定義。";
    }
    if (op === "pow") {
      return "只有方矩陣才能求 n 次冪。A 的階是 " + a.r + "×" + a.c + "，不是方矩陣。";
    }
    return "這個運算未定義。";
  }

  function editBlock(label, which) {
    const L = ui();
    const box = document.createElement("div");
    box.className = "panel";
    const M = which === "A" ? opsState.A : opsState.B;
    const d = dim(M);
    const head = document.createElement("p");
    head.style.fontWeight = "700";
    head.textContent = label + "（" + d.r + "×" + d.c + "）";
    box.appendChild(head);
    const steppers = document.createElement("div");
    steppers.className = "controls";
    steppers.appendChild(stepper("行", d.r, (n) => resize(which, n, d.c)));
    steppers.appendChild(stepper("列", d.c, (n) => resize(which, d.r, n)));
    box.appendChild(steppers);
    box.appendChild(L.buildMatrix(displayMatrix(M).map((row, i) => row.map((_, j) => String(M[i][j]))), {
      editable: true,
      showSub: true,
      namePlain: label,
    }));
    // hook inputs after render: buildMatrix writes into its own values if we pass a live matrix
    // LabUI.buildMatrix editable writes to LabUI.state.values — not ours.
    // Use our own simple table instead for reliability.
    box.removeChild(box.lastChild);
    box.appendChild(simpleEditTable(which, M));
    return box;
  }

  function simpleEditTable(which, M) {
    const L = ui();
    const wrap = document.createElement("div");
    wrap.className = "mtx-block";
    const mtx = document.createElement("div");
    mtx.className = "mtx";
    const brL = document.createElement("div"); brL.className = "br br-l"; brL.setAttribute("aria-hidden", "true");
    const brR = document.createElement("div"); brR.className = "br br-r"; brR.setAttribute("aria-hidden", "true");
    const table = document.createElement("table");
    const tb = document.createElement("tbody");
    for (let i = 0; i < M.length; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < M[0].length; j++) {
        const td = document.createElement("td");
        const inp = document.createElement("input");
        inp.className = "entry";
        inp.type = "text";
        inp.value = String(M[i][j]);
        inp.setAttribute("aria-label", which + " 第 " + (i + 1) + " 行第 " + (j + 1) + " 列");
        inp.addEventListener("change", () => {
          const v = Number(String(inp.value).replace("−", "-"));
          M[i][j] = Number.isFinite(v) ? v : 0;
        });
        td.appendChild(inp);
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    table.appendChild(tb);
    mtx.appendChild(brL); mtx.appendChild(table); mtx.appendChild(brR);
    wrap.appendChild(mtx);
    return wrap;
  }

  function resize(which, r, c) {
    r = Math.max(1, Math.min(5, r));
    c = Math.max(1, Math.min(5, c));
    const src = which === "A" ? opsState.A : opsState.B;
    const next = [];
    for (let i = 0; i < r; i++) {
      const row = [];
      for (let j = 0; j < c; j++) row.push(src[i] && src[i][j] != null ? src[i][j] : 0);
      next.push(row);
    }
    if (which === "A") opsState.A = next;
    else opsState.B = next;
    renderOps();
  }

  function stepper(label, value, onChange) {
    const L = ui();
    const box = document.createElement("div");
    box.className = "stepper";
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.disabled = value <= 1;
    minus.addEventListener("click", () => onChange(value - 1));
    const val = document.createElement("span");
    val.className = "val num";
    val.textContent = String(value);
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "＋";
    plus.disabled = value >= 5;
    plus.addEventListener("click", () => onChange(value + 1));
    box.appendChild(lbl); box.appendChild(minus); box.appendChild(val); box.appendChild(plus);
    return box;
  }

  function numField(label, id, value, onChange) {
    const wrap = document.createElement("label");
    wrap.style.display = "inline-flex";
    wrap.style.alignItems = "center";
    wrap.style.gap = "8px";
    wrap.style.fontWeight = "600";
    wrap.textContent = label + " ";
    const inp = document.createElement("input");
    inp.type = "number";
    inp.value = String(value);
    inp.style.width = "4.5em";
    inp.style.minHeight = "40px";
    inp.style.textAlign = "center";
    inp.addEventListener("change", () => {
      const v = Number(inp.value);
      if (Number.isFinite(v)) onChange(v);
    });
    wrap.appendChild(inp);
    return wrap;
  }

  function itemsInGroup(gid) {
    return ITEMS.filter((it) => it.group === gid);
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
    if (item.formula) {
      const f = document.createElement("p");
      f.style.fontSize = "20px";
      f.appendChild(L.texSpan(item.formula, true));
      f.firstChild && f.firstChild.setAttribute && f.firstChild.setAttribute("data-display", "1");
      stage.appendChild(f);
    }
    if (item.given && item.given.length) {
      const row = document.createElement("div");
      row.className = "given-row";
      item.given.forEach((g) => {
        row.appendChild(L.namedMatrix({ name: g.name, matrix: displayMatrix(g.matrix) }, { showSub: true }));
      });
      stage.appendChild(row);
    }
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(L.button(opsState.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
      opsState.revealed = !opsState.revealed;
      renderOps();
    }));
    if (item.given && item.given[0] && item.given[0].matrix && typeof item.given[0].matrix[0][0] === "number") {
      actions.appendChild(L.button("載入到運算示範", "btn-quiet", () => {
        const A = item.given[0].matrix;
        const B = (item.given[1] && item.given[1].matrix) || [[1]];
        if (typeof A[0][0] === "number") {
          opsState.A = A.map((r) => r.slice());
          if (typeof B[0][0] === "number") opsState.B = B.map((r) => r.slice());
        }
        opsState.group = "ops";
        opsState.item = "ops";
        sync();
        renderOps();
      }));
    }
    stage.appendChild(actions);

    if (!opsState.revealed) {
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
      h.textContent = t.q.replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, "($1/$2)");
      box.appendChild(h);
      if (t.undefined) {
        const u = document.createElement("p");
        u.className = "undef";
        u.textContent = "未定義。" + (t.why ? t.why : "");
        box.appendChild(u);
      } else if (t.unknowns) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = Object.keys(t.unknowns).map((k) => k + "＝" + String(fmt(t.unknowns[k])).replace("\\dfrac{", "").replace("}{", "/").replace("}", "")).join("，") + "。";
        // better typeset
        p.textContent = "";
        const parts = Object.keys(t.unknowns);
        parts.forEach((k, i) => {
          p.appendChild(L.texSpan(k + "=" + fmt(t.unknowns[k])));
          if (i < parts.length - 1) p.appendChild(document.createTextNode("，"));
        });
        p.appendChild(document.createTextNode("。"));
        box.appendChild(p);
      } else if (t.text) {
        const p = document.createElement("p");
        p.textContent = t.text;
        box.appendChild(p);
      } else if (t.answer) {
        box.appendChild(L.namedMatrix({ name: "", matrix: displayMatrix(t.answer) }, { showSub: false }));
        if (t.note) {
          const n = document.createElement("p");
          n.textContent = t.note;
          box.appendChild(n);
        }
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
    if (item.notes) {
      const n = document.createElement("p");
      n.className = "muted";
      n.textContent = item.notes;
      stage.appendChild(n);
    }
  }

  function renderGroupBar() {
    const L = ui();
    const host = L.els.items;
    host.innerHTML = "";
    const list = opsState.group === "ops" ? [] : itemsInGroup(opsState.group);
    list.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", it.id === opsState.item ? "true" : "false");
      b.innerHTML = it.title + (it.tag ? '<span class="tag">' + it.tag + "</span>" : "");
      b.addEventListener("click", () => {
        opsState.item = it.id;
        opsState.revealed = false;
        sync();
        renderOps();
      });
      host.appendChild(b);
    });
  }

  function renderOps() {
    const L = ui();
    document.getElementById("modes-111").hidden = true;
    document.getElementById("modes-112").hidden = false;
    const m113 = document.getElementById("modes-113");
    if (m113) m113.hidden = true;
    document.getElementById("notes-111").hidden = true;
    document.getElementById("notes-112").hidden = false;
    const n113 = document.getElementById("notes-113");
    if (n113) n113.hidden = true;
    document.getElementById("brand-sub").textContent = "馬Sir教室 · 中五 M2 · §11.2 矩陣的運算";
    document.querySelectorAll("#chapters [data-chapter]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-chapter") === "11.2" ? "true" : "false");
    });
    document.querySelectorAll("#modes-112 [data-ops]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-ops") === opsState.group ? "true" : "false");
    });
    L.els.notes.hidden = !L.state.notesOpen;
    L.els.notesBtn.setAttribute("aria-pressed", L.state.notesOpen ? "true" : "false");
    renderGroupBar();
    const stage = L.els.stage;
    stage.innerHTML = "";
    if (opsState.group === "ops" || opsState.item === "ops") {
      renderPlayground(stage);
    } else {
      const item = ITEMS.find((it) => it.id === opsState.item) || itemsInGroup(opsState.group)[0];
      if (item) renderItem(stage, item);
    }
    L.typeset(document);
  }

  function sync() {
    let h = "ops";
    if (opsState.item && opsState.item !== "ops") {
      const it = ITEMS.find((x) => x.id === opsState.item);
      h = (it && it.hash) || opsState.group;
    } else {
      h = opsState.group === "ops" ? "ops" : opsState.group;
    }
    if (location.hash.replace(/^#/, "") !== h) history.replaceState(null, "", "#" + h);
  }

  function hasHash(raw) {
    if (!raw) return false;
    if (raw === "ch11.2" || raw === "ops" || raw === "add" || raw === "scalar" || raw === "mul" || raw === "power" || raw === "exer11A" || raw === "exer11B") return true;
    return !!HASH[raw];
  }

  function apply(raw) {
    if (!raw || raw === "ch11.2" || raw === "ops") {
      opsState.group = "ops";
      opsState.item = "ops";
      return;
    }
    if (GROUPS.some((g) => g.id === raw)) {
      opsState.group = raw;
      const list = itemsInGroup(raw);
      opsState.item = list.length ? list[0].id : "ops";
      opsState.revealed = false;
      return;
    }
    const it = HASH[raw];
    if (it && it.group) {
      opsState.group = it.group;
      opsState.item = it.id;
      opsState.revealed = false;
    } else if (it && it.groupOnly) {
      opsState.group = it.groupOnly;
      const list = itemsInGroup(it.groupOnly);
      opsState.item = list.length ? list[0].id : it.groupOnly;
      opsState.revealed = false;
    }
  }

  function bind() {
    document.querySelectorAll("#modes-112 [data-ops]").forEach((b) => {
      b.addEventListener("click", () => {
        const g = b.getAttribute("data-ops");
        opsState.group = g;
        opsState.revealed = false;
        if (g === "ops") opsState.item = "ops";
        else {
          const list = itemsInGroup(g);
          opsState.item = list[0] ? list[0].id : g;
        }
        sync();
        renderOps();
      });
    });
  }

  window.LabOps = {
    hasHash,
    apply,
    render: renderOps,
    bind,
    ITEMS,
    add, scale, mul, pow,
  };
})();
