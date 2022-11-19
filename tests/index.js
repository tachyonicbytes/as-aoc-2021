console.log("AOC 2021 in AssemblyScript")

const wasmModule = require("../index.js");
const fs = require("fs");

function main(wasmModule) {
  console.log("Day1: " + wasmModule.day1(wasmModule.__newString(fs.readFileSync("days/1/input.txt").toString())));
  console.log("Day2: " + wasmModule.day2(wasmModule.__newString(fs.readFileSync("days/2/input.txt").toString())));
  console.log("Day3: " + wasmModule.day3(wasmModule.__newString(fs.readFileSync("days/3/input.txt").toString())));
  //TODO
  console.log("Day4: " + wasmModule.day4(wasmModule.__newString(fs.readFileSync("days/4/input.txt").toString().replace(/\n /g, "\n").replace(/  /g, " ")))); // Aid AssemblyScript a bit.
  console.log("Day5: " + wasmModule.day5(wasmModule.__newString(fs.readFileSync("days/5/input.txt").toString())));
  console.log("Day6: " + wasmModule.day6(wasmModule.__newString(fs.readFileSync("days/6/input.txt").toString())));
  console.log("Day7: " + wasmModule.day7(wasmModule.__newString(fs.readFileSync("days/7/input.txt").toString())));
  console.log("Day8: " + wasmModule.day8(wasmModule.__newString(fs.readFileSync("days/8/input.txt").toString())));
  console.log("Day9: " + wasmModule.day9(wasmModule.__newString(fs.readFileSync("days/9/input.txt").toString())));
  console.log("Day10: " + wasmModule.day10(wasmModule.__newString(fs.readFileSync("days/10/input.txt").toString())));
}

main(wasmModule);
