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
    const answer = evaluate(this.state.input);
    this.setState((state) => ({
      data: answer,
      prevAns: answer,
      input: state.input + "=" + answer
    }));
    // handle if user clicked equlas
  }

  handleOperator(operator) {
    operator = operator === "x" ? "*" : operator; // if()
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
      if (removeSignRegex.test(this.state.input) && operator === "+") {
        this.setState((state) => ({
          input: state.input.substring(0, state.input.length - 2) + operator
        }));
        console.log("first");
      } else {
        if (removeSignRegex.test(this.state.input) && operator !== "-") {
          this.setState((state) => ({
            input: state.input.substring(0, state.input.length - 2) + operator
          }));
          console.log("2first");
        }
        if (addSignRegex.test(this.state.input) && operator === "-") {
          this.setState((state) => ({
            input: state.input + operator
          }));
          console.log("3first");
        } else {
          if (regex.test(this.state.input)) {
            this.setState((state) => ({
              input: state.input.substring(0, state.input.length - 1) + operator
            }));
            console.log("4first");
          } else {
            this.setState((state) => ({
              input: state.input + operator
            }));
            console.log("5first");
          }
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
    // const regex = /[+*/-]/;
    // if (this.state.prevAns) {
    //   this.setState((state) => ({
    //     input: number,
    //     data: number,
    //     prevAns: ""
    //   }));
    // } else {
    //   this.setState((state) => ({
    //     input: state.input + number,
    //     data: regex.test(this.state.data) ? number : state.data + number
    //   }));
    // }
    if (this.state.prevAns === "") {
      this.setState((state) => ({
        input: state.input + number,
        data: state.data + number
      }));
    } else {
      this.setState((state) => ({
        input: number,
        data: number,
        prevAns: ""
      }));
    }
  }

  handleClick(event) {
    const keyClicked = event.target.value;
    // console.log(keyClicked);
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
