import React from "react";
import Display from "./Display";
import Numpad from "./Numpad";

class Main extends React.Component {
  render() {
    return (
      <div className="calculator-container">
        <Display />
        <Numpad />
      </div>
    );
  }
}

export default Main;
