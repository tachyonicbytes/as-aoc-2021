import * as console from "./myConsole";

export function day1(input: string): i32 {
  let inputArray = input.split("\n").map((str: string) => I32.parseInt(str));
  let sums = 0;

  if (inputArray.length < 2) {
    return sums;
  }

  for (let i = 0; i < inputArray.length - 1; i++) {
    if (inputArray[i + 1] - inputArray[i] > 0) {
      sums++;
    }
  }

  return sums;
}

export function day2(input: string): i32 {
  let input_arr = input.split("\n");
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < input_arr.length; i++) {
    let temp = input_arr[i].split(" ");
    if (temp[0] == "forward") {
      horizontal += I32.parseInt(temp[1]);
    } else if (temp[0] == "up") {
      depth -= I32.parseInt(temp[1]);
    } else if (temp[0] == "down") {
      depth += I32.parseInt(temp[1]);
    }
  }
 return horizontal * depth;
}

/*
 * TODO
 */
function setbit64(bit: i64, value: i8): i64 {

  return 0;
}

export function day3(input: string): u64 {
  let inputArray = input.split("\n");

  let M = inputArray.length;
  let N = inputArray[0].length;
  let gamma: u64 = 0;
  let epsilon: u64 = 0;

  for (let i = 0; i < N; i++) {
    let count0: u64 = 0;
    let count1: u64 = 0;

    for (let j = 0; j < M; j++) {
      if (inputArray[j].charAt(i) === "0") {
        count0++;
      }
    }
    count1 = M - count0;

    gamma *= 2;
    epsilon *= 2;

    if (count0 < count1) {
      gamma += 1;
    } else {
      epsilon += 1;
    }

  }

  return gamma * epsilon;
  // 2640986n
}

function day4WinRows(board: Array<Int16Array>): bool {
  let win: bool = true;
  for (let i = 0; i < board.length; i++) {
    win = true;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== -1) {
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  return win;
}

function day4WinColumns(board: Array<Int16Array>): bool {
  let win: bool = true;
  for (let i = 0; i < board.length; i++) {
    win = true;
    for (let j = 0; j < board[i].length; j++) {
      if (board[j][i] !== -1) { // this is valid only because we have square boards.
        win = false;
      }
    }
    if (win) {
      return win;
    }
  }

  return win;
}

function day4Win(board: Array<Int16Array>): bool {
  return day4WinRows(board) && day4WinColumns(board);
}

function day4PrintBoard(board: Array<Int16Array>): string {
  let result: string = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[i][j].toString();
      result += " ";
    }
    result += "\n";
  }
  return result;
}

function day4ComputeScore(board: Array<Int16Array>, number: i64): i64 {
  let sum: i64 = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] != -1) {
        sum += board[i][j];
      }
    }
  }

  return sum * number;
}

export function day4(input: string): i64 {
  let inputArray = input.split("\n\n");

  // parse numbers
  let numbers: i16[] = inputArray[0].split(",").map((str: string) => I16.parseInt(str));

  // console.log(numbers.toString());

  // parse boards
  let boards = new Array<Array<Int16Array>>();
  for (let i = 1; i < inputArray.length; i++) {
    boards.push(new Array<Int16Array>());
    let board = inputArray[i].split("\n");
    for (let j = 0; j < board.length; j++) {
      let row = board[j].split(" ").map((str: string) => I16.parseInt(str));
      let temp: Int16Array = new Int16Array(5);
      for (let k = 0; k < row.length; k++) {
        temp[k] = row[k];
      }
      boards[i - 1].push(temp);
    }
  }

  for (let i = 0; i < boards.length; i++) {
    // console.log(day4PrintBoard(boards[i]));
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      for (let k = 0; k < boards[j].length; k++) {
        for (let l = 0; l < boards[j][k].length; l++) {
          if (boards[j][k][l] == numbers[i]) {
            boards[j][k][l] = -1;
          }
          if (day4Win(boards[j])) {
            // console.log(day4PrintBoard(boards[j]));
            // console.log(numbers[i].toString());
            return day4ComputeScore(boards[j], numbers[i]);
          }
        }
      }
    }
  }

  return 0;
}

export function day5(input: string): i32 {
  let inputArray = input.split("\n");
  // inputs looks like:
  // x1,y1 -> x2,y2
  let xys: Array<Int32Array> = new Array<Int32Array>(inputArray.length);
  let maximum: i32 = 0;
  for (let i = 0; i < inputArray.length; i++) {
    let xy = inputArray[i].split(" -> ");
    let xy1 = xy[0].split(",");
    let xy2 = xy[1].split(",");

    let temp = new Int32Array(4);

    let x1 = I32.parseInt(xy1[0]);
    let y1 = I32.parseInt(xy1[1]);
    let x2 = I32.parseInt(xy2[0]);
    let y2 = I32.parseInt(xy2[1]);

    temp[0] = x1;
    temp[1] = y1;
    temp[2] = x2;
    temp[3] = y2;

    // console.log(x1.toString() + "," + y1.toString() + " -> " + x2.toString() + "," + y2.toString());

    xys[i] = temp;

    if (maximum < max(x1, max(y1, max(x2, y2)))) {
      maximum = max(x1, max(y1, max(x2, y2)));
    }
  }
  // The graph is small enough, so an adjacency matrix suffices
  // console.log(maximum.toString());

  let matrix = new Array<Int32Array>(maximum + 1);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Int32Array(maximum + 1);
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0;
    }
  }

  // We are here
  for (let i = 0; i < xys.length; i++) {
    let temp = xys[i];
    let x1 = temp[0];
    let y1 = temp[1];
    let x2 = temp[2];
    let y2 = temp[3];

    let tempXMin = min(x1, x2);
    let tempXMax = max(x1, x2);

    let tempYMin = min(y1, y2);
    let tempYMax = max(y1, y2);

    x1 = tempXMin;
    x2 = tempXMax;
    y1 = tempYMin;
    y2 = tempYMax;

    if (x1 == x2) {
      for (let j = y1; j < y2 + 1; j++) {
        matrix[x1][j] += 1;
      }
    }

    if (y1 == y2) {
      for (let j = x1; j < x2 + 1; j++) {
        matrix[j][y1] += 1;
      }
    }

  }

  // console.log(matrix.toString());
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] >= 2) {
        sum += 1;
      }
    }
  }

  return sum;
}


/**
 * A lanternfish produces nothing until the counter. At 0, it produces an 8 and a 6 the following day.
 *
 * lantern(x, y) = 1, x <= y (just itself)
 *
 * lantern(0, 5) = lantern(6, 4) + lantern(8, 4)
 *
 * lantern(6, n) = lantern(0, n - 6) = lantern(6, n - 7) + lantern(8, n - 7) = lantern(0, n - 7 - 6) + lantern (2, n - 7 - 6)
 *
 */
export function day6(input: string): i32 {
  let inputArray = input.split(",").map((str: string) => I32.parseInt(str));

  let fishes = new Int32Array(9);

  for (let i = 0; i < fishes.length; i++) {
    fishes[i] = 0;
  }

  for (let i = 0; i < inputArray.length; i++) {
    fishes[inputArray[i]] += 1;
  }

  // console.log(fishes.toString());

  for (let i = 0; i < 80; i++) {
    let temp = fishes[0];
    for (let fish = 0; fish < fishes.length - 1; fish++) {
      fishes[fish] = fishes[fish + 1];
    }
    fishes[8] = temp;
    fishes[6] += temp;
  }

  // console.log(fishes.toString());
  let sum = 0;
  for (let fish = 0; fish < fishes.length; fish++) {
    sum += fishes[fish];
  }

  return sum;
}

export function day7(input: string): i32 {
  let inputArray = input.split(",").map((str: string) => I32.parseInt(str));
  let maximum = 0;
  let minimum = i32.MAX_VALUE;
  for (let i = 0; i < inputArray.length; i++) {
    if (maximum < inputArray[i]) {
      maximum = inputArray[i];
    }
    if (minimum > inputArray[i]) {
      minimum = inputArray[i];
    }
  }

  let min_sum = i32.MAX_VALUE;
  for (let i = minimum; i < maximum; i++) {
    let sum = 0;
    for (let j = 0; j < inputArray.length; j++) {
      sum += abs(inputArray[j] - i);
    }
    if (min_sum > sum) {
      min_sum = sum;
    }
  }

  return min_sum;
}

export function day8(input: string): i32 {
  let inputArray = input.split("\n");
  let sum = 0;
  for (let i = 0; i < inputArray.length; i++) {
    let temp = inputArray[i].split(" | ")[1].split(" ");
    for (let j = 0; j < temp.length; j++) {
      let len = temp[j].length;
      switch (len) {
        case 2: // 1
        case 3: // 7
        case 4: // 4
        case 7: { // 8
          sum += 1;
          break;
        }
      }
    }
  }
  return sum;
}

function day9IsMinimum(board: Array<Array<i8>>, i: i32, j: i32) : bool {
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if ((i + r >= board.length) || (i + r < 0) || (r == 0 && c == 0) || (j + c >= board[i].length) || (j + c < 0)) {
        continue;
      }

      if ((r == 1 && c == 1) || (r == 1 && c == -1) || (r == -1 && c == 1) || (r == -1 && c == -1)) {
        continue;
      }

      if (board[i][j] >= board[i + r][j + c]) {
        return false;
      }
    }
  }

  return true;
}

export function day9(input: string): i32 {
  let inputArray = input.split("\n");
  let board = new Array<Array<i8>>(inputArray.length);

  for (let a = 0; a < inputArray.length; a++) {
    board[a] = inputArray[a].split("").map((str: string) => I8.parseInt(str));
  }

  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (day9IsMinimum(board, i, j)) {
        // console.log(board[i][j].toString() + " " + i.toString() + " " + j.toString());
        // console.log(i.toString());
        // console.log(j.toString());
        sum += board[i][j] + 1;
      }
    }
  }

  return sum;
}

interface IStack<T> {
  push(item: T): void;
  pop(): T | null;
  peek(): T | null;
  size(): i32;
}

class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(private capacity: i32 = i32.MAX_VALUE) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): T | null {
    return this.storage.pop();
  }

  peek(): T | null {
    return this.storage[this.size() - 1];
  }

  size(): i32 {
    return this.storage.length;
  }
}

function day10ParseLine(line: string): string {
  // Initial numbers of each kinds of paranthesis.
  let state = new Stack<string>(100); //TODO: Arbitrary constraint

  for (let i = 0; i < line.length; i++) {
    if ("([{<".includes(line[i])) {
      // We can always open any paranthesis
      state.push(line[i]);
      continue;
    } else {
      let top = state.pop();
      if (
        (line[i] == ")" && top != "(") ||
        (line[i] == "]" && top != "[") ||
        (line[i] == "}" && top != "{") ||
        (line[i] == ">" && top != "<")
      ) {
        return line[i];
      }
    }
  }

  return "";
}

export function day10(input: string): i32 {
  let inputArray = input.split("\n");

  let costs = new Map<string, i32>();
  costs.set("", 0);
  costs.set(")", 3);
  costs.set("]", 57);
  costs.set("}", 1197);
  costs.set(">", 25137);

  let sum = 0;
  for (let i = 0; i < inputArray.length; i++) {
    let c = day10ParseLine(inputArray[i]);
    // console.log(c);
    sum += costs.get(c);
  }

  return sum;
}
