const display = document.querySelector(".display");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const editors = document.querySelectorAll(".editor");

operands.forEach(operand => operand.addEventListener("click", handleOperand));
operators.forEach(operand => operand.addEventListener("click", handleOperator));
editors.forEach(editor => editor.addEventListener("click", handleEditor));

const calculator = {
    displayValue: "0",
    operand1: null,
    operand2: null,
    operating: false,
    operator: null,
}

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function inverse(a) {
    return 1 / a;
};

function square(a) {
    return a * a;
};

function sqrt(a) {
    return Math.sqrt(a);
};

function clear() {
    calculator.displayValue = "0";
    calculator.operand1 = null;
    calculator.operand2 = null;
    calculator.operating = false;
    calculator.operator = null;
    updateDisplay();
};

function clearEntry() {

}

function updateDisplay() {
    display.textContent = calculator.displayValue;
}


function operate(operator, a, b) {
    a = parseInt(a);
    b = parseInt(b);
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:
            break;                   
    }
    return result;
};

function erase() {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
    display.textContent = (calculator.displayValue === "") ? "0" : calculator.displayValue;
};

function handleEditor() {
    switch (this.id) {
        case "C":
            clear();
            break;
        case "CE":
            clearEntry();
            break;
        case "E":
            erase();
            break;         
    }
};

