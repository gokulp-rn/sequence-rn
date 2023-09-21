const cornerValue = {
  occupiedCoin: "all",
};

const L = "LEFT";
const R = "RIGHT";
const T = "TOP";
const B = "BOTTOM";
const LB = "LEFT_BOTTOM";
const RB = "RIGHT_BOTTOM";
const LT = "LEFT_TOP";
const RT = "RIGHT_TOP";

let boardMap = null;

export function getBoardMap(reset) {
  if (!boardMap || reset) {
    boardMap = new Board();
  }
  return boardMap;
}

class Board {
  constructor() {
    this.possibleBoardPatterns = new Map();
    this.boardMapStatus = {};
    this.boardMapStatus["0_0"] = cornerValue;
    this.boardMapStatus["0_9"] = cornerValue;
    this.boardMapStatus["9_0"] = cornerValue;
    this.boardMapStatus["9_9"] = cornerValue;

    this.generateAllPatterns();
    this.generateCardDeck();
  }

  generateSequencePattern(m, n, dir, limit = 5) {
    const result = new Set();
    switch (dir) {
      case L:
        const leftFirstPoint = n - limit + 1;
        if (leftFirstPoint < 0) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m}_${n - i}`);
        }
        break;

      case R:
        const rightLastPoint = n + limit - 1;
        if (rightLastPoint > 9) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m}_${n + i}`);
        }
        break;

      case T:
        const topFirstPoint = m - limit + 1;
        if (topFirstPoint < 0) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m - i}_${n}`);
        }
        break;

      case B:
        const bottomLastPoint = m + limit - 1;
        if (bottomLastPoint > 9) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m + i}_${n}`);
        }
        break;

      case LT:
        const leftTopFirstPointN = n - limit + 1;
        const leftTopFirstPointM = m - limit + 1;
        if (leftTopFirstPointN < 0 || leftTopFirstPointM < 0) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m - i}_${n - i}`);
        }
        break;

      case RT:
        const rightTopLastPointN = n + limit - 1;
        const rightTopLastPointM = m - limit + 1;
        if (rightTopLastPointN > 9 || rightTopLastPointM < 0) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m - i}_${n + i}`);
        }
        break;

      case LB:
        const leftBottomLastPointN = n - limit + 1;
        const leftBottomLastPointM = m + limit - 1;
        if (leftBottomLastPointN < 0 || leftBottomLastPointM > 9) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m + i}_${n - i}`);
        }
        break;

      case RB:
        const rightBottomLastPointN = n + limit - 1;
        const rightBottomLastPointM = m + limit - 1;
        if (rightBottomLastPointN > 9 || rightBottomLastPointM > 9) {
          return null;
        }

        for (let i = 0; i < limit; i++) {
          result.add(`${m + i}_${n + i}`);
        }
        break;
    }
    return result;
  }

  generateSequencePatternsForPoint(m, n) {
    const pointPatterns = [];
    const leftPattern = this.generateSequencePattern(m, n, L);
    const rightPattern = this.generateSequencePattern(m, n, R);
    const topPattern = this.generateSequencePattern(m, n, T);
    const bottomPattern = this.generateSequencePattern(m, n, B);
    const leftTopPattern = this.generateSequencePattern(m, n, LT);
    const leftBottomPattern = this.generateSequencePattern(m, n, LB);
    const rightTopPattern = this.generateSequencePattern(m, n, RT);
    const rightBottomPattern = this.generateSequencePattern(m, n, RB);

    if (leftPattern) pointPatterns.push(leftPattern);
    if (rightPattern) pointPatterns.push(rightPattern);
    if (topPattern) pointPatterns.push(topPattern);
    if (bottomPattern) pointPatterns.push(bottomPattern);
    if (leftTopPattern) pointPatterns.push(leftTopPattern);
    if (leftBottomPattern) pointPatterns.push(leftBottomPattern);
    if (rightTopPattern) pointPatterns.push(rightTopPattern);
    if (rightBottomPattern) pointPatterns.push(rightBottomPattern);

    return pointPatterns;
  }

  generateAllPatterns() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mainPatternsOfPoint = this.generateSequencePatternsForPoint(i, j);

        mainPatternsOfPoint.forEach((mPattern) => {
          mPattern.forEach((mPoint) => {
            const currentValue = this.possibleBoardPatterns.get(mPoint) || [];
            this.possibleBoardPatterns.set(mPoint, [mPattern, ...currentValue]);
          });
        });
      }
    }
  }

  generateCardDeck() {
    const numbersArray = Array.from({ length: 52 }, (_, i) => i);
    this.cardDeck = shuffleArray(numbersArray);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
