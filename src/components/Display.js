import React from "react";

function Display(props) {
  return (
    <div className="display-container">
      <div className="display-row input">{props.input}</div>
      <div className="display-row data" id="display">
        {props.data}
      </div>
    </div>
  );
}

export default Display;
