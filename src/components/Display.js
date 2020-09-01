import React from "react";

function Display(props) {
  return (
    <div className="display" id="display">
      <p className="display-row output">{props.output}</p>
      <p className="display-row input">{props.input}</p>
    </div>
  );
}

export default Display;
