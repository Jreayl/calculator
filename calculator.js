const display = document.querySelector(".display");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

operands.forEach(operand => operand.addEventListener("click", updateDisplay));
operators.forEach(operand => operand.addEventListener("click", updateDisplay));

let displayVal = "";
let num1 = 0;
let num2 = 0;
let operator = "";
let operating = false;
let expression = [];

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
    let displayVal = "";
    let num1 = 0;
    let num2 = 0;
    let operator = "";
    let operating = false;
    let expression = [];
};

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
};

function erase() {
    displayVal = displayVal.split(0, -1);
    if (displayVal === "") {
        display.textContent = "0";
    }
    else {
        display.textContent = displayVal;
    }
};

