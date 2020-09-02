import React from "react";
import Display from "./Display";
import Numpad, { keypadIds } from "./Numpad";
import { evaluate } from "mathjs";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      prevAns: "",
      data: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  componentDidMount() {
    keypadIds.forEach((item) => {
      document.getElementById(item).addEventListener("click", (e) => {
        this.handleClick(e);
      });
    });
  }

  handleClear() {
    this.setState({
      input: "",
      prevAns: "",
      data: ""
    });
  }

  handleEquals() {
    const regex = /[+*/-]$/;
    const doubleEqualRegex = /=/;
    if (doubleEqualRegex.test(this.state.input)) {
      this.setState((state) => ({
        prevAns: state.data
      }));
    }

    if (
      !regex.test(this.state.input) &&
      !doubleEqualRegex.test(this.state.input)
    ) {
      const answer = evaluate(this.state.input);
      this.setState((state) => ({
        data: answer,
        prevAns: answer,
        input: state.input + "=" + answer
      }));
    }
  }

  handleOperator(operator) {
    operator = operator === "x" ? "*" : operator;
    if (this.state.prevAns) {
      this.setState((state) => ({
        input: state.prevAns + operator,
        prevAns: "",
        data: operator
      }));
    } else {
      const regex = /[+*/-]$/;
      const removeSignRegex = /[+*/]-$/;
      const addSignRegex = /[+*/]$/;
      if (removeSignRegex.test(this.state.input) && operator !== "-") {
        this.setState((state) => ({
          input: state.input.substring(0, state.input.length - 2) + operator
        }));
      }
      if (addSignRegex.test(this.state.input) && operator === "-") {
        this.setState((state) => ({
          input: state.input + operator
        }));
      } else {
        if (regex.test(this.state.input)) {
          this.setState((state) => ({
            input: state.input.substring(0, state.input.length - 1) + operator
          }));
        } else {
          this.setState((state) => ({
            input: state.input + operator
          }));
        }
      }
    }
    this.setState({
      data: operator
    });
  }

  handleDecimal() {
    const regex = /[.]/;
    if (!regex.test(this.state.data)) {
      this.setState((state) => ({
        input: state.input + ".",
        data: state.data + "."
      }));
    }
  }

  handleZero() {
    const regex = /(^.|^[1-9][.]|^[1-9])/;
    if (regex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + "0",
        data: state.data + "0"
      }));
    }
  }

  handleNumber(number) {
    const regex = /[+*/-]/;
    if (this.state.prevAns) {
      this.setState({
        input: number,
        data: number,
        prevAns: ""
      });
    } else {
      this.setState((state) => ({
        input: state.input + number,
        data: regex.test(this.state.data) ? number : state.data + number
      }));
    }
  }

  handleClick(event) {
    const keyClicked = event.target.value;
    switch (keyClicked) {
      case "AC":
        this.handleClear();
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        this.handleOperator(keyClicked);
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

  render() {
    return (
      <div className="calculator-container">
        <Display
          input={this.state.input}
          data={this.state.input === "" ? "0" : this.state.data}
        />
        <Numpad />
      </div>
    );
  }
}

export default Main;
