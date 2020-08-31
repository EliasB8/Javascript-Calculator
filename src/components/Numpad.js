import React from "react";
import Keypad from "./Keypad";

const keypadIds = [
  "clear",
  "left-bracket",
  "right-bracket",
  "divide",
  "seven",
  "eight",
  "nine",
  "multiply",
  "four",
  "five",
  "six",
  "subtract",
  "one",
  "two",
  "three",
  "add",
  "zero",
  "decimal",
  "equals"
];

const keypadValues = [
  "AC",
  "(",
  ")",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "="
];

function Numpad() {
  const Keypads = keypadValues.map((keypad, index) => (
    <Keypad key={index} id={keypadIds[index]} input={keypad} />
  ));
  return <div className="numpads">{Keypads}</div>;
}

export default Numpad;
