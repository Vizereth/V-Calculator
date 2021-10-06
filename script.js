const previousOperand = document.getElementById("previous-operand");
const currentOperand = document.getElementById("current-operand");

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete");
const clearButton = document.querySelector("[data-clear]");

class Calculator {
  constructor(prev, curr) {
    this.previousOperandElement = prev;
    this.currentOperandElement = curr;

    this.currentOperand = null;

    this.calculated = false;
  }

  calculate() {
    let operand = this.currentOperandElement.innerHTML;
    let result;

    if (operand.charAt(operand.length - 1) === ".") {
        return;
    }

    if (isNaN(operand.charAt(operand.length - 1))) {
      operand = operand.substring(0, operand.length - 1);
    }

    result = eval(operand);

    this.calculated = true;
    this.previousOperandElement.innerHTML = operand;
    this.currentOperandElement.innerHTML = result;
  }

  updateCurrentOperand() {
    const operand = this.currentOperandElement.innerHTML;

    if (this.calculated === true) {
      this.calculated = false;
      this.currentOperandElement.innerHTML = "";
    }

    if (this.checkForDots(operand) && this.currentOperand === ".") {
      return;
    }

    if (this.checkForOperations(operand)) {
      return;
    }

    if (this.checkForFirstSymbol(operand)) {
      return;
    }

    this.currentOperandElement.innerHTML += this.currentOperand;
  }

  checkForDots(operand) {
    const operations = "*-+/";

    for (let i = operand.length - 1; i >= 0; i--) {
      if (operand.charAt(i) === ".") {
        return true;
      } else if (operations.includes(operand.charAt(i))) {
        return false;
      }
    }
  }

  checkForOperations(operand) {
    const lastOperandSymbol = operand.charAt(operand.length - 1);

    if (
      isNaN(lastOperandSymbol) &&
      isNaN(this.currentOperand) &&
      this.currentOperand !== "."
    ) {
      return true;
    }
  }

  checkForFirstSymbol(operand) {
    const operations = "*-+/";

    if (operand === "" && operations.includes(this.currentOperand)) {
      return true;
    }
  }

  deleteFromCurrentOperand() {
    let operand = this.currentOperandElement.innerHTML;
    operand = operand.substring(0, operand.length - 1);

    this.currentOperandElement.innerHTML = operand;
  }

  clear() {
    this.previousOperandElement.innerHTML = "";
    this.currentOperandElement.innerHTML = "";
    this.currentOperand = null;
  }
}

const calculator = new Calculator(previousOperand, currentOperand);

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    calculator.currentOperand = item.innerHTML;
    calculator.updateCurrentOperand();
  });
});

operations.forEach((item) => {
  item.addEventListener("click", function () {
    calculator.currentOperand = item.innerHTML;
    calculator.updateCurrentOperand(item.innerHTML);
  });
});

equalsButton.addEventListener("click", function () {
  calculator.calculate();
});

deleteButton.addEventListener("click", function () {
  calculator.deleteFromCurrentOperand();
});

clearButton.addEventListener("click", function () {
  calculator.clear();
});
