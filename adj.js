/* §11.5 計算逆矩陣 — 馬Sir教室。以伴隨矩陣求非奇異矩陣的逆；本課程只學 2 階和 3 階。 */
(function () {
  "use strict";

  const GROUPS = [
    { id: "adj", title: "計算逆矩陣示範", hash: "adj" },
    { id: "transpose", title: "轉置矩陣", hash: "transpose" },
    { id: "detprop", title: "行列式的性質", hash: "detprop" },
    { id: "adjugate", title: "伴隨矩陣", hash: "adjugate" },
    { id: "exer11E", title: "練習 11E", hash: "exer11E" },
    { id: "assess11.5", title: "階段評估 11.5", hash: "assess11.5" },
  ];

  const ITEMS = [
    {
      id: "def11.11", hash: "def11.11", group: "transpose", title: "定義 11.11", tag: "轉置",
      lead: "m×n 矩陣 A 的轉置矩陣記作 Aᵀ，是把 A 的行和對應的列交換而得的 n×m 矩陣，即 (Aᵀ)ᵢⱼ＝aⱼᵢ。",
      tasks: [
        { q: "例如：", type: "compare",
          leftLabel: "A", left: [[1, 2, 3], [4, 5, 6]],
          rightLabel: "A^{T}", right: [[1, 4], [2, 5], [3, 6]], equal: null },
        { q: "再例如：", type: "compare",
          leftLabel: "A", left: [[3, -2, 0], [1, 4, 2], [5, -3, -1]],
          rightLabel: "A^{T}", right: [[3, 1, 5], [-2, 4, -3], [0, 2, -1]], equal: null },
      ],
    },
    {
      id: "prop11.3", hash: "prop11.3", group: "transpose", title: "性質 11.3", tag: "性質",
      lead: "設 λ 為純量，A 和 B 為矩陣，使得下列運算皆有定義。（a）Iᵀ＝I；（b）(Aᵀ)ᵀ＝A；（c）(A＋B)ᵀ＝Aᵀ＋Bᵀ；（d）(λA)ᵀ＝λAᵀ；（e）(AB)ᵀ＝BᵀAᵀ；（f）若 A 為非奇異的，則 Aᵀ 為非奇異的，及 (Aᵀ)⁻¹＝(A⁻¹)ᵀ。一般來說 (AB)ᵀ≠AᵀBᵀ。形式證明不做成 App 模式，可用下面的數值核對。",
      given: [
        { name: "A", matrix: [[1, 2], [3, 4]] },
        { name: "B", matrix: [[0, 1], [-1, 2]] },
      ],
      tasks: [
        { q: "核對 (AB)ᵀ＝BᵀAᵀ，並比較 AᵀBᵀ。", type: "products",
          products: [
            { label: "(AB)^{T}", answer: [[-2, 5], [3, 10]] },
            { label: "B^{T}A^{T}", answer: [[-2, 5], [3, 10]] },
            { label: "A^{T}B^{T}", answer: [[-3, 5], [-4, 10]] },
          ],
          steps: ["AB＝[[−2,5],[−3,11]]，(AB)ᵀ＝BᵀAᵀ＝[[−2,5],[3,10]]，與 AᵀBᵀ＝[[−3,5],[−4,10]] 不同。"] },
      ],
    },
    {
      id: "ex11.21", hash: "ex11.21", group: "transpose", title: "例 11.21", tag: "轉置",
      lead: "設 A 如下。求下列各項。",
      given: [{ name: "A", matrix: [[4, 1, 3], [0, -1, 5], [-7, 6, 2]] }],
      loadA: [[4, 1, 3], [0, -1, 5], [-7, 6, 2]],
      tasks: [
        { q: "（a）求 Aᵀ。", type: "matrix", answer: [[4, 0, -7], [1, -1, 6], [3, 5, 2]] },
        { q: "（b）求 A＋Aᵀ。", type: "matrix", answer: [[8, 1, -4], [1, -2, 11], [-4, 11, 4]] },
        { q: "（c）求 A−Aᵀ。", type: "matrix", answer: [[0, 1, 10], [-1, 0, -1], [-10, 1, 0]] },
      ],
    },
    {
      id: "qp11.21", hash: "qp11.21", group: "transpose", title: "課堂練習 11.21", tag: "轉置",
      lead: "設 A 如下。求下列各項。",
      given: [{ name: "A", matrix: [[1, -2, 5], [-1, 1, 0], [2, 4, 3]] }],
      loadA: [[1, -2, 5], [-1, 1, 0], [2, 4, 3]],
      tasks: [
        { q: "（a）求 Aᵀ。", type: "matrix", answer: [[1, -1, 2], [-2, 1, 4], [5, 0, 3]] },
        { q: "（b）求 A＋Aᵀ。", type: "matrix", answer: [[2, -3, 7], [-3, 2, 4], [7, 4, 6]] },
        { q: "（c）求 A−Aᵀ。", type: "matrix", answer: [[0, -1, 3], [1, 0, -4], [-3, 4, 0]] },
      ],
    },
    {
      id: "extra11.21", hash: "extra11.21", group: "transpose", title: "附加例題 11.21", tag: "轉置",
      lead: "設 A 如下。求下列各項。",
      given: [{ name: "A", matrix: [[-3, 0, 2], [4, -1, 0], [2, 3, 1]] }],
      loadA: [[-3, 0, 2], [4, -1, 0], [2, 3, 1]],
      tasks: [
        { q: "（a）求 Aᵀ。", type: "matrix", answer: [[-3, 4, 2], [0, -1, 3], [2, 0, 1]] },
        { q: "（b）求 A−Aᵀ。", type: "matrix", answer: [[0, -4, 0], [4, 0, -3], [0, 3, 0]] },
        { q: "（c）求 AᵀA。", type: "matrix", answer: [[29, 2, -4], [2, 10, 3], [-4, 3, 5]] },
      ],
    },
    {
      id: "ex11.22", hash: "ex11.22", group: "transpose", title: "例 11.22", tag: "對稱",
      lead: "若方矩陣 M 符合 Mᵀ＝M，則 M 稱為對稱的。設 A 為 n×n 非奇異對稱矩陣。",
      tasks: [
        { q: "（a）證明 A＋λIₙ 是對稱的，其中 λ 為實常數。", type: "proof",
          steps: ["A 是對稱的，故 Aᵀ＝A。", "(A＋λIₙ)ᵀ＝Aᵀ＋(λIₙ)ᵀ＝Aᵀ＋λIₙ＝A＋λIₙ。", "因此 A＋λIₙ 是對稱的。"] },
        { q: "（b）證明 A⁻¹ 是對稱的。", type: "proof",
          steps: ["(A⁻¹)ᵀ＝(Aᵀ)⁻¹＝A⁻¹，故 A⁻¹ 是對稱的。"] },
      ],
    },
    {
      id: "qp11.22", hash: "qp11.22", group: "transpose", title: "課堂練習 11.22", tag: "對稱",
      lead: "設 A 為 n×n 非奇異對稱矩陣。",
      tasks: [
        { q: "（a）證明 kA 是對稱的，其中 k 為實常數。", type: "proof",
          steps: ["(kA)ᵀ＝kAᵀ＝kA，故 kA 是對稱的。"] },
        { q: "（b）證明 A＋3A⁻¹ 是對稱的。", type: "proof",
          steps: ["(A＋3A⁻¹)ᵀ＝Aᵀ＋3(A⁻¹)ᵀ＝A＋3(Aᵀ)⁻¹＝A＋3A⁻¹。"] },
      ],
    },
    {
      id: "extra11.22", hash: "extra11.22", group: "transpose", title: "附加例題 11.22", tag: "反對稱",
      lead: "若方矩陣 M 符合 Mᵀ＝−M，則 M 稱為反對稱的。設 A 為 n×n 非奇異反對稱矩陣。",
      tasks: [
        { q: "（a）證明 kA 是反對稱的，其中 k 為實常數。", type: "proof",
          steps: ["(kA)ᵀ＝kAᵀ＝k(−A)＝−(kA)。"] },
        { q: "（b）證明 A＋A⁻¹ 是反對稱的。", type: "proof",
          steps: ["(A＋A⁻¹)ᵀ＝Aᵀ＋(A⁻¹)ᵀ＝−A＋(Aᵀ)⁻¹＝−A＋(−A)⁻¹＝−A−A⁻¹＝−(A＋A⁻¹)。"] },
      ],
    },
    {
      id: "prop11.4", hash: "prop11.4", group: "detprop", title: "性質 11.4", tag: "性質",
      lead: "設 A 和 B 為 n×n 矩陣。本課程只要求考慮 n＝2 和 n＝3。（a）|Iₙ|＝1；（b）|AB|＝|A||B|；（c）若 A 為非奇異的，則 |A|≠0 及 |A⁻¹|＝1/|A|。由（b）亦有 |AB|＝|BA|，以及對任意正整數 m，|Aᵐ|＝|A|ᵐ。一般來說 |A＋B|≠|A|＋|B|，且 |kA|≠k|A|（k 為純量）。若 A 為奇異的，A⁻¹ 不存在，討論 |A⁻¹| 沒有意義。",
      tasks: [
        { q: "用 2 階單位矩陣驗證（a）。", type: "value", answer: 1,
          steps: ["|I₂|＝(1)(1)−(0)(0)＝1。同樣 |I₃|＝1。"] },
      ],
    },
    {
      id: "check11.4", hash: "check11.4", group: "detprop", title: "概念測試站 11.4", tag: "驗證",
      lead: "設 A、B 如下。",
      given: [
        { name: "A", matrix: [[1, 3], [2, -4]] },
        { name: "B", matrix: [[2, 4], [3, 5]] },
      ],
      tasks: [
        { q: "（a）求 AB 和 BA。", type: "products",
          products: [
            { label: "AB", answer: [[11, 19], [-8, -12]] },
            { label: "BA", answer: [[10, -10], [13, -11]] },
          ] },
        { q: "（b）利用（a）的結果，求 |AB| 和 |BA| 的值。", type: "value", answerTex: "|AB|=20,\\quad |BA|=20" },
        { q: "（c）求 |A| 和 |B| 的值。", type: "value", answerTex: "|A|=-10,\\quad |B|=-2" },
        { q: "（d）利用（b）和（c）的結果，驗證 |AB|＝|BA|＝|A||B|。", type: "proof",
          steps: ["|A||B|＝(−10)(−2)＝20，與 |AB|、|BA| 相同。"] },
      ],
    },
    {
      id: "ex11.23", hash: "ex11.23", group: "detprop", title: "例 11.23", tag: "行列式",
      lead: "設 A、B 和 C 為 3×3 矩陣，其中 A 為非奇異的，A⁻¹B＝C，|A|＝3 及 |C|＝1/6。",
      tasks: [
        { q: "（a）求 |A⁻¹| 的值。", type: "value", answer: 1 / 3,
          steps: ["A 為非奇異，故 |A⁻¹|＝1/|A|＝1/3。"] },
        { q: "（b）求 |B| 的值。", type: "value", answer: 1 / 2,
          steps: ["|A⁻¹B|＝|C|，即 |A⁻¹||B|＝|C|，(1/3)|B|＝1/6，故 |B|＝1/2。"] },
      ],
    },
    {
      id: "qp11.23", hash: "qp11.23", group: "detprop", title: "課堂練習 11.23", tag: "行列式",
      lead: "設 A、B 和 C 為 2×2 矩陣，其中 B 和 C 為非奇異的，AB＝C²，|A|＝2 及 |B⁻¹|＝2/5。",
      tasks: [
        { q: "（a）求 |B| 的值。", type: "value", answer: 5 / 2,
          steps: ["|B⁻¹|＝1/|B|＝2/5，故 |B|＝5/2。"] },
        { q: "（b）求 |C⁻¹| 的值。", type: "value", answerTex: "\\dfrac{\\sqrt{5}}{5} 或 -\\dfrac{\\sqrt{5}}{5}",
          steps: ["|AB|＝|A||B|＝5＝|C²|＝|C|²，故 |C|＝±√5，|C⁻¹|＝1/|C|＝±√5/5。"] },
      ],
    },
    {
      id: "extra11.23", hash: "extra11.23", group: "detprop", title: "附加例題 11.23", tag: "行列式",
      lead: "設 A、B 和 C 為 3×3 矩陣，其中 A 為非奇異的，ABA⁻¹＝C²，|A|＝2 及 |C|＝10。",
      tasks: [
        { q: "（a）求 |A⁻¹| 的值。", type: "value", answer: 1 / 2,
          steps: ["|A⁻¹|＝1/|A|＝1/2。"] },
        { q: "（b）求 |B| 的值。", type: "value", answer: 100,
          steps: ["|ABA⁻¹|＝|A||B||A⁻¹|＝|B|＝|C|²＝100。"] },
      ],
    },
    {
      id: "def11.12", hash: "def11.12", group: "adjugate", title: "定義 11.12", tag: "伴隨",
      lead: "A 的伴隨矩陣記作 adj A，是把各元素的餘因式排成矩陣後再轉置而得。求各餘因式後，必須再轉置，才得到伴隨矩陣。",
      tasks: [
        { q: "（a）設 A＝[[2,3],[5,6]]。求 adj A。", type: "matrix",
          show: { name: "A", matrix: [[2, 3], [5, 6]] },
          answer: [[6, -3], [-5, 2]],
          steps: ["A₁₁＝6，A₁₂＝−5，A₂₁＝−3，A₂₂＝2。餘因式矩陣轉置後，adj A＝[[6,−3],[−5,2]]。對 2×2 矩陣 [[a,b],[c,d]]，adj A＝[[d,−b],[−c,a]]。"] },
        { q: "（b）設 A＝[[1,0,4],[−2,3,0],[1,2,−1]]。求 adj A。", type: "matrix",
          show: { name: "A", matrix: [[1, 0, 4], [-2, 3, 0], [1, 2, -1]] },
          answer: [[-3, 8, -12], [-2, -5, -8], [-7, -2, 3]],
          steps: ["先求全部餘因式，得餘因式矩陣 [[−3,−2,−7],[8,−5,−2],[−12,−8,3]]，再轉置。"] },
      ],
    },
    {
      id: "check11.5", hash: "check11.5", group: "adjugate", title: "概念測試站 11.5", tag: "伴隨",
      lead: "求下列各矩陣的伴隨矩陣。",
      tasks: [
        { q: "（a）", type: "matrix", show: { name: "A", matrix: [[3, 1], [2, 4]] }, answer: [[4, -1], [-2, 3]] },
        { q: "（b）", type: "matrix", show: { name: "A", matrix: [[1, 2, -1], [0, -1, -4], [-2, 2, 1]] }, answer: [[7, -4, -9], [8, -1, 4], [-2, -6, -1]] },
      ],
    },
    {
      id: "thm11.6", hash: "thm11.6", group: "adjugate", title: "定理 11.6", tag: "定理",
      lead: "設 A 為 n×n 矩陣，其中 n≥2。則 A(adj A)＝(adj A)A＝|A| Iₙ。形式證明不做成 App 模式；可用示範區的矩陣核對。下面用定義 11.12 的 2 階例子。",
      given: [{ name: "A", matrix: [[2, 3], [5, 6]] }],
      tasks: [
        { q: "核對 A(adj A)＝|A| I₂。", type: "products",
          products: [
            { label: "\\mathrm{adj}\\,A", answer: [[6, -3], [-5, 2]] },
            { label: "A(\\mathrm{adj}\\,A)", answer: [[-3, 0], [0, -3]] },
            { label: "|A|I_{2}", answer: [[-3, 0], [0, -3]] },
          ],
          steps: ["|A|＝12−15＝−3。"] },
      ],
    },
    {
      id: "thm11.7", hash: "thm11.7", group: "adjugate", title: "定理 11.7", tag: "求逆",
      lead: "設 A 為 n×n 矩陣，其中 n≥2。（a）若 |A|≠0，則 A 為非奇異的及 A⁻¹＝(1/|A|) adj A。（b）A 為非奇異的當且僅當 |A|≠0。這是本章計算逆矩陣的主要方法。特別地，對 2×2 矩陣 A＝[[a,b],[c,d]]，若 ad−bc≠0，則 A⁻¹＝(1/(ad−bc)) [[d,−b],[−c,a]]。",
      tasks: [
        { q: "例如求 [[2,4],[−1,3]] 的逆矩陣。", type: "matrix",
          show: { name: "A", matrix: [[2, 4], [-1, 3]] },
          answer: [[3 / 10, -2 / 5], [1 / 10, 1 / 5]],
          steps: ["|A|＝10，adj A＝[[3,−4],[1,2]]，故 A⁻¹＝(1/10) adj A。"] },
      ],
    },
    {
      id: "ex11.24", hash: "ex11.24", group: "adjugate", title: "例 11.24", tag: "求逆",
      lead: "設 B 如下。證明 B 為非奇異的，並求 B⁻¹。",
      given: [{ name: "B", matrix: [[0, 1, 2], [-1, 1, 1], [2, 0, -1]] }],
      loadA: [[0, 1, 2], [-1, 1, 1], [2, 0, -1]],
      tasks: [
        { q: "先求 |B|，再求 adj B 和 B⁻¹。", type: "products",
          products: [
            { label: "\\mathrm{adj}\\,B", answer: [[-1, 1, -1], [1, -4, -2], [-2, 2, 1]] },
            { label: "B^{-1}", answer: [[1 / 3, -1 / 3, 1 / 3], [-1 / 3, 4 / 3, 2 / 3], [2 / 3, -2 / 3, -1 / 3]] },
          ],
          steps: ["|B|＝−3≠0，故 B 是非奇異的。B⁻¹＝(1/|B|) adj B＝(−1/3) adj B。"] },
      ],
    },
    {
      id: "qp11.24", hash: "qp11.24", group: "adjugate", title: "課堂練習 11.24", tag: "求逆",
      lead: "證明下列各矩陣為非奇異的，並求它的逆矩陣。",
      tasks: [
        { q: "（a）P＝[[2,1],[3,4]]", type: "matrix", show: { name: "P", matrix: [[2, 1], [3, 4]] }, answer: [[4 / 5, -1 / 5], [-3 / 5, 2 / 5]],
          steps: ["|P|＝5≠0，adj P＝[[4,−1],[−3,2]]。"] },
        { q: "（b）Q＝[[0,−1,3],[−2,−1,2],[3,1,−1]]", type: "matrix", show: { name: "Q", matrix: [[0, -1, 3], [-2, -1, 2], [3, 1, -1]] }, answer: [[1, -2, -1], [-4, 9, 6], [-1, 3, 2]],
          steps: ["|Q|＝−1≠0，Q⁻¹＝(−1) adj Q。"] },
        { q: "（c）R＝[[3,−1,−4],[4,3,−2],[−1,1,2]]", type: "matrix", show: { name: "R", matrix: [[3, -1, -4], [4, 3, -2], [-1, 1, 2]] }, answer: [[4, -1, 7], [-3, 1, -5], [7 / 2, -1, 13 / 2]],
          steps: ["|R|＝2≠0，R⁻¹＝(1/2) adj R。"] },
      ],
    },
    {
      id: "extra11.24", hash: "extra11.24", group: "adjugate", title: "附加例題 11.24", tag: "求逆",
      lead: "設 A 如下。證明 A 為非奇異的，並求 A⁻¹。",
      given: [{ name: "A", matrix: [[1, 0, 3], [2, 1, 2], [4, 2, 5]] }],
      loadA: [[1, 0, 3], [2, 1, 2], [4, 2, 5]],
      tasks: [
        { q: "求 A⁻¹。", type: "matrix", answer: [[1, 6, -3], [-2, -7, 4], [0, -2, 1]],
          steps: ["|A|＝1≠0，故 A 是非奇異的，A⁻¹＝adj A。"] },
      ],
    },
    {
      id: "ex11.25", hash: "ex11.25", group: "adjugate", title: "例 11.25", tag: "冪",
      lead: "設 A＝[[3,2],[−2,−1]]，B＝[[−2,−1],[1,1]] 及 C＝B⁻¹AB。數學歸納法證明留在課堂板書。",
      given: [
        { name: "A", matrix: [[3, 2], [-2, -1]] },
        { name: "B", matrix: [[-2, -1], [1, 1]] },
      ],
      loadA: [[-2, -1], [1, 1]],
      tasks: [
        { q: "（a）求 B⁻¹ 和 C。", type: "products",
          products: [
            { label: "B^{-1}", answer: [[-1, -1], [1, 2]] },
            { label: "C", answer: [[1, 0], [2, 1]] },
          ],
          steps: ["|B|＝−1，B⁻¹＝(−1) adj B＝[[−1,−1],[1,2]]，C＝B⁻¹AB＝[[1,0],[2,1]]。"] },
        { q: "（c）利用 Cⁿ＝[[1,0],[2n,1]]（歸納證明留在課堂板書），求 A²⁸。", type: "matrix", answer: [[57, 56], [-56, -55]],
          steps: ["A＝BCB⁻¹，故 A²⁸＝BC²⁸B⁻¹。把 C²⁸＝[[1,0],[56,1]] 代入即得。"] },
      ],
    },
    {
      id: "qp11.25", hash: "qp11.25", group: "adjugate", title: "課堂練習 11.25", tag: "冪",
      lead: "設 A＝[[2,6],[0,−1]]，B＝[[2,1],[−1,0]] 及 C＝B⁻¹AB。數學歸納法證明留在課堂板書。",
      given: [
        { name: "A", matrix: [[2, 6], [0, -1]] },
        { name: "B", matrix: [[2, 1], [-1, 0]] },
      ],
      tasks: [
        { q: "（a）求 B⁻¹ 和 C。", type: "products",
          products: [
            { label: "B^{-1}", answer: [[0, -1], [1, 2]] },
            { label: "C", answer: [[-1, 0], [0, 2]] },
          ] },
        { q: "（c）利用 Cⁿ＝diag((−1)ⁿ, 2ⁿ)（歸納證明留在課堂板書），求 A⁹。", type: "matrix", answer: [[512, 1026], [0, -1]] },
      ],
    },
    {
      id: "extra11.25", hash: "extra11.25", group: "adjugate", title: "附加例題 11.25", tag: "冪",
      lead: "設 A＝[[1,4],[3,2]]，B＝[[1,4],[1,−3]] 及 C＝B⁻¹AB。數學歸納法證明留在課堂板書。",
      given: [
        { name: "A", matrix: [[1, 4], [3, 2]] },
        { name: "B", matrix: [[1, 4], [1, -3]] },
      ],
      tasks: [
        { q: "（a）求 B⁻¹ 和 C。", type: "products",
          products: [
            { label: "B^{-1}", answer: [[3 / 7, 4 / 7], [1 / 7, -1 / 7]] },
            { label: "C", answer: [[5, 0], [0, -2]] },
          ] },
        { q: "（c）利用 Cⁿ＝diag(5ⁿ, (−2)ⁿ)，求 A¹⁰⁰。", type: "matrix",
          answer: [["\\dfrac{3\\cdot 5^{100}+2^{102}}{7}", "\\dfrac{4(5^{100}-2^{100})}{7}"], ["\\dfrac{3(5^{100}-2^{100})}{7}", "\\dfrac{4\\cdot 5^{100}+3\\cdot 2^{100}}{7}"]] },
      ],
    },
  

    {
      id: "exer11E", hash: "exer11E", group: "exer11E", title: "練習 11E", tag: "練習",
      lead: "對齊課本練習 11E。數學歸納法證明及純粹代數證明題不做成 App 模式。",
      tasks: [
        { q: "1. 設 A＝[[1,3,1],[2,0,2],[0,1,2]]。求 Aᵀ＋A 及 A−Aᵀ。", type: "products",
          show: { name: "A", matrix: [[1, 3, 1], [2, 0, 2], [0, 1, 2]] },
          products: [
            { label: "A^{T}+A", answer: [[2, 5, 1], [5, 0, 3], [1, 3, 4]] },
            { label: "A-A^{T}", answer: [[0, 1, 1], [-1, 0, 1], [-1, -1, 0]] },
          ] },
        { q: "2. 設 A＝[[2,−1],[3,1]]。求 AᵀA 及 (AᵀA)ᵀ。", type: "products",
          show: { name: "A", matrix: [[2, -1], [3, 1]] },
          products: [
            { label: "A^{T}A", answer: [[13, 1], [1, 2]] },
            { label: "(A^{T}A)^{T}", answer: [[13, 1], [1, 2]] },
          ] },
        { q: "3. 設 B＝[[−1,−4,0],[−2,1,−2]]。求 BᵀB 及 BBᵀ。", type: "products",
          show: { name: "B", matrix: [[-1, -4, 0], [-2, 1, -2]] },
          products: [
            { label: "B^{T}B", answer: [[5, 2, 4], [2, 17, -2], [4, -2, 4]] },
            { label: "BB^{T}", answer: [[17, -2], [-2, 9]] },
          ] },
        { q: "4. 設 A、B、C 和 D 為 3×3 矩陣，其中 B 和 C 為非奇異的，AB⁻¹C⁻¹＝D²，|A|＝2，|C|＝6 及 |D|＝1/4。求 |B| 的值。", type: "value", answer: 16 / 3,
          steps: ["|A||B⁻¹||C⁻¹|＝|D|²，即 2·(1/|B|)·(1/6)＝1/16，故 |B|＝16/3。"] },
        { q: "5. 設 A、B、C 和 D 為 2×2 矩陣，其中 B 為非奇異的，AB⁻¹＝CD²，|A|＝1，|B|＝2 及 |D|＝3。求 |C| 的值。", type: "value", answer: 1 / 18,
          steps: ["|A||B⁻¹|＝|C||D|²，1·(1/2)＝|C|·9，故 |C|＝1/18。"] },
        { q: "6. 設 P、Q 和 R 為 3×3 矩陣，其中 Q 為非奇異的，PQ⁻¹＝I，2RQ²＝P 及 |Q|＝3。求 |P| 和 |2R| 的值。", type: "value", answerTex: "|P|=3,\\quad |2R|=\\dfrac{1}{3}",
          steps: ["PQ⁻¹＝I 得 |P||Q⁻¹|＝1，故 |P|＝|Q|＝3。由 2RQ²＝P，|2R||Q|²＝|P|，即 |2R|·9＝3，故 |2R|＝1/3。"] },
        { q: "7. 判斷 [[1,−2],[2,4]] 是否為非奇異的。", type: "yesno", answer: true, yesLabel: "非奇異", noLabel: "奇異",
          steps: ["行列式＝8≠0，故為非奇異的。"] },
        { q: "8. 判斷 [[1,6,8],[1,4,5],[0,2,3]] 是否為非奇異的。", type: "yesno", answer: false, yesLabel: "非奇異", noLabel: "奇異",
          steps: ["行列式＝0，故為奇異的。"] },
        { q: "9. 求 adj[[7,−4],[−1,3]]。", type: "matrix", show: { name: "A", matrix: [[7, -4], [-1, 3]] }, answer: [[3, 4], [1, 7]] },
        { q: "10. 求 adj[[3,0,1],[2,−2,0],[0,−1,2]]。", type: "matrix", show: { name: "A", matrix: [[3, 0, 1], [2, -2, 0], [0, -1, 2]] }, answer: [[-4, -1, 2], [-4, 6, 2], [-2, 3, -6]] },
        { q: "11. 求 [[5,3],[−3,−2]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[5, 3], [-3, -2]] }, answer: [[2, 3], [-3, -5]],
          steps: ["|A|＝−1，adj A＝[[−2,−3],[3,5]]，A⁻¹＝(−1) adj A。"] },
        { q: "12. 求 [[−4,5],[2,−2]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[-4, 5], [2, -2]] }, answer: [[1, 5 / 2], [1, 2]],
          steps: ["|A|＝−2。"] },
        { q: "13. 求 [[2,4],[−3,−4]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[2, 4], [-3, -4]] }, answer: [[-1, -1], [3 / 4, 1 / 2]],
          steps: ["|A|＝4。"] },
        { q: "14. 求 [[1,2,1],[0,1,1],[3,2,0]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[1, 2, 1], [0, 1, 1], [3, 2, 0]] }, answer: [[-2, 2, 1], [3, -3, -1], [-3, 4, 1]],
          steps: ["|A|＝1。"] },
        { q: "15. 求 [[2,−4,−9],[4,−9,−6],[1,−2,−3]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[2, -4, -9], [4, -9, -6], [1, -2, -3]] }, answer: [[-5, -2, 19], [-2, -1, 8], [-1 / 3, 0, 2 / 3]],
          steps: ["|A|＝−3。"] },
        { q: "16. 求 [[0,−3,−1],[−1,−3,1],[−2,5,5]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[0, -3, -1], [-1, -3, 1], [-2, 5, 5]] }, answer: [[-10, 5, -3], [3 / 2, -1, 1 / 2], [-11 / 2, 3, -3 / 2]],
          steps: ["|A|＝2。"] },
        { q: "17. 設 A 為任意 3×3 矩陣，B＝[[1,−a,−7],[a,1,b],[7,−b,1]]。（a）求 |B−I|。（b）AB−A 是否為奇異的？", type: "products",
          products: [],
          answerTex: "(a)\\ |B-I|=0。\\quad (b)\\ 是，AB-A 為奇異的。",
          steps: ["B−I＝[[0,−a,−7],[a,0,b],[7,−b,0]]，直接展開得 |B−I|＝0。AB−A＝A(B−I)，而 B−I 為奇異的，故 AB−A 為奇異的。"] },
        { q: "18. 設 A＝[[4,a],[2,3]] 和 B＝[[1,b],[2,4]] 均為奇異的。（a）求 a 和 b 的值。（b）求 (B−A)⁻¹ 和 [(B−A)ᵀ]⁻¹。", type: "products",
          products: [
            { label: "B-A", answer: [[-3, -4], [0, 1]] },
            { label: "(B-A)^{-1}", answer: [[-1 / 3, -4 / 3], [0, 1]] },
            { label: "[(B-A)^{T}]^{-1}", answer: [[-1 / 3, 0], [-4 / 3, 1]] },
          ],
          steps: ["A、B 奇異，故 |A|＝12−2a＝0，a＝6；|B|＝4−2b＝0，b＝2。B−A＝[[−3,−4],[0,1]]，行列式＝−3。"] },
        { q: "19. 設 A[[2,1],[3,2]]＝[[5,−2],[7,3]]。（a）求 [[2,1],[3,2]]⁻¹。（b）求 A。", type: "products",
          products: [
            { label: "\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}^{-1}", answer: [[2, -1], [-3, 2]] },
            { label: "A", answer: [[16, -9], [5, -1]] },
          ],
          steps: ["A＝[[5,−2],[7,3]] [[2,1],[3,2]]⁻¹。"] },
        { q: "20. 設 M＝[[0,1,1],[1,1,k],[1,k,k]]，其中 k≠1。（a）求 M⁻¹。（b）若 M[[x],[−3],[z]]＝[[3],[5],[2]]，求 k 的值。", type: "products",
          products: [
            { label: "M^{-1}", answer: [["-k", "0", "1"], ["0", "\\dfrac{1}{1-k}", "\\dfrac{1}{k-1}"], ["1", "\\dfrac{1}{k-1}", "\\dfrac{1}{1-k}"]] },
          ],
          answerTex: "(b)\\ k=2",
          steps: ["|M|＝k−1≠0。由第一列得 −3＋z＝3，故 z＝6；代入其餘兩式得 k＝2。"] },
        { q: "24. 設 A＝[[3,1],[−4,−1]]，B＝[[−1,1],[2,−3]]，C 為 2×2 矩陣且 BC＝AB。（a）求 B⁻¹ 和 C。（c）利用 Cⁿ＝[[1,n],[0,1]]（歸納證明留在課堂板書），求 A²⁷。", type: "products",
          products: [
            { label: "B^{-1}", answer: [[-3, -1], [-2, -1]] },
            { label: "C", answer: [[1, 1], [0, 1]] },
            { label: "A^{27}", answer: [[55, 27], [-108, -53]] },
          ],
          steps: ["|B|＝1，C＝B⁻¹AB。A＝BCB⁻¹，故 A²⁷＝BC²⁷B⁻¹。"] },
        { q: "25. 設 A＝[[−12,5],[−9,2]]。（a）求方程 |A−xI|＝0 的根 x₁、x₂（x₁＞x₂）。（b）設 B＝[[5,r],[s,t]]，A[[5],[s]]＝x₁[[5],[s]]，A[[r],[t]]＝x₂[[r],[t]]，及 |B|＝−4。（i）求 B。（ii）求 B⁻¹AB。（c）求 A⁶。", type: "products",
          products: [
            { label: "B", answer: [[5, 1], [9, 1]] },
            { label: "B^{-1}AB", answer: [[-3, 0], [0, -7]] },
            { label: "A^{6}", answer: [[263799, -146150], [263070, -145421]] },
          ],
          answerTex: "(a)\\ x_1=-3,\\quad x_2=-7",
          steps: ["|A−xI|＝(x＋7)(x＋3)＝0。由特徵向量條件及 |B|＝−4 得 B＝[[5,1],[9,1]]。A＝B diag(−3,−7) B⁻¹，故 A⁶＝B diag(729,117649) B⁻¹。"] },
        { q: "26. 設 A＝[[1,0],[1,2]]。（a）驗證 A²−3A＋2I＝O。（c）利用 Aⁿ＝(2ⁿ−1)A−2(2ⁿ⁻¹−1)I（歸納證明留在課堂板書），求 (A⁻¹)⁶。", type: "products",
          products: [
            { label: "A^{2}-3A+2I", answer: [[0, 0], [0, 0]] },
            { label: "(A^{-1})^{6}", answer: [[1, 0], [-63 / 64, 1 / 64]] },
          ],
          steps: ["由（a）可推得 A⁻¹＝(3/2)I−(1/2)A＝[[1,0],[−1/2,1/2]]，再求六次冪；或把 n＝−6 代入公式。"] },
      ],
    },
    {
      id: "assess11.5", hash: "assess11.5", group: "assess11.5", title: "階段評估 11.5", tag: "過關",
      lead: "核對本節轉置、行列式性質與用伴隨矩陣求逆。第 7 題的形式證明留在課堂板書。",
      tasks: [
        { q: "1. 求 [[1,2],[3,4]]ᵀ。", type: "matrix", show: { name: "A", matrix: [[1, 2], [3, 4]] }, answer: [[1, 3], [2, 4]] },
        { q: "2. 求 [[1,1,2],[2,3,3],[4,5,4]]ᵀ。", type: "matrix", show: { name: "A", matrix: [[1, 1, 2], [2, 3, 3], [4, 5, 4]] }, answer: [[1, 2, 4], [1, 3, 5], [2, 3, 4]] },
        { q: "3. 設 D＝[[1,−2,3]]。求 DᵀD 及 (DᵀD)ᵀ。", type: "products",
          show: { name: "D", matrix: [[1, -2, 3]] },
          products: [
            { label: "D^{T}D", answer: [[1, -2, 3], [-2, 4, -6], [3, -6, 9]] },
            { label: "(D^{T}D)^{T}", answer: [[1, -2, 3], [-2, 4, -6], [3, -6, 9]] },
          ] },
        { q: "4. 設 A、B 和 C 皆為 2×2 矩陣，其中 C 為非奇異的，B＝C⁻¹AC 及 |A|＝16。求 |B| 的值。", type: "value", answer: 16,
          steps: ["|B|＝|C⁻¹||A||C|＝|A|＝16。"] },
        { q: "5. 求 [[1,3],[3,1]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[1, 3], [3, 1]] }, answer: [[-1 / 8, 3 / 8], [3 / 8, -1 / 8]],
          steps: ["|A|＝−8。"] },
        { q: "6. 求 [[2,0,1],[1,1,0],[0,3,2]]⁻¹。", type: "matrix", show: { name: "A", matrix: [[2, 0, 1], [1, 1, 0], [0, 3, 2]] }, answer: [[2 / 7, 3 / 7, -1 / 7], [-2 / 7, 4 / 7, 1 / 7], [3 / 7, -6 / 7, 2 / 7]],
          steps: ["|A|＝7。"] },
      ],
    },
  ];

  const HASH = {};
  ITEMS.forEach((it) => { HASH[it.hash] = it; HASH[it.id] = it; });
  HASH["ch11.5"] = { groupOnly: "adj" };

  const adjState = {
    n: 3,
    A: [[1, 0, 4], [-2, 3, 0], [1, 2, -1]],
    group: "adj",
    item: "adj",
    revealed: false,
  };

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
    for (const d of [2, 3, 4, 5, 6, 7, 8, 10, 16, 64]) {
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
  function transpose(A) {
    return A[0].map((_, j) => A.map((row) => row[j]));
  }
  function det2(A) { return A[0][0] * A[1][1] - A[0][1] * A[1][0]; }
  function det3(A) {
    const a = A[0][0], b = A[0][1], c = A[0][2];
    const d = A[1][0], e = A[1][1], f = A[1][2];
    const g = A[2][0], h = A[2][1], i = A[2][2];
    return a * e * i + b * f * g + c * d * h - c * e * g - a * f * h - b * d * i;
  }
  function detOf(A) {
    if (!A || A.length !== A[0].length) return null;
    if (A.length === 1) return A[0][0];
    if (A.length === 2) return det2(A);
    if (A.length === 3) return det3(A);
    return null;
  }
  function minorMat(A, r, c) {
    return A.filter((_, i) => i !== r).map((row) => row.filter((_, j) => j !== c));
  }
  function cofactor(A, i, j) {
    const m = minorMat(A, i, j);
    const d = detOf(m);
    return ((i + j) % 2 === 0 ? 1 : -1) * d;
  }
  function cofactorMatrix(A) {
    return A.map((row, i) => row.map((_, j) => cofactor(A, i, j)));
  }
  function adjOf(A) { return transpose(cofactorMatrix(A)); }
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
  function scale(k, A) { return A.map((row) => row.map((v) => k * v)); }
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
  function nearZero(v) { return Math.abs(v) < 1e-10; }

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
    const src = adjState.A;
    const next = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) row.push(src[i] && src[i][j] != null ? src[i][j] : (i === j ? 1 : 0));
      next.push(row);
    }
    adjState.n = n;
    adjState.A = next;
    renderAdj();
  }

  function loadA(A) {
    adjState.n = A.length;
    adjState.A = clone(A);
    adjState.group = "adj";
    adjState.item = "adj";
    sync();
    renderAdj();
  }

  function renderPlayground(stage) {
    const L = ui();
    const title = document.createElement("p");
    title.className = "kicker";
    title.textContent = "計算逆矩陣示範";
    const lead = document.createElement("p");
    lead.className = "lead";
    lead.textContent = "本節以伴隨矩陣求非奇異矩陣的逆。先求各餘因式，再轉置得到伴隨矩陣 adj A。若 |A|≠0，則 A⁻¹＝(1/|A|) adj A；若 |A|＝0，A 是奇異的，逆矩陣未定義。可改 2 階或 3 階的元素。本課程只學 2 階和 3 階。";
    stage.appendChild(title);
    stage.appendChild(lead);

    const ctrls = document.createElement("div");
    ctrls.className = "op-row";
    [[2, "2 階"], [3, "3 階"]].forEach(([n, lab]) => {
      ctrls.appendChild(L.button(lab, "btn" + (adjState.n === n ? " btn-primary" : ""), () => setOrder(n)));
    });
    [
      { title: "載入定義 11.12（a）", A: [[2, 3], [5, 6]] },
      { title: "載入定義 11.12（b）", A: [[1, 0, 4], [-2, 3, 0], [1, 2, -1]] },
      { title: "載入 2 階公式例子", A: [[2, 4], [-1, 3]] },
      { title: "載入例 11.24", A: [[0, 1, 2], [-1, 1, 1], [2, 0, -1]] },
      { title: "載入奇異例子", A: [[1, 6, 8], [1, 4, 5], [0, 2, 3]] },
      { title: "載入階段評估第 6 題", A: [[2, 0, 1], [1, 1, 0], [0, 3, 2]] },
    ].forEach((p) => {
      ctrls.appendChild(L.button(p.title, "btn-quiet", () => {
        adjState.n = p.A.length;
        adjState.A = clone(p.A);
        renderAdj();
      }));
    });
    ctrls.appendChild(L.button("更新計算", "btn-primary", () => renderAdj()));
    stage.appendChild(ctrls);

    const board = document.createElement("div");
    board.className = "given-row";
    board.appendChild(editMatrix("A", adjState.A, () => renderAdj()));
    stage.appendChild(board);

    const A = adjState.A;
    const AT = transpose(A);
    const C = cofactorMatrix(A);
    const adjA = adjOf(A);
    const d = detOf(A);

    const row1 = document.createElement("div");
    row1.className = "given-row";
    row1.appendChild(showNamed("A^{T}", AT));
    row1.appendChild(showNamed("餘因式矩陣", C));
    row1.appendChild(showNamed("\\mathrm{adj}\\,A", adjA));
    stage.appendChild(row1);

    const box = document.createElement("div");
    box.className = "panel " + (nearZero(d) ? "feedback" : "feedback ok");
    const vk = document.createElement("p");
    vk.className = "kicker";
    vk.textContent = "用伴隨矩陣求逆";
    box.appendChild(vk);
    const detp = document.createElement("p");
    detp.style.fontWeight = "700";
    detp.appendChild(L.texSpan("|A|=" + fmt(d)));
    box.appendChild(detp);
    if (nearZero(d)) {
      const p = document.createElement("p");
      p.style.fontWeight = "700";
      p.textContent = "因為 |A|＝0，A 是奇異的，逆矩陣未定義。伴隨矩陣仍然存在，但不可用 (1/|A|) adj A。";
      box.appendChild(p);
    } else {
      const invA = scale(1 / d, adjA);
      const row2 = document.createElement("div");
      row2.className = "given-row";
      row2.appendChild(showNamed("A^{-1}=\\dfrac{1}{|A|}\\,\\mathrm{adj}\\,A", invA));
      box.appendChild(row2);
      const chk = mul(A, invA);
      const row3 = document.createElement("div");
      row3.className = "given-row";
      row3.appendChild(showNamed("A A^{-1}", chk));
      row3.appendChild(showNamed("I_{" + A.length + "}", ident(A.length)));
      box.appendChild(row3);
      const p = document.createElement("p");
      p.style.fontWeight = "700";
      p.textContent = eqMat(chk, ident(A.length))
        ? "A 是非奇異的，A A⁻¹＝I，可用伴隨矩陣求出逆矩陣。"
        : "請再核對輸入的元素。";
      box.appendChild(p);
    }
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

  function renderTaskBody(box, t, revealed) {
    const L = ui();
    if (t.show) box.appendChild(showNamed(t.show.name, t.show.matrix));

    if (t.type === "compare") {
      const row = document.createElement("div");
      row.className = "given-row";
      row.appendChild(showNamed(t.leftLabel, t.left));
      if (revealed) row.appendChild(showNamed(t.rightLabel, t.right));
      box.appendChild(row);
      if (revealed && t.equal === true) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = "兩個矩陣相等。";
        box.appendChild(p);
      } else if (revealed && t.equal === false) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = "兩個矩陣不相等。";
        box.appendChild(p);
      }
    } else if (t.type === "products") {
      if (revealed) {
        t.products.forEach((pr) => {
          const row = document.createElement("div");
          row.className = "given-row";
          row.appendChild(showNamed(pr.label, pr.answer));
          box.appendChild(row);
        });
        if (t.answerTex) {
          const p = document.createElement("p");
          p.style.fontWeight = "700";
          p.appendChild(L.texSpan(t.answerTex));
          box.appendChild(p);
        }
      }
    } else if (t.type === "matrix") {
      if (revealed) box.appendChild(showNamed("", t.answer));
    } else if (t.type === "value") {
      if (revealed) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        if (t.answerTex) p.appendChild(L.texSpan(t.answerTex));
        else p.appendChild(L.texSpan(fmt(t.answer)));
        box.appendChild(p);
      }
    } else if (t.type === "yesno") {
      if (revealed) {
        const p = document.createElement("p");
        p.style.fontWeight = "700";
        p.textContent = t.answer ? (t.yesLabel || "是。") : (t.noLabel || "否。");
        box.appendChild(p);
      }
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
    actions.appendChild(L.button(adjState.revealed ? "隱藏答案" : "揭曉答案", "btn-primary", () => {
      adjState.revealed = !adjState.revealed;
      renderAdj();
    }));
    if (item.loadA) {
      actions.appendChild(L.button("載入到計算示範", "btn-quiet", () => loadA(item.loadA)));
    }
    stage.appendChild(actions);

    item.tasks.forEach((t) => {
      const box = document.createElement("div");
      box.className = (adjState.revealed ? "feedback ok " : "") + "task";
      const h = document.createElement("h3");
      h.style.fontSize = "16px";
      h.textContent = t.q;
      box.appendChild(h);
      renderTaskBody(box, t, adjState.revealed);
      stage.appendChild(box);
    });
    if (!adjState.revealed) {
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
    const list = adjState.group === "adj" ? [] : itemsInGroup(adjState.group);
    list.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", it.id === adjState.item ? "true" : "false");
      b.innerHTML = it.title + (it.tag ? '<span class="tag">' + it.tag + "</span>" : "");
      b.addEventListener("click", () => {
        adjState.item = it.id;
        adjState.revealed = false;
        sync();
        renderAdj();
      });
      host.appendChild(b);
    });
  }

  function hideOther(on) {
    ["111", "112", "113", "114", "115"].forEach((id) => {
      const m = document.getElementById("modes-" + id);
      const n = document.getElementById("notes-" + id);
      if (m) m.hidden = id !== on;
      if (n) n.hidden = id !== on;
    });
  }

  function renderAdj() {
    const L = ui();
    hideOther("115");
    document.getElementById("brand-sub").textContent = "馬Sir教室 · 中五 M2 · §11.5 計算逆矩陣";
    document.querySelectorAll("#chapters [data-chapter]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-chapter") === "11.5" ? "true" : "false");
    });
    document.querySelectorAll("#modes-115 [data-adj]").forEach((b) => {
      b.setAttribute("aria-selected", b.getAttribute("data-adj") === adjState.group ? "true" : "false");
    });
    L.els.notes.hidden = !L.state.notesOpen;
    L.els.notesBtn.setAttribute("aria-pressed", L.state.notesOpen ? "true" : "false");
    renderGroupBar();
    const stage = L.els.stage;
    stage.innerHTML = "";
    if (adjState.group === "adj" || adjState.item === "adj") renderPlayground(stage);
    else {
      const item = ITEMS.find((it) => it.id === adjState.item) || itemsInGroup(adjState.group)[0];
      if (item) renderItem(stage, item);
    }
    L.typeset(document);
  }

  function sync() {
    let h = "adj";
    if (adjState.item && adjState.item !== "adj") {
      const it = ITEMS.find((x) => x.id === adjState.item);
      h = (it && it.hash) || adjState.group;
    } else {
      h = adjState.group === "adj" ? "adj" : adjState.group;
    }
    if (location.hash.replace(/^#/, "") !== h) history.replaceState(null, "", "#" + h);
  }

  function hasHash(raw) {
    if (!raw) return false;
    if (raw === "ch11.5" || raw === "adj" || raw === "transpose" || raw === "detprop" || raw === "adjugate" || raw === "exer11E" || raw === "assess11.5") return true;
    return !!HASH[raw];
  }

  function apply(raw) {
    if (!raw || raw === "ch11.5" || raw === "adj") {
      adjState.group = "adj";
      adjState.item = "adj";
      return;
    }
    if (GROUPS.some((g) => g.id === raw)) {
      adjState.group = raw;
      const list = itemsInGroup(raw);
      adjState.item = list.length ? list[0].id : "adj";
      adjState.revealed = false;
      return;
    }
    const it = HASH[raw];
    if (it && it.group) {
      adjState.group = it.group;
      adjState.item = it.id;
      adjState.revealed = false;
    } else if (it && it.groupOnly) {
      adjState.group = it.groupOnly;
      const list = itemsInGroup(it.groupOnly);
      adjState.item = list.length ? list[0].id : it.groupOnly;
      adjState.revealed = false;
    }
  }

  function bind() {
    document.querySelectorAll("#modes-115 [data-adj]").forEach((b) => {
      b.addEventListener("click", () => {
        const g = b.getAttribute("data-adj");
        adjState.group = g;
        adjState.revealed = false;
        if (g === "adj") adjState.item = "adj";
        else {
          const list = itemsInGroup(g);
          adjState.item = list[0] ? list[0].id : g;
        }
        sync();
        renderAdj();
      });
    });
  }

  window.LabAdj = {
    hasHash, apply, render: renderAdj, bind, ITEMS, transpose, detOf, adjOf, cofactorMatrix, mul, ident, eqMat,
  };
})();
