/* §11.4 方矩陣的逆矩陣 — 馬Sir教室。本節以乘法驗證逆矩陣；本課程只學 2 階和 3 階。 */
(function () {
  "use strict";

  const GROUPS = [
    { id: "inv", title: "逆矩陣示範", hash: "inv" },
    { id: "inv-def", title: "定義與定理", hash: "inv-def" },
    { id: "inv-prop", title: "逆矩陣的性質", hash: "inv-prop" },
    { id: "inv-ex", title: "例題與課堂練習", hash: "inv-ex" },
    { id: "exer11D", title: "練習 11D", hash: "exer11D" },
    { id: "assess11.4", title: "階段評估 11.4", hash: "assess11.4" },
  ];

  const ITEMS = [
    {
      id: "def11.10", hash: "def11.10", group: "inv-def", title: "定義 11.10", tag: "引入",
      lead: "先看一對 2 階方矩陣。若 AB＝BA＝I₂，則 A 是非奇異（或可逆）的，B 是 A 的逆矩陣，記作 A⁻¹。非方矩陣的逆矩陣是未定義的。",
      given: [
        { name: "A", matrix: [[3, 5], [-1, -2]] },
        { name: "B", matrix: [[2, 5], [-1, -3]] },
      ],
      loadAB: { A: [[3, 5], [-1, -2]], B: [[2, 5], [-1, -3]] },
      tasks: [
        { q: "驗證 AB＝BA＝I₂。", type: "verify", A: [[3, 5], [-1, -2]], B: [[2, 5], [-1, -3]] },
      ],
    },
    {
      id: "singular", hash: "singular", group: "inv-def", title: "奇異矩陣", tag: "反例",
      lead: "不是每個方矩陣都有逆矩陣。設 A 如下。對任意 2×2 矩陣 B，AB 的第一行都是零，故 AB 不可能等於 I₂。這樣的方矩陣稱為奇異的。",
      given: [{ name: "A", matrix: [[0, 0], [0, 1]] }],
      loadAB: { A: [[0, 0], [0, 1]], B: [[1, 0], [0, 1]] },
      tasks: [
        { q: "任取 B＝I₂，計算 AB，並說明 A 沒有逆矩陣。", type: "verify", A: [[0, 0], [0, 1]], B: [[1, 0], [0, 1]], expectInverse: false,
          steps: ["AB 的第一行是 (0, 0)，不可能等於 I₂ 的第一行。無論怎樣改 B，A 的第一行是零，AB 的第一行仍是零。故 A 是奇異的。"] },
      ],
    },
    {
      id: "thm11.2", hash: "thm11.2", group: "inv-def", title: "定理 11.2", tag: "存在",
      lead: "設 A、B 為 n 階方矩陣。若 AB＝Iₙ，則 BA＝Iₙ，因而 B 是 A 的逆矩陣。本節只需用乘法驗證某矩陣是否為逆矩陣；求非奇異矩陣之逆的一般方法留待下一節。定理的證明見書末附錄，不做成 App 模式。",
      given: [
        { name: "A", matrix: [[3, 5], [-1, -2]] },
        { name: "B", matrix: [[2, 5], [-1, -3]] },
      ],
      loadAB: { A: [[3, 5], [-1, -2]], B: [[2, 5], [-1, -3]] },
      tasks: [
        { q: "先算 AB。若 AB＝I₂，則由定理 11.2，BA 也等於 I₂，B 就是 A 的逆矩陣。", type: "verify", A: [[3, 5], [-1, -2]], B: [[2, 5], [-1, -3]],
          steps: ["AB＝I₂ 已足夠斷定 B＝A⁻¹，不必先算出 BA。課堂上仍可再算 BA 作為核對。"] },
      ],
    },
    {
      id: "check11.3", hash: "check11.3", group: "inv-def", title: "概念測試站 11.3", tag: "驗證",
      lead: "驗證下列各對矩陣是否互為逆矩陣。",
      tasks: [
        { q: "（a）", type: "verify", A: [[8, 5], [3, 2]], B: [[2, -5], [-3, 8]] },
        { q: "（b）設 α≠0。", type: "verify-symbol",
          A: [["\\alpha", 1], [2, "\\dfrac{1}{\\alpha}"]],
          B: [["-\\dfrac{1}{\\alpha}", 1], [2, "-\\alpha"]],
          steps: [
            "AB 的 (1,1) 項：α(−1/α)＋1·2＝1。",
            "AB 的 (1,2) 項：α·1＋1·(−α)＝0。",
            "AB 的 (2,1) 項：2(−1/α)＋(1/α)·2＝0。",
            "AB 的 (2,2) 項：2·1＋(1/α)(−α)＝1。",
            "故 AB＝I₂。由定理 11.2，B 是 A 的逆矩陣。",
          ] },
        { q: "（c）", type: "verify", A: [[2, 1, 2], [-3, 0, -1], [-4, -1, -3]], B: [[1, -1, 1], [5, -2, 4], [-3, 2, -3]] },
      ],
    },
    {
      id: "thm11.3", hash: "thm11.3", group: "inv-def", title: "定理 11.3", tag: "唯一",
      lead: "非奇異矩陣的逆矩陣是唯一的。短證明可揭曉核對，不必另開證明模式。",
      tasks: [
        { q: "設 B、C 都是 A 的逆矩陣，證明 B＝C。", type: "proof",
          steps: [
            "因為 C 是 A 的逆矩陣，故 AC＝I。",
            "B＝BI＝B(AC)＝(BA)C。",
            "又因 B 是 A 的逆矩陣，BA＝I，故 (BA)C＝IC＝C。",
            "因此 B＝C，逆矩陣是唯一的。",
          ] },
      ],
    },
    {
      id: "thm11.4", hash: "thm11.4", group: "inv-prop", title: "定理 11.4", tag: "性質",
      lead: "設 A、B 為同階非奇異矩陣，λ 為非零純量。（a）(A⁻¹)⁻¹＝A；（b）(λA)⁻¹＝(1/λ)A⁻¹；（c）(AB)⁻¹＝B⁻¹A⁻¹。一般來說 (AB)⁻¹≠A⁻¹B⁻¹，且 (A＋B)⁻¹≠A⁻¹＋B⁻¹。下面用例 11.17 的矩陣核對（c）。",
      given: [
        { name: "A", matrix: [[7, -2], [-3, 1]] },
        { name: "B", matrix: [[2, -3], [-1, 2]] },
      ],
      tasks: [
        { q: "已證 A⁻¹＝[[1,2],[3,7]]，B⁻¹＝[[2,3],[1,2]]。求 B⁻¹A⁻¹ 和 A⁻¹B⁻¹，並比較 (AB)⁻¹。", type: "products",
          products: [
            { label: "B^{-1}A^{-1}", left: [[2, 3], [1, 2]], right: [[1, 2], [3, 7]], answer: [[11, 25], [7, 16]] },
            { label: "A^{-1}B^{-1}", left: [[1, 2], [3, 7]], right: [[2, 3], [1, 2]], answer: [[4, 7], [13, 23]] },
          ],
          steps: ["(AB)⁻¹＝B⁻¹A⁻¹，一般不等於 A⁻¹B⁻¹。也不要把 (A＋B)⁻¹ 寫成 A⁻¹＋B⁻¹。"] },
      ],
    },
    {
      id: "thm11.5", hash: "thm11.5", group: "inv-prop", title: "定理 11.5", tag: "冪",
      lead: "設 A 為非奇異矩陣，k 為正整數。則 (Aᵏ)⁻¹＝(A⁻¹)ᵏ。形式證明不必做成 App 模式，下面用例 11.18 的矩陣核對 k＝2。",
      given: [{ name: "P", matrix: [[3, 1], [5, 2]] }],
      tasks: [
        { q: "已知 P⁻¹＝[[2,−1],[−5,3]]。求 (P²)⁻¹。", type: "products",
          products: [
            { label: "(P^{-1})^{2}", left: [[2, -1], [-5, 3]], right: [[2, -1], [-5, 3]], answer: [[9, -5], [-25, 14]] },
          ],
          steps: ["由定理 11.5，(P²)⁻¹＝(P⁻¹)²。"] },
      ],
    },
    {
      id: "ex11.17", hash: "ex11.17", group: "inv-ex", title: "例 11.17", tag: "驗證",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[7, -2], [-3, 1]] },
        { name: "B", matrix: [[2, -3], [-1, 2]] },
      ],
      loadAB: { A: [[7, -2], [-3, 1]], B: [[2, -3], [-1, 2]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[1,2],[3,7]] 及 B⁻¹＝[[2,3],[1,2]]。", type: "verify-claims",
          claims: [
            { of: "A", A: [[7, -2], [-3, 1]], inv: [[1, 2], [3, 7]] },
            { of: "B", A: [[2, -3], [-1, 2]], inv: [[2, 3], [1, 2]] },
          ] },
        { q: "（b）求 B⁻¹A⁻¹ 和 A⁻¹B⁻¹。", type: "products",
          products: [
            { label: "B^{-1}A^{-1}", left: [[2, 3], [1, 2]], right: [[1, 2], [3, 7]], answer: [[11, 25], [7, 16]] },
            { label: "A^{-1}B^{-1}", left: [[1, 2], [3, 7]], right: [[2, 3], [1, 2]], answer: [[4, 7], [13, 23]] },
          ] },
        { q: "（c）證明 (AB)⁻¹＝B⁻¹A⁻¹，並由此證明 (AB)⁻¹≠A⁻¹B⁻¹。", type: "compare",
          leftLabel: "(AB)^{-1}=B^{-1}A^{-1}", left: [[11, 25], [7, 16]],
          rightLabel: "A^{-1}B^{-1}", right: [[4, 7], [13, 23]],
          equal: false },
      ],
    },
    {
      id: "qp11.17", hash: "qp11.17", group: "inv-ex", title: "課堂練習 11.17", tag: "驗證",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[1, -3], [1, -2]] },
        { name: "B", matrix: [[-5, -3], [2, 1]] },
      ],
      loadAB: { A: [[1, -3], [1, -2]], B: [[-5, -3], [2, 1]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[−2,3],[−1,1]] 及 B⁻¹＝[[1,3],[−2,−5]]。", type: "verify-claims",
          claims: [
            { of: "A", A: [[1, -3], [1, -2]], inv: [[-2, 3], [-1, 1]] },
            { of: "B", A: [[-5, -3], [2, 1]], inv: [[1, 3], [-2, -5]] },
          ] },
        { q: "（b）求 B⁻¹A⁻¹ 和 A⁻¹B⁻¹。", type: "products",
          products: [
            { label: "B^{-1}A^{-1}", left: [[1, 3], [-2, -5]], right: [[-2, 3], [-1, 1]], answer: [[-5, 6], [9, -11]] },
            { label: "A^{-1}B^{-1}", left: [[-2, 3], [-1, 1]], right: [[1, 3], [-2, -5]], answer: [[-8, -21], [-3, -8]] },
          ] },
        { q: "（c）(AB)⁻¹＝A⁻¹B⁻¹ 是否正確？", type: "yesno", answer: false,
          steps: ["(AB)⁻¹＝B⁻¹A⁻¹＝[[−5,6],[9,−11]]，與 A⁻¹B⁻¹＝[[−8,−21],[−3,−8]] 不同，故不正確。"] },
      ],
    },
    {
      id: "extra11.17", hash: "extra11.17", group: "inv-ex", title: "附加例題 11.17", tag: "驗證",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[2, -1], [-5, 3]] },
        { name: "B", matrix: [[4, 3], [-3, -2]] },
      ],
      loadAB: { A: [[2, -1], [-5, 3]], B: [[4, 3], [-3, -2]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[3,1],[5,2]] 及 B⁻¹＝[[−2,−3],[3,4]]。", type: "verify-claims",
          claims: [
            { of: "A", A: [[2, -1], [-5, 3]], inv: [[3, 1], [5, 2]] },
            { of: "B", A: [[4, 3], [-3, -2]], inv: [[-2, -3], [3, 4]] },
          ] },
        { q: "（b）求 B⁻¹A⁻¹ 和 A⁻¹B⁻¹。", type: "products",
          products: [
            { label: "B^{-1}A^{-1}", left: [[-2, -3], [3, 4]], right: [[3, 1], [5, 2]], answer: [[-21, -8], [29, 11]] },
            { label: "A^{-1}B^{-1}", left: [[3, 1], [5, 2]], right: [[-2, -3], [3, 4]], answer: [[-3, -5], [-4, -7]] },
          ] },
        { q: "（c）證明 (AB)⁻¹≠A⁻¹B⁻¹。", type: "compare",
          leftLabel: "(AB)^{-1}=B^{-1}A^{-1}", left: [[-21, -8], [29, 11]],
          rightLabel: "A^{-1}B^{-1}", right: [[-3, -5], [-4, -7]],
          equal: false },
      ],
    },
    {
      id: "ex11.18", hash: "ex11.18", group: "inv-ex", title: "例 11.18", tag: "冪",
      lead: "已知 P 如下。求方矩陣的冪及其逆矩陣。",
      given: [{ name: "P", matrix: [[3, 1], [5, 2]] }],
      loadAB: { A: [[3, 1], [5, 2]], B: [[2, -1], [-5, 3]] },
      tasks: [
        { q: "（a）證明 P⁻¹＝[[2,−1],[−5,3]]。", type: "verify", A: [[3, 1], [5, 2]], B: [[2, -1], [-5, 3]] },
        { q: "（b）求 (P²)⁻¹。", type: "products",
          products: [
            { label: "(P^{-1})^{2}", left: [[2, -1], [-5, 3]], right: [[2, -1], [-5, 3]], answer: [[9, -5], [-25, 14]] },
          ],
          steps: ["(P²)⁻¹＝(P⁻¹)²。"] },
      ],
    },
    {
      id: "qp11.18", hash: "qp11.18", group: "inv-ex", title: "課堂練習 11.18", tag: "冪",
      lead: "已知 A 如下。",
      given: [{ name: "A", matrix: [[2, 11], [1, 5]] }],
      loadAB: { A: [[2, 11], [1, 5]], B: [[-5, 11], [1, -2]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[−5,11],[1,−2]]。", type: "verify", A: [[2, 11], [1, 5]], B: [[-5, 11], [1, -2]] },
        { q: "（b）求 (A³)⁻¹。", type: "matrix", answer: [[-257, 550], [50, -107]],
          steps: ["(A³)⁻¹＝(A⁻¹)³。先算 (A⁻¹)²＝[[36,−77],[−7,15]]，再右乘 A⁻¹ 得 (A⁻¹)³。"] },
      ],
    },
    {
      id: "extra11.18", hash: "extra11.18", group: "inv-ex", title: "附加例題 11.18", tag: "冪",
      lead: "已知 M 如下。",
      given: [{ name: "M", matrix: [[-3, 2], [-2, 1]] }],
      loadAB: { A: [[-3, 2], [-2, 1]], B: [[1, -2], [2, -3]] },
      tasks: [
        { q: "（a）證明 M⁻¹＝[[1,−2],[2,−3]]。", type: "verify", A: [[-3, 2], [-2, 1]], B: [[1, -2], [2, -3]] },
        { q: "（b）求 (M⁴)⁻¹。", type: "matrix", answer: [[-7, 8], [-8, 9]],
          steps: ["(M⁴)⁻¹＝(M⁻¹)⁴。先算 (M⁻¹)²＝[[−3,4],[−4,5]]，再平方一次。"] },
      ],
    },
    {
      id: "ex11.19", hash: "ex11.19", group: "inv-ex", title: "例 11.19", tag: "恆等式",
      lead: "設 A 為方矩陣，使得 A²＋2A＝I。證明 A 是非奇異的，及 A＋2I 是 A 的逆矩陣。",
      tasks: [
        { q: "證明。", type: "proof",
          steps: [
            "A(A＋2I)＝A²＋2A＝I。",
            "由定義（或定理 11.2），A 是非奇異的，且 A＋2I 是 A 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "qp11.19", hash: "qp11.19", group: "inv-ex", title: "課堂練習 11.19", tag: "恆等式",
      lead: "用同樣方法，把已知恆等式整理成「某矩陣乘某矩陣等於 I」。",
      tasks: [
        { q: "（a）設 A 為方矩陣，使得 2I−A²＝0。證明 A−I 是非奇異的，及 A＋I 是 A−I 的逆矩陣。", type: "proof",
          steps: [
            "2I−A²＝0 即 A²＝2I，或 (A−I)(A＋I)＝A²−I＝2I−I＝I。",
            "故 A−I 是非奇異的，且 A＋I 是 A−I 的逆矩陣。",
          ] },
        { q: "（b）設 B 為方矩陣，使得 3B²−B＋I＝0。證明 B 是非奇異的，及 I−3B 是 B 的逆矩陣。", type: "proof",
          steps: [
            "3B²−B＋I＝0 即 B−3B²＝I，亦即 B(I−3B)＝I。",
            "故 B 是非奇異的，且 I−3B 是 B 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "extra11.19", hash: "extra11.19", group: "inv-ex", title: "附加例題 11.19", tag: "恆等式",
      lead: "設 A 為方矩陣，使得 10A²−7A＝0。證明 5A−I 是非奇異的，及 2A−I 是 5A−I 的逆矩陣。",
      tasks: [
        { q: "證明。", type: "proof",
          steps: [
            "10A²−7A＝0 可寫成 (5A−I)(2A−I)＝10A²−5A−2A＋I＝10A²−7A＋I。",
            "因為 10A²−7A＝0，故 (5A−I)(2A−I)＝I。",
            "因此 5A−I 是非奇異的，且 2A−I 是 5A−I 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "ex11.20", hash: "ex11.20", group: "inv-ex", title: "例 11.20", tag: "求逆",
      lead: "已知 A 如下。先證明一個矩陣恆等式，再由此求出 A⁻¹。注意：矩陣與純量之和是未定義的，A²−5A≠A(A−5)。",
      given: [{ name: "A", matrix: [[4, 0], [-9, 1]] }],
      tasks: [
        { q: "（a）證明 A²−5A＋4I＝0。", type: "identity", M: [[4, 0], [-9, 1]], terms: [{ pow: 2, k: 1 }, { mat: true, k: -5 }, { I: true, k: 4 }] },
        { q: "（b）由此，求 A⁻¹。", type: "matrix", answer: [[1 / 4, 0], [9 / 4, 1]],
          steps: ["A²−5A＝−4I，A(A−5I)＝−4I，故 A[−(1/4)(A−5I)]＝I，A⁻¹＝−(1/4)(A−5I)＝[[1/4,0],[9/4,1]]。"] },
      ],
    },
    {
      id: "qp11.20", hash: "qp11.20", group: "inv-ex", title: "課堂練習 11.20", tag: "求逆",
      lead: "先證明恆等式，再由此求逆矩陣。",
      tasks: [
        { q: "（a）（i）已知 A 如下，證明 A²−A＋I＝0。", type: "identity", M: [[2, 1], [-3, -1]], terms: [{ pow: 2, k: 1 }, { mat: true, k: -1 }, { I: true, k: 1 }],
          show: { name: "A", matrix: [[2, 1], [-3, -1]] } },
        { q: "（a）（ii）由此，求 A⁻¹。", type: "matrix", answer: [[-1, -1], [3, 2]],
          steps: ["A²−A＝−I，A(A−I)＝−I，故 A⁻¹＝−(A−I)＝I−A＝[[−1,−1],[3,2]]。"] },
        { q: "（b）（i）已知 B 如下，證明 B²＋10B−3I＝0。", type: "identity", M: [[-1, 6], [2, -9]], terms: [{ pow: 2, k: 1 }, { mat: true, k: 10 }, { I: true, k: -3 }],
          show: { name: "B", matrix: [[-1, 6], [2, -9]] } },
        { q: "（b）（ii）由此，求 B⁻¹。", type: "matrix", answer: [[3, 2], [2 / 3, 1 / 3]],
          steps: ["B(B＋10I)＝3I，故 B⁻¹＝(1/3)(B＋10I)＝[[3,2],[2/3,1/3]]。"] },
      ],
    },
    {
      id: "extra11.20", hash: "extra11.20", group: "inv-ex", title: "附加例題 11.20", tag: "求逆",
      lead: "已知 P 如下。",
      given: [{ name: "P", matrix: [[6, 3], [-7, -4]] }],
      tasks: [
        { q: "（a）證明 P²−2P−3I＝0。", type: "identity", M: [[6, 3], [-7, -4]], terms: [{ pow: 2, k: 1 }, { mat: true, k: -2 }, { I: true, k: -3 }] },
        { q: "（b）由此，求 P⁻¹。", type: "matrix", answer: [[4 / 3, 1], [-7 / 3, -2]],
          steps: ["P(P−2I)＝3I，故 P⁻¹＝(1/3)(P−2I)＝[[4/3,1],[−7/3,−2]]。"] },
      ],
    },
    {
      id: "exer11D-1", hash: "exer11D-1", group: "exer11D", title: "練習 11D 第 1 題", tag: "程度 1",
      lead: "藉矩陣乘法，證明兩個矩陣互為逆矩陣。",
      given: [
        { name: "A", matrix: [[3, -4], [-5, 7]] },
        { name: "B", matrix: [[7, 4], [5, 3]] },
      ],
      loadAB: { A: [[3, -4], [-5, 7]], B: [[7, 4], [5, 3]] },
      tasks: [{ q: "證明兩矩陣互為逆矩陣。", type: "verify", A: [[3, -4], [-5, 7]], B: [[7, 4], [5, 3]] }],
    },
    {
      id: "exer11D-2", hash: "exer11D-2", group: "exer11D", title: "練習 11D 第 2 題", tag: "程度 1",
      lead: "藉矩陣乘法，證明兩個矩陣互為逆矩陣。",
      given: [
        { name: "A", matrix: [[-2, 2, -1], [1, -1, 1], [1, 0, 2]] },
        { name: "B", matrix: [[-2, -4, 1], [-1, -3, 1], [1, 2, 0]] },
      ],
      loadAB: { A: [[-2, 2, -1], [1, -1, 1], [1, 0, 2]], B: [[-2, -4, 1], [-1, -3, 1], [1, 2, 0]] },
      tasks: [{ q: "證明兩矩陣互為逆矩陣。", type: "verify", A: [[-2, 2, -1], [1, -1, 1], [1, 0, 2]], B: [[-2, -4, 1], [-1, -3, 1], [1, 2, 0]] }],
    },
    {
      id: "exer11D-3", hash: "exer11D-3", group: "exer11D", title: "練習 11D 第 3 題", tag: "程度 1",
      lead: "設 P＝diag(a, b, c)，其中 a、b 和 c 均為非零常數。證明 P⁻¹＝diag(1/a, 1/b, 1/c)。",
      tasks: [
        { q: "證明。", type: "proof",
          showA: [["a", 0, 0], [0, "b", 0], [0, 0, "c"]],
          showB: [["\\dfrac{1}{a}", 0, 0], [0, "\\dfrac{1}{b}", 0], [0, 0, "\\dfrac{1}{c}"]],
          steps: [
            "PP⁻¹ 的對角線元素是 a·(1/a)、b·(1/b)、c·(1/c)，均等於 1；其餘元素為 0。",
            "故 PP⁻¹＝I₃。由定理 11.2，所給的矩陣就是 P 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "exer11D-5", hash: "exer11D-5", group: "exer11D", title: "練習 11D 第 5 題", tag: "程度 1",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[2, 1], [0, "x"]] },
        { name: "B", matrix: [["\\dfrac{1}{2}", "y"], [0, 2]] },
      ],
      tasks: [
        { q: "（a）求 AB，答案以 x 和 y 表示。", type: "matrix", answer: [[1, "2y+2"], [0, "2x"]],
          steps: ["A 的第一列乘 B 的各列：第一行是 (1, 2y＋2)，第二行是 (0, 2x)。"] },
        { q: "（b）若 B 是 A 的逆矩陣，求 x 和 y 的值。", type: "unknowns", unknowns: { x: 1 / 2, y: -1 },
          steps: ["AB＝I₂，故 2y＋2＝0、2x＝1，得 x＝1/2，y＝−1。"] },
      ],
    },
    {
      id: "exer11D-6", hash: "exer11D-6", group: "exer11D", title: "練習 11D 第 6 題", tag: "程度 1",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[5, 2], [2, 1]] },
        { name: "B", matrix: [[-2, -11], [1, 6]] },
      ],
      loadAB: { A: [[5, 2], [2, 1]], B: [[-2, -11], [1, 6]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[1,−2],[−2,5]] 及 B⁻¹＝[[−6,−11],[1,2]]。", type: "verify-claims",
          claims: [
            { of: "A", A: [[5, 2], [2, 1]], inv: [[1, -2], [-2, 5]] },
            { of: "B", A: [[-2, -11], [1, 6]], inv: [[-6, -11], [1, 2]] },
          ] },
        { q: "（b）(AB)⁻¹＝A⁻¹B⁻¹ 是否正確？", type: "yesno", answer: false,
          steps: ["(AB)⁻¹＝B⁻¹A⁻¹，一般不等於 A⁻¹B⁻¹。可分別算出兩個乘積核對。"] },
      ],
    },
    {
      id: "exer11D-7", hash: "exer11D-7", group: "exer11D", title: "練習 11D 第 7 題", tag: "程度 1",
      lead: "設 P 為方矩陣，使得 P²−4P＋I＝0。證明 P 是非奇異的，及 4I−P 是 P 的逆矩陣。",
      tasks: [
        { q: "證明。", type: "proof",
          steps: [
            "P²−4P＋I＝0 即 4P−P²＝I，亦即 P(4I−P)＝I。",
            "故 P 是非奇異的，且 4I−P 是 P 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "exer11D-8", hash: "exer11D-8", group: "exer11D", title: "練習 11D 第 8 題", tag: "程度 1",
      lead: "設 Q 為方矩陣，使得 3Q−Q²＋2I＝0。證明 Q 是非奇異的，及 (1/2)(Q−3I) 是 Q 的逆矩陣。",
      tasks: [
        { q: "證明。", type: "proof",
          steps: [
            "3Q−Q²＋2I＝0 即 Q²−3Q＝2I，Q(Q−3I)＝2I，故 Q·[(1/2)(Q−3I)]＝I。",
            "因此 Q 是非奇異的，且 (1/2)(Q−3I) 是 Q 的逆矩陣。",
          ] },
      ],
    },
    {
      id: "exer11D-9", hash: "exer11D-9", group: "exer11D", title: "練習 11D 第 9 題", tag: "程度 1",
      lead: "設 A 如下。",
      given: [{ name: "A", matrix: [[4, 5], [3, 4]] }],
      loadAB: { A: [[4, 5], [3, 4]], B: [[4, -5], [-3, 4]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝[[4,−5],[−3,4]]。", type: "verify", A: [[4, 5], [3, 4]], B: [[4, -5], [-3, 4]] },
        { q: "（b）由此，求 (A²)⁻¹。", type: "products",
          products: [
            { label: "(A^{-1})^{2}", left: [[4, -5], [-3, 4]], right: [[4, -5], [-3, 4]], answer: [[31, -40], [-24, 31]] },
          ],
          steps: ["(A²)⁻¹＝(A⁻¹)²。"] },
      ],
    },
    {
      id: "exer11D-10", hash: "exer11D-10", group: "exer11D", title: "練習 11D 第 10 題", tag: "程度 1",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[1, 0], [11, -1]] },
        { name: "B", matrix: [[3, -2], [2, 1]] },
      ],
      loadAB: { A: [[1, 0], [11, -1]], B: [[1, 0], [11, -1]] },
      tasks: [
        { q: "（a）證明 A⁻¹＝A。", type: "verify", A: [[1, 0], [11, -1]], B: [[1, 0], [11, -1]] },
        { q: "（b）由此，求 BA¹⁸⁷。", type: "matrix", answer: [[-19, 2], [13, -1]],
          steps: ["A⁻¹＝A 即 A²＝I，故 A 的奇數次冪等於 A。187 是奇數，BA¹⁸⁷＝BA。"] },
      ],
    },
    {
      id: "exer11D-11", hash: "exer11D-11", group: "exer11D", title: "練習 11D 第 11 題", tag: "程度 2",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[2, 0, 1], [2, 4, -1], [2, 3, -1]] },
        { name: "B", matrix: [[1, -3, 4], [0, 4, -4], [2, 6, -8]] },
      ],
      loadAB: { A: [[2, 0, 1], [2, 4, -1], [2, 3, -1]], B: [[1, -3, 4], [0, 4, -4], [2, 6, -8]] },
      tasks: [
        { q: "（a）求 AB。", type: "matrix", answer: [[4, 0, 0], [0, 4, 0], [0, 0, 4]],
          steps: ["AB＝4I₃。"] },
        { q: "（b）（i）求 (AB)⁻¹。", type: "matrix", answer: [[1 / 4, 0, 0], [0, 1 / 4, 0], [0, 0, 1 / 4]],
          steps: ["(4I₃)⁻¹＝(1/4)I₃。"] },
        { q: "（b）（ii）求 A⁻¹ 和 B⁻¹。", type: "products",
          products: [
            { label: "A^{-1}=\\dfrac{1}{4}B", left: [[1, -3, 4], [0, 4, -4], [2, 6, -8]], right: [[1 / 4, 0, 0], [0, 1 / 4, 0], [0, 0, 1 / 4]], answer: [[1 / 4, -3 / 4, 1], [0, 1, -1], [1 / 2, 3 / 2, -2]] },
            { label: "B^{-1}=\\dfrac{1}{4}A", left: [[2, 0, 1], [2, 4, -1], [2, 3, -1]], right: [[1 / 4, 0, 0], [0, 1 / 4, 0], [0, 0, 1 / 4]], answer: [[1 / 2, 0, 1 / 4], [1 / 2, 1, -1 / 4], [1 / 2, 3 / 4, -1 / 4]] },
          ],
          steps: ["AB＝4I，故 A(B/4)＝I，A⁻¹＝(1/4)B；同樣 B⁻¹＝(1/4)A。上面右乘 (1/4)I 只是為了顯示同一結果。"] },
      ],
    },
    {
      id: "exer11D-12", hash: "exer11D-12", group: "exer11D", title: "練習 11D 第 12 題", tag: "程度 2",
      lead: "設 A 如下。",
      given: [{ name: "A", matrix: [[8, -5], [3, -2]] }],
      tasks: [
        { q: "（a）證明 A²−6A−I＝0。", type: "identity", M: [[8, -5], [3, -2]], terms: [{ pow: 2, k: 1 }, { mat: true, k: -6 }, { I: true, k: -1 }] },
        { q: "（b）由此，求 A⁻¹。", type: "matrix", answer: [[2, -5], [3, -8]],
          steps: ["A²−6A＝I，A(A−6I)＝I，故 A⁻¹＝A−6I＝[[2,−5],[3,−8]]。"] },
      ],
    },
    {
      id: "exer11D-13", hash: "exer11D-13", group: "exer11D", title: "練習 11D 第 13 題", tag: "程度 2",
      lead: "設 A 如下。",
      given: [{ name: "A", matrix: [[3, -1, 1], [-1, 3, 1], [1, 1, 3]] }],
      tasks: [
        { q: "（a）求 A²−5A＋4I。", type: "identity", M: [[3, -1, 1], [-1, 3, 1], [1, 1, 3]], terms: [{ pow: 2, k: 1 }, { mat: true, k: -5 }, { I: true, k: 4 }] },
        { q: "（b）由此，求 A⁻¹ 和 (A/8)⁻¹。", type: "products",
          products: [
            { label: "A^{-1}", left: [[1 / 2, 1 / 4, -1 / 4], [1 / 4, 1 / 2, -1 / 4], [-1 / 4, -1 / 4, 1 / 2]], right: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], answer: [[1 / 2, 1 / 4, -1 / 4], [1 / 4, 1 / 2, -1 / 4], [-1 / 4, -1 / 4, 1 / 2]] },
            { label: "\\left(\\dfrac{1}{8}A\\right)^{-1}", left: [[4, 2, -2], [2, 4, -2], [-2, -2, 4]], right: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], answer: [[4, 2, -2], [2, 4, -2], [-2, -2, 4]] },
          ],
          steps: ["A²−5A＋4I＝0，A(A−5I)＝−4I，A⁻¹＝(1/4)(5I−A)。又 (A/8)⁻¹＝8A⁻¹。"] },
      ],
    },
    {
      id: "exer11D-14", hash: "exer11D-14", group: "exer11D", title: "練習 11D 第 14 題", tag: "程度 2",
      lead: "設 A 如下。（b）的形式推導可揭曉核對，完整證明留在課堂板書。",
      given: [{ name: "A", matrix: [[0, 1, 1], [0, 2, 0], [-2, 1, 3]] }],
      tasks: [
        { q: "（a）求 A³−5A²＋8A−4I。", type: "identity", M: [[0, 1, 1], [0, 2, 0], [-2, 1, 3]], terms: [{ pow: 3, k: 1 }, { pow: 2, k: -5 }, { mat: true, k: 8 }, { I: true, k: -4 }] },
        { q: "（b）由此說明 A 是非奇異矩陣，及 4(A⁻¹)³−8(A⁻¹)²＋5A⁻¹−I＝0。", type: "proof",
          steps: [
            "由（a），A³−5A²＋8A＝4I，即 A(A²−5A＋8I)＝4I，故 A·[(1/4)(A²−5A＋8I)]＝I。",
            "因此 A 是非奇異的。兩邊左乘 (A⁻¹)³ 並整理，可得 4(A⁻¹)³−8(A⁻¹)²＋5A⁻¹−I＝0。細節留在課堂板書。",
          ] },
      ],
    },
    {
      id: "exer11D-15", hash: "exer11D-15", group: "exer11D", title: "練習 11D 第 15 題", tag: "程度 2",
      lead: "設 A 如下。",
      given: [{ name: "A", matrix: [[-1 / 2, 1 / 2, 1], [3 / 2, 1 / 2, -1], [0, 1, 0]] }],
      tasks: [
        { q: "（a）證明 A⁻¹＝A²。", type: "matrix", answer: [[1, 1, -1], [0, 0, 1], [3 / 2, 1 / 2, -1]],
          steps: ["先算 A²＝[[1,1,−1],[0,0,1],[3/2,1/2,−1]]，再驗證 A·A²＝A³＝I₃，故 A⁻¹＝A²。"] },
        { q: "（b）由此，求 (A⁻¹)⁴⁷。", type: "matrix", answer: [[-1 / 2, 1 / 2, 1], [3 / 2, 1 / 2, -1], [0, 1, 0]],
          steps: ["A³＝I，故 (A⁻¹)⁴⁷＝(A²)⁴⁷＝A⁹⁴＝A^{3·31＋1}＝(A³)³¹A＝A。"] },
      ],
    },
    {
      id: "exer11D-16", hash: "exer11D-16", group: "exer11D", title: "練習 11D 第 16 題", tag: "程度 2",
      lead: "設 A＝[[0,a,b],[0,0,c],[0,0,0]]，其中 a、b 和 c 均為實數。",
      tasks: [
        { q: "（a）證明 A³＝0。", type: "proof",
          steps: [
            "A²＝[[0,0,ac],[0,0,0],[0,0,0]]，再乘一次 A，每一列都變為零，故 A³＝0。",
          ] },
        { q: "（b）由此，求 (I＋A)(I−A＋A²)。", type: "matrix", answer: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
          steps: ["展開得 I−A＋A²＋A−A²＋A³＝I＋A³＝I。"] },
        { q: "（c）利用（b），求 [[1,2,3],[0,1,−1],[0,0,1]] 的逆矩陣。", type: "matrix", answer: [[1, -2, -5], [0, 1, 1], [0, 0, 1]],
          steps: ["所給矩陣是 I＋A，其中 a＝2、b＝3、c＝−1。由（b），其逆是 I−A＋A²＝[[1,−2,−5],[0,1,1],[0,0,1]]。"] },
      ],
    },
    {
      id: "exer11D-17", hash: "exer11D-17", group: "exer11D", title: "練習 11D 第 17 題", tag: "程度 2",
      lead: "設 A、B、C 如下。（c）用數學歸納法的形式證明留在課堂板書。",
      given: [
        { name: "A", matrix: [[2, 5 / 2], [0, -3]] },
        { name: "B", matrix: [[2, 1], [0, 5]] },
        { name: "C", matrix: [[2, 0], [0, -3]] },
      ],
      loadAB: { A: [[2, 1], [0, 5]], B: [[1 / 2, -1 / 10], [0, 1 / 5]] },
      tasks: [
        { q: "（a）證明 B⁻¹＝[[1/2,−1/10],[0,1/5]]。", type: "verify", A: [[2, 1], [0, 5]], B: [[1 / 2, -1 / 10], [0, 1 / 5]] },
        { q: "（b）證明 BA＝CB。", type: "compare",
          leftLabel: "BA", left: [[4, 2], [0, -15]],
          rightLabel: "CB", right: [[4, 2], [0, -15]],
          equal: true },
        { q: "（d）求 A¹⁰⁰。", type: "matrix",
          answer: [["2^{100}", "\\dfrac{2^{100}-3^{100}}{2}"], [0, "3^{100}"]],
          steps: [
            "由 BA＝CB 可得 A＝B⁻¹CB，故 Aⁿ＝B⁻¹CⁿB（歸納證明留在課堂板書）。",
            "C¹⁰⁰＝diag(2¹⁰⁰, (−3)¹⁰⁰)＝diag(2¹⁰⁰, 3¹⁰⁰)。再算 B⁻¹C¹⁰⁰B，右上角是 (2¹⁰⁰−3¹⁰⁰)/2。",
          ] },
      ],
    },
    {
      id: "assess11.4", hash: "assess11.4", group: "assess11.4", title: "階段評估 11.4", tag: "過關",
      lead: "完成下列各題。",
      tasks: [
        { q: "1. 證明 [[9,1],[8,1]] 是 [[1,−1],[−8,9]] 的逆矩陣。", type: "verify", A: [[1, -1], [-8, 9]], B: [[9, 1], [8, 1]] },
        { q: "2. 求 3I₃ 的逆矩陣。", type: "matrix", answer: [[1 / 3, 0, 0], [0, 1 / 3, 0], [0, 0, 1 / 3]],
          steps: ["由定理 11.4（b），(3I₃)⁻¹＝(1/3)I₃。也可直接驗證兩者相乘等於 I₃。"] },
        { q: "3.（a）設 A＝[[−5,2],[2,0]]。證明 A²＋5A＝4I。", type: "identity", M: [[-5, 2], [2, 0]], terms: [{ pow: 2, k: 1 }, { mat: true, k: 5 }, { I: true, k: -4 }],
          show: { name: "A", matrix: [[-5, 2], [2, 0]] } },
        { q: "3.（b）由此，求 A⁻¹。", type: "matrix", answer: [[0, 1 / 2], [1 / 2, 5 / 4]],
          steps: ["A(A＋5I)＝4I，故 A⁻¹＝(1/4)(A＋5I)＝[[0,1/2],[1/2,5/4]]。"] },
      ],
    },
  ];

  const invState = {
    group: "inv",
    item: "inv",
    revealed: false,
    n: 2,
    A: [[3, 5], [-1, -2]],
    B: [[2, 5], [-1, -3]],
  };

  const HASH = {};
  ITEMS.forEach((it) => { HASH[it.hash] = it; HASH[it.id] = it; });
  GROUPS.forEach((g) => { if (!HASH[g.hash]) HASH[g.hash] = { groupOnly: g.id }; });
  HASH["ch11.4"] = { groupOnly: "inv" };

  function ui() { return window.LabUI; }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = a % b; a = b; b = t; }
    return a || 1;
  }
  function fmt(v) {
    if (typeof v === "string") return v;
    if (typeof v !== "number" || !Number.isFinite(v)) return String(v);
    if (Math.abs(v - Math.round(v)) < 1e-10) return String(Math.round(v)).replace(/-/g, "−");
    for (const d of [2, 3, 4, 5, 6, 7, 8, 10]) {
      const n = Math.round(v * d);
      if (Math.abs(v * d - n) < 1e-8) {
        const g = gcd(n, d);
        const nn = n / g, dd = d / g;
        if (dd === 1) return String(nn).replace(/-/g, "−");
        const sign = nn < 0 ? "−" : "";
        return sign + "\\dfrac{" + Math.abs(nn) + "}{" + dd + "}";
      }
    }
    return String(v);
  }
  function plainFmt(v) {
    if (typeof v === "string") return v.replace("−", "-");
    const s = fmt(v);
    return String(s).replace("\\dfrac{", "").replace("}{", "/").replace("}", "").replace(/−/g, "-");
  }
  function displayMat(M) {
    return M.map((row) => row.map((v) => (typeof v === "number" ? fmt(v) : v)));
  }
  function parseEntry(s) {
    const t = String(s || "").trim().replace(/−/g, "-").replace(/\s/g, "");
    if (t === "") return 0;
    if (t.includes("/")) {
      const parts = t.split("/");
      const n = Number(parts[0]), d = Number(parts[1]);
      if (Number.isFinite(n) && Number.isFinite(d) && d !== 0) return n / d;
    }
    const n = Number(t);
    return Number.isFinite(n) ? n : 0;
  }
  function clone(M) { return M.map((row) => row.slice()); }
  function ident(n) {
    return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  }
  function isSquare(M) { return M && M.length && M.length === M[0].length; }
  function sameOrder(A, B) { return A && B && A.length === B.length && A[0].length === B[0].length; }
  function canMul(A, B) { return A && B && A[0].length === B.length; }
  function add(A, B, sign) {
    const s = sign == null ? 1 : sign;
    return A.map((row, i) => row.map((v, j) => v + s * B[i][j]));
  }
  function scale(k, A) { return A.map((row) => row.map((v) => k * v)); }
  function mul(A, B) {
    const r = A.length, n = A[0].length, c = B[0].length;
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
  function matPow(A, k) {
    let P = ident(A.length);
    for (let i = 0; i < k; i++) P = mul(P, A);
    return P;
  }
  function eqMat(A, B, eps) {
    const e = eps || 1e-8;
    if (!A || !B || A.length !== B.length || A[0].length !== B[0].length) return false;
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[0].length; j++) {
        if (typeof A[i][j] !== "number" || typeof B[i][j] !== "number") return false;
        if (Math.abs(A[i][j] - B[i][j]) > e) return false;
      }
    }
    return true;
  }
  function evalTerms(M, terms) {
    const n = M.length;
    let R = scale(0, ident(n));
    terms.forEach((t) => {
      let part;
      if (t.pow) part = matPow(M, t.pow);
      else if (t.I) part = ident(n);
      else part = M;
      R = add(R, scale(t.k, part));
    });
    return R;
  }

  function showNamed(name, M) {
    const L = ui();
    return L.namedMatrix({ name: name, matrix: displayMat(M) });
  }

  function editMatrix(name, M, onChange) {
    const L = ui();
    const wrap = document.createElement("div");
    wrap.className = "mtx-wrap named-only";
    const lab = document.createElement("div");
    lab.className = "mtx-name-cell";
    lab.appendChild(L.texSpan(name + "="));
    wrap.appendChild(lab);
    const mtx = document.createElement("div");
    mtx.className = "mtx";
    mtx.setAttribute("role", "grid");
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
        inp.value = plainFmt(M[i][j]);
        inp.setAttribute("aria-label", name + " 第 " + (i + 1) + " 行第 " + (j + 1) + " 列");
        inp.addEventListener("change", () => {
          M[i][j] = parseEntry(inp.value);
          if (onChange) onChange();
        });
        inp.addEventListener("keydown", (ev) => { if (ev.key === "Enter") inp.blur(); });
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

  function setOrder(n) {
    n = n === 3 ? 3 : 2;
    function resize(src) {
      const next = [];
      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) row.push(src[i] && src[i][j] != null ? src[i][j] : (i === j ? 1 : 0));
        next.push(row);
      }
      return next;
    }
    invState.n = n;
    invState.A = resize(invState.A);
    invState.B = resize(invState.B);
    renderInv();
  }

  function loadPair(A, B) {
    invState.n = A.length;
    invState.A = clone(A);
    invState.B = clone(B);
    invState.group = "inv";
    invState.item = "inv";
    sync();
    renderInv();
  }

  function verdict(A, B) {
    const out = { ab: null, ba: null, ok: false, reason: "" };
    if (!isSquare(A) || !isSquare(B)) {
      out.reason = "非方矩陣的逆矩陣是未定義的。這裏只處理 2 階或 3 階方矩陣。";
      return out;
    }
    if (A.length !== B.length) {
      out.reason = "兩個矩陣的階不同，AB 或 BA 未定義，不能互為逆矩陣。";
      return out;
    }
    if (!canMul(A, B) || !canMul(B, A)) {
      out.reason = "乘積未定義。";
      return out;
    }
    out.ab = mul(A, B);
    out.ba = mul(B, A);
    const I = ident(A.length);
    const abI = eqMat(out.ab, I);
    const baI = eqMat(out.ba, I);
    if (abI && baI) {
      out.ok = true;
      out.reason = "AB＝BA＝I，故 A 是非奇異（可逆）的，B 是 A 的逆矩陣，即 B＝A⁻¹；同樣，A 是 B 的逆矩陣。";
    } else if (abI && !baI) {
      out.ok = true;
      out.reason = "AB＝I。由定理 11.2，BA 也等於 I，故 B 是 A 的逆矩陣。若 BA 的數值看起來還不是 I，請再核對輸入。";
    } else {
      out.ok = false;
      out.reason = "AB 不等於 I，所以 B 不是 A 的逆矩陣。A 可能是奇異的，或者 B 不是那個逆矩陣。";
    }
    return out;
  }

  function renderPlayground(stage) {
    const L = ui();
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "逆矩陣示範";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = "本節只驗證某方矩陣是否為另一個的逆：計算 AB 和 BA，看是否都等於單位矩陣。可改 2 階或 3 階的元素。求非奇異矩陣之逆的一般方法留待下一節，這裏不會代你求出逆矩陣。";
    stage.appendChild(title);
    stage.appendChild(lead);

    const ctrls = document.createElement("div");
    ctrls.className = "op-row";
    [[2, "2 階"], [3, "3 階"]].forEach(([n, lab]) => {
      ctrls.appendChild(L.button(lab, "btn" + (invState.n === n ? " btn-primary" : ""), () => setOrder(n)));
    });
    [
      { title: "載入引入例子", A: [[3, 5], [-1, -2]], B: [[2, 5], [-1, -3]] },
      { title: "載入奇異例子", A: [[0, 0], [0, 1]], B: [[1, 0], [0, 1]] },
      { title: "載入概念測試站 11.3（a）", A: [[8, 5], [3, 2]], B: [[2, -5], [-3, 8]] },
      { title: "載入概念測試站 11.3（c）", A: [[2, 1, 2], [-3, 0, -1], [-4, -1, -3]], B: [[1, -1, 1], [5, -2, 4], [-3, 2, -3]] },
      { title: "載入例 11.17", A: [[7, -2], [-3, 1]], B: [[2, -3], [-1, 2]] },
    ].forEach((p) => {
      ctrls.appendChild(L.button(p.title, "btn-quiet", () => {
        invState.n = p.A.length;
        invState.A = clone(p.A);
        invState.B = clone(p.B);
        renderInv();
      }));
    });
    ctrls.appendChild(L.button("更新計算", "btn-primary", () => renderInv()));
    stage.appendChild(ctrls);

    const board = document.createElement("div");
    board.className = "given-row";
    board.appendChild(editMatrix("A", invState.A));
    board.appendChild(editMatrix("B", invState.B));
    stage.appendChild(board);

    const v = verdict(invState.A, invState.B);
    const box = document.createElement("div");
    box.className = "panel " + (v.ab ? (v.ok ? "feedback ok" : "feedback") : "");
    const vk = document.createElement("p");
    vk.className = "kicker";
    vk.textContent = "驗證 AB 與 BA";
    box.appendChild(vk);
    if (v.ab) {
      const row = document.createElement("div");
      row.className = "given-row";
      row.appendChild(showNamed("AB", v.ab));
      row.appendChild(showNamed("BA", v.ba));
      row.appendChild(showNamed("I_{" + invState.n + "}", ident(invState.n)));
      box.appendChild(row);
    }
    const vp = document.createElement("p");
    vp.style.fontWeight = "700";
    vp.textContent = v.reason;
    box.appendChild(vp);
    stage.appendChild(box);
  }

  function renderSteps(box, steps) {
    if (!steps || !steps.length) return;
    const ul = document.createElement("ul");
    steps.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });
    box.appendChild(ul);
  }

  function renderUnknowns(L, unknowns) {
    const p = document.createElement("p");
    p.style.fontWeight = "700";
    const parts = Object.keys(unknowns).map((k) => k + "=" + fmt(unknowns[k]));
    p.appendChild(L.texSpan(parts.join(",\\quad ")));
    return p;
  }

  function renderTaskBody(box, t, revealed) {
    const L = ui();
    if (t.show) box.appendChild(showNamed(t.show.name, t.show.matrix));
    if (t.showA) box.appendChild(showNamed("P", t.showA));
    if (t.showB) box.appendChild(showNamed("P^{-1}", t.showB));

    if (t.type === "verify" || t.type === "verify-symbol") {
      const row = document.createElement("div");
      row.className = "given-row";
      row.appendChild(showNamed("A", t.A));
      row.appendChild(showNamed("B", t.B));
      box.appendChild(row);
      if (revealed) {
        if (t.type === "verify") {
          const v = verdict(t.A, t.B);
          if (v.ab) {
            const r2 = document.createElement("div");
            r2.className = "given-row";
            r2.appendChild(showNamed("AB", v.ab));
            r2.appendChild(showNamed("BA", v.ba));
            box.appendChild(r2);
          }
          const p = document.createElement("p");
          p.style.fontWeight = "700";
          p.textContent = t.expectInverse === false
            ? (v.reason || "AB 不等於 I，A 沒有這個逆矩陣。")
            : v.reason;
          box.appendChild(p);
        }
      }
    } else if (t.type === "verify-claims") {
      t.claims.forEach((c) => {
        const row = document.createElement("div");
        row.className = "given-row";
        row.appendChild(showNamed(c.of, c.A));
        row.appendChild(showNamed(c.of + "^{-1}", c.inv));
        box.appendChild(row);
        if (revealed) {
          const v = verdict(c.A, c.inv);
          const r3 = document.createElement("div");
          r3.className = "given-row";
          if (v.ab) r3.appendChild(showNamed(c.of + "\\,\\cdot\\," + c.of + "^{-1}", v.ab));
          if (v.ba) r3.appendChild(showNamed(c.of + "^{-1}\\,\\cdot\\," + c.of, v.ba));
          box.appendChild(r3);
          const p = document.createElement("p");
          p.style.fontWeight = "700";
          p.textContent = v.ok ? c.of + " 與其逆的乘積等於單位矩陣。" : v.reason;
          box.appendChild(p);
        }
      });
    } else if (t.type === "products") {
      if (revealed) {
        t.products.forEach((pr) => {
          const row = document.createElement("div");
          row.className = "given-row";
          row.appendChild(showNamed(pr.label, pr.answer));
          box.appendChild(row);
        });
      }
    } else if (t.type === "compare") {
      if (revealed) {
        const row = document.createElement("div");
        row.className = "given-row";
        row.appendChild(showNamed(t.leftLabel, t.left));
        row.appendChild(showNamed(t.rightLabel, t.right));
        box.appendChild(row);
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = t.equal ? "兩個矩陣相等。" : "兩個矩陣不相等。";
        box.appendChild(p);
      }
    } else if (t.type === "yesno") {
      if (revealed) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = t.answer ? "正確。" : "否。";
        box.appendChild(p);
      }
    } else if (t.type === "matrix") {
      if (revealed) {
        box.appendChild(showNamed("", t.answer));
      }
    } else if (t.type === "identity") {
      if (t.M) {
        const row = document.createElement("div");
        row.className = "given-row";
        row.appendChild(showNamed("所給矩陣", t.M));
        box.appendChild(row);
      }
      if (revealed) {
        const R = evalTerms(t.M, t.terms);
        box.appendChild(showNamed("結果", R));
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = eqMat(R, scale(0, ident(t.M.length))) ? "結果是零矩陣。" : "結果如上。";
        box.appendChild(p);
      }
    } else if (t.type === "unknowns") {
      if (revealed) box.appendChild(renderUnknowns(L, t.unknowns));
    } else if (t.type === "proof") {
      /* steps after reveal */
    }

    if (revealed) renderSteps(box, t.steps);
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
    if (item.given) {
      const row = document.createElement("div");
      row.className = "given-row";
      item.given.forEach((g) => row.appendChild(showNamed(g.name, g.matrix)));
      stage.appendChild(row);
    }

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(L.button(invState.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
      invState.revealed = !invState.revealed;
      renderInv();
    }));
    if (item.loadAB) {
      actions.appendChild(L.button("載入到逆矩陣示範", "btn-quiet", () => loadPair(item.loadAB.A, item.loadAB.B)));
    }
    stage.appendChild(actions);

    item.tasks.forEach((t) => {
      const box = document.createElement("div");
      box.className = (invState.revealed ? "feedback ok " : "") + "task";
      const h = document.createElement("h3");
      h.style.fontSize = "16px";
      h.textContent = t.q;
      box.appendChild(h);
      renderTaskBody(box, t, invState.revealed);
      stage.appendChild(box);
    });
    if (!invState.revealed) {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "先讓學生動手算或推導，再揭曉答案。";
      stage.appendChild(p);
    }
  }

  function itemsInGroup(gid) { return ITEMS.filter((it) => it.group === gid); }

  function renderGroupBar() {
    const L = ui();
    const host = L.els.items;
    host.innerHTML = "";
    const list = invState.group === "inv" ? [] : itemsInGroup(invState.group);
    list.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", it.id === invState.item ? "true" : "false");
      b.innerHTML = it.title + (it.tag ? '<span class="tag">' + it.tag + "</span>" : "");
      b.addEventListener("click", () => {
        invState.item = it.id;
        invState.revealed = false;
        sync();
        renderInv();
      });
      host.appendChild(b);
    });
  }

  function hideOther(on) {
    ["111", "112", "113", "114"].forEach((id) => {
      const m = document.getElementById("modes-" + id);
      const n = document.getElementById("notes-" + id);
      if (m) m.hidden = id !== on;
      if (n) n.hidden = id !== on;
    });
  }

  function renderInv() {
    const L = ui();
    hideOther("114");
    document.getElementById("brand-sub").textContent = "馬Sir教室 · 中五 M2 · §11.4 方矩陣的逆矩陣";
    document.querySelectorAll("#chapters [data-chapter]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-chapter") === "11.4" ? "true" : "false");
    });
    document.querySelectorAll("#modes-114 [data-inv]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-inv") === invState.group ? "true" : "false");
    });
    L.els.notes.hidden = !L.state.notesOpen;
    L.els.notesBtn.setAttribute("aria-pressed", L.state.notesOpen ? "true" : "false");
    renderGroupBar();
    const stage = L.els.stage;
    stage.innerHTML = "";
    if (invState.group === "inv" || invState.item === "inv") renderPlayground(stage);
    else {
      const item = ITEMS.find((it) => it.id === invState.item) || itemsInGroup(invState.group)[0];
      if (item) renderItem(stage, item);
    }
    L.typeset(document);
  }

  function sync() {
    let h = "inv";
    if (invState.item && invState.item !== "inv") {
      const it = ITEMS.find((x) => x.id === invState.item);
      h = (it && it.hash) || invState.group;
    } else {
      h = invState.group === "inv" ? "inv" : invState.group;
    }
    if (location.hash.replace(/^#/, "") !== h) history.replaceState(null, "", "#" + h);
  }

  function hasHash(raw) {
    if (!raw) return false;
    if (raw === "ch11.4" || raw === "inv" || raw === "inv-def" || raw === "inv-prop" || raw === "inv-ex" || raw === "exer11D" || raw === "assess11.4") return true;
    return !!HASH[raw];
  }

  function apply(raw) {
    if (!raw || raw === "ch11.4" || raw === "inv") {
      invState.group = "inv";
      invState.item = "inv";
      return;
    }
    if (GROUPS.some((g) => g.id === raw)) {
      invState.group = raw;
      const list = itemsInGroup(raw);
      invState.item = list.length ? list[0].id : "inv";
      invState.revealed = false;
      return;
    }
    const it = HASH[raw];
    if (it && it.group) {
      invState.group = it.group;
      invState.item = it.id;
      invState.revealed = false;
    } else if (it && it.groupOnly) {
      invState.group = it.groupOnly;
      const list = itemsInGroup(it.groupOnly);
      invState.item = list.length ? list[0].id : it.groupOnly;
      invState.revealed = false;
    }
  }

  function bind() {
    document.querySelectorAll("#modes-114 [data-inv]").forEach((b) => {
      b.addEventListener("click", () => {
        const g = b.getAttribute("data-inv");
        invState.group = g;
        invState.revealed = false;
        if (g === "inv") invState.item = "inv";
        else {
          const list = itemsInGroup(g);
          invState.item = list[0] ? list[0].id : g;
        }
        sync();
        renderInv();
      });
    });
  }

  window.LabInv = {
    hasHash, apply, render: renderInv, bind, ITEMS, mul, ident, eqMat, evalTerms, matPow,
  };
})();
