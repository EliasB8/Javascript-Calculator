import React from "react";
import Keypad from "./Keypad";

const keypadIds = [
  "clear",
  "divide",
  "multiply",
  "seven",
  "eight",
  "nine",
  "subtract",
  "four",
  "five",
  "six",
  "add",
  "one",
  "two",
  "three",
  "zero",
  "decimal",
  "equals"
];

const keypadValues = [
  "AC",
  "/",
  "x",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
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
export { keypadIds };
