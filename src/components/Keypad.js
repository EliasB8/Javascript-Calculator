import React from "react";

function Keypad(props) {
  return (
    <button className="keypad" id={props.id} value={props.input}>
      {props.input}
    </button>
  );
}

export default Keypad;
