const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const negateBtn = document.querySelector('[data-negate]');
const display = document.querySelector('[data-display]');

numberBtns.forEach((button) => {
    button.addEventListener('click', () => appendNum(button.innerText));
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.innerText));
});

equalsBtn.addEventListener('click', calculate);
deleteBtn.addEventListener('click', deleteNum);
clearBtn.addEventListener('click', clear);
negateBtn.addEventListener('click', negate);
window.addEventListener('keydown', keyInput);

const keyOperators = ['+', '-', '*', '/', '^'];
const MAX_VALUE = 999999999999;
const MIN_VALUE = -99999999999;

let prevOperand = '';
let currOperand = '';
let currOperation = undefined;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(a, b) {
    return a ** b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    let result;
    switch (operator) {
        case '^':
            result = power(a, b);
            break;
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            if (b === 0) {
                alert("I'm sorry, Dave. I'm afraid I can't do that.");
                clear();
                return '';
            }
            result = divide(a, b);
            break;
        default:
            result = '';
            break;
    }
    return result.toString().length >= 12 ? formatLargeNum(result) : result;
}

function calculate() {
    if (currOperation === undefined) return;
    if (currOperand === '' && prevOperand === '') return;
    if (prevOperand !== '' && currOperand !== '') {
        currOperand = operate(currOperation, prevOperand, currOperand); // 1 + 1 + => 2 or 1 + 1 = => 2
    } else if (prevOperand !== '' && currOperand === '') {
        currOperand = operate(currOperation, prevOperand, prevOperand); // 1 + + => 2
    } else {
        prevOperand = currOperand;
    }
    currOperation = undefined;
    updateDisplay();
}

function appendNum(number) {
    if (number === '.' && currOperand.includes('.')) return;
    if (
        (number === '.' && currOperand.length >= 11) ||
        currOperand.length >= 12
    )
        return;
    currOperand += number;
    updateDisplay();
}

function deleteNum() {
    currOperand = currOperand.slice(0, -1);
    updateDisplay();
}

function clear() {
    prevOperand = '';
    currOperand = '';
    currOperation = undefined;
    updateDisplay();
}

function negate() {
    if (currOperand === '') return;
    currOperand = -currOperand;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currOperand;
}

function convertOperation(operation) {
    if (operation === '+') return '+';
    if (operation === '-') return '-';
    if (operation === '*') return '×';
    if (operation === '/') return '÷';
    if (operation === '^') return '^';
}

function setOperation(operation) {
    if (currOperation !== undefined) calculate();
    currOperation = operation;
    prevOperand = currOperand;
    currOperand = '';
}

function formatLargeNum(number) {
    result = Number(number);
    if (result.toString().includes('.')) result = Math.round(Number(result));
    if (result >= MAX_VALUE || result <= MIN_VALUE)
        result = result.toExponential(2);
    return result;
}

function keyInput(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNum(e.key);
    if (keyOperators.indexOf(e.key) !== -1)
        setOperation(convertOperation(e.key));
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNum();
    if (e.key === 'Escape') clear();
    if (e.key === '!') negate();
}
