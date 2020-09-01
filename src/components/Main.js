import React from "react";
import Display from "./Display";
import Numpad, { keypadIds } from "./Numpad";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "0",
      output: "",
      prevAns: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleBracket = this.handleBracket.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleClear() {
    this.setState({
      input: "0",
      output: "",
      prevAns: ""
    });
  }

  handleEquals() {
    console.log("=");
  }

  handleOperator(operator) {
    console.log(operator);
  }

  handleBracket(bracket) {
    console.log(bracket);
  }

  handleDecimal() {
    const regex = /[.]/;
    if (!regex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + "."
      }));
    }
  }

  handleZero() {
    // if starts with a non - zero or if there is a decimal point allow zero else don't
    if (this.state.input.length === 1 && this.state.input === "0") {
      this.setState({
        input: "0"
      });
    } else {
      const regex = /(^0.|^[1-9][.]|^[1-9])/;
      if (regex.test(this.state.input)) {
        this.setState((state) => ({
          input: state.input + "0"
        }));
      }
    }
  }

  handleNumber(number) {
    if (this.state.input.length === 1) {
      this.setState({
        input: ""
      });
    }
    this.setState((state) => ({
      input: state.input + number
    }));
  }

  handleClick(event) {
    const keyClicked = event.target.innerText;
    switch (keyClicked) {
      case "AC":
        this.handleClear();
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        this.handleOperator(keyClicked);
        break;
      case "(":
      case ")":
        this.handleBracket(keyClicked);
        break;
      case ".":
        this.handleDecimal();
        break;
      case "0":
        this.handleZero();
        break;
      case "=":
        this.handleEquals();
        break;
      default:
        this.handleNumber(keyClicked);
        break;
    }
  }
  componentDidMount() {
    keypadIds.forEach((item) => {
      document.getElementById(item).addEventListener("click", (e) => {
        this.handleClick(e);
      });
    });
  }

  render() {
    return (
      <div className="calculator-container">
        <Display
          input={this.state.input}
          output={this.state.output}
          answer={this.state.prevAns}
        />
        <Numpad />
      </div>
    );
  }
}

export default Main;
