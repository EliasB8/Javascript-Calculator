import React from "react";

function Keypad(props) {
  return (
    <div className="keypad" id={props.id}>
      {props.input}
    </div>
  );
}

export default Keypad;
