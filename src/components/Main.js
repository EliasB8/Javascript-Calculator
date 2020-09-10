import React from "react";
import Display from "./Display";
import Numpad, { keypadIds } from "./Numpad";
import { evaluate } from "mathjs";

class Main extends React.Component {
  constructor(props) {
    super(props);

    // Initializing state
    this.state = {
      input: "",
      prevAns: "",
      data: ""
    };

    // binding methods that will update the state
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  // adding a click event listener when component is mounted
  componentDidMount() {
    keypadIds.forEach((item) => {
      document.getElementById(item).addEventListener("click", (e) => {
        this.handleClick(e);
      });
    });
  }

  // removing the click event listener
  componentWillUnmount() {
    keypadIds.forEach((item) => {
      document.getElementById(item).removeEventListener("click", (e) => {
        this.handleClick(e);
      });
    });
  }

  // Clearing all data
  handleClear() {
    this.setState({
      input: "",
      prevAns: "",
      data: ""
    });
  }

  // Handling equal operation
  handleEquals() {

    // regex for checking if the user clicked equal while the last input is an operator
    const regex = /[+*/-]$/;

    // regex for checking dor double equals
    const doubleEqualRegex = /=/;


    // regex for operations like /8 or *8
    const errorCheckRegex = /^[*/][0-9]$/

    // if it is double equal click display previous answer
    if (doubleEqualRegex.test(this.state.input)) {
      this.setState((state) => ({
        prevAns: state.data
      }));
    }

    // if it is not ended in one of the three case then display the calculation
    if (
      !regex.test(this.state.input) &&
      !doubleEqualRegex.test(this.state.input) &&
      !errorCheckRegex.test(this.state.input)
    ) {
      const answer = evaluate(this.state.input);
      this.setState((state) => ({
        data: answer,
        prevAns: answer,
        input: state.input + "=" + answer
      }));
    }
  }

  // Handling each operator
  handleOperator(operator) {
    // Changing X to *
    operator = operator === "x" ? "*" : operator;

    // if there is a previous answer and operator clicked use the prev ans
    if (this.state.prevAns) {
      this.setState((state) => ({
        input: state.prevAns + operator,
        prevAns: "",
        data: operator
      }));
    } else {
      // regex for ending in one of the operators
      const regex = /[+*/-]$/;
      // regex for checking for allowing for negative
      const removeSignRegex = /[+*/]-$/;
      // regex for not updating operators except for -
      const addSignRegex = /[+*/]$/;

      // if user inserted an operator and then negative(minus) sign and then another operator different from -
      // remove the previous two operators and use the last operator
      if (removeSignRegex.test(this.state.input) && operator !== "-") {
        this.setState((state) => ({
          input: state.input.substring(0, state.input.length - 2) + operator
        }));
      }

      // allow negative number via - sign
      if (addSignRegex.test(this.state.input) && operator === "-") {
        this.setState((state) => ({
          input: state.input + operator
        }));
      } else {
        // if not - update operator for more than one click of operator
        if (regex.test(this.state.input)) {
          this.setState((state) => ({
            input: state.input.substring(0, state.input.length - 1) + operator
          }));
        } else {
          // if first click no matter what allow the operation
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

  // handling decimals
  handleDecimal() {
    if (this.state.prevAns) {
      this.setState({
        input: ".",
        prevAns: "",
        data: "."
      });
    } else {
      const regex = /[.]/;
      if (!regex.test(this.state.data)) {
        this.setState((state) => ({
          input: state.input + ".",
          data: state.data + "."
        }));
      }
    }
  }

  // handling zero
  handleZero() {
    if (this.state.prevAns) {
      this.setState((state) => ({
        input: "",
        prevAns: "",
        data: ""
      }));
    }
    const regex = /(^.|^[1-9][.]|^[1-9])/;
    if (regex.test(this.state.input)) {
      this.setState((state) => ({
        input: state.input + "0",
        data: state.data + "0"
      }));
    }
  }

  // handling number
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

  // handling click event
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
