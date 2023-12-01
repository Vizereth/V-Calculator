(() => {
    "use strict";
    const previousOperand = document.querySelector("[data-previous]");
    const currentOperand = document.querySelector("[data-current]");
    const numbers = document.querySelectorAll("[data-number]");
    const operations = document.querySelectorAll("[data-operation]");
    const equalsButton = document.querySelector("[data-equals]");
    const deleteButton = document.querySelector("[data-delete]");
    const clearButton = document.querySelector("[data-clear]");
    class Calculator {
        constructor(prev, curr) {
            this.previousOperandElement = prev;
            this.currentOperandElement = curr;
            this.currentOperand = "";
            this.operator = null;
            this.calculated = false;
        }
        appendNumber(number) {
            if (this.calculated) {
                this.clear();
                this.calculated = false;
            }
            this.currentOperand += number;
            this.updateDisplay();
        }
        chooseOperation(operator) {
            if (this.calculated) this.calculated = false;
            if (null !== this.operator) this.calculate();
            this.operator = operator;
            this.previousOperandElement.innerHTML = this.currentOperand + " " + this.operator;
            this.currentOperand = "";
        }
        calculate() {
            let result;
            const prev = parseFloat(this.previousOperandElement.innerHTML);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operator) {
              case "+":
                result = prev + current;
                break;

              case "-":
                result = prev - current;
                break;

              case "*":
                result = prev * current;
                break;

              case "/":
                result = prev / current;
                break;

              default:
                return;
            }
            this.currentOperand = result.toString();
            this.operator = null;
            this.updateDisplay();
            this.calculated = true;
        }
        deleteFromCurrentOperand() {
            this.currentOperand = this.currentOperand.slice(0, -1);
            this.updateDisplay();
        }
        clear() {
            this.previousOperandElement.innerHTML = "";
            this.currentOperand = "";
            this.operator = null;
        }
        updateDisplay() {
            this.currentOperandElement.innerHTML = this.currentOperand;
        }
    }
    const calculator = new Calculator(previousOperand, currentOperand);
    numbers.forEach((item => {
        item.addEventListener("click", (() => calculator.appendNumber(item.innerHTML)));
    }));
    operations.forEach((item => {
        item.addEventListener("click", (() => calculator.chooseOperation(item.innerHTML)));
    }));
    equalsButton.addEventListener("click", (() => calculator.calculate()));
    deleteButton.addEventListener("click", (() => calculator.deleteFromCurrentOperand()));
    clearButton.addEventListener("click", (() => calculator.clear()));
})();