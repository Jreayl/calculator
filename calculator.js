const operandButtons = document.querySelectorAll('[data-operand]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const negateButton = document.querySelector('[data-negate]');
const displayField = document.querySelector('[data-display]');

let displayVal = '';
let prevOperand = '';
let currOperand = '';
let currOperation = '';

window.addEventListener('keypress', (e) => {
    //handle
});

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNum(button.innerText);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener('click', () => {
    operate(currOperation, prevOperand, currOperand);
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    deleteNum();
    updateDisplay();
});

negateButton.addEventListener('click', () => {
    negate();
    updateDisplay();
});

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

function clear() {
    displayVal = '';
    currOperand = '';
    prevOperand = '';
    currOperation = '';
}

function deleteNum() {
    if (displayVal === '') {
        clear(); 
        updateDisplay();
        return;
    }
    displayVal = displayVal.slice(0, -1);
}

function appendNum(num) {
    displayVal += num.toString();
    currOperand += num.toString();
}

function chooseOperation(operation) {
    if (currOperand === '' && prevOperand === '' && currOperation === '') return;
    if (currOperation !== '' && currOperation !== operation) {
        currOperation = operation;
        return;
    }

    if (currOperand === '' && currOperation !== '') {
        operate(currOperation, prevOperand, prevOperand);
        updateDisplay();
        currOperation = operation;
    }
    else if (currOperand !== '' && prevOperand !== '' && currOperand !== '') {
        operate(currOperation, prevOperand, currOperand);
        updateDisplay();
        currOperation = operation;
        currOperand = '';
        displayVal = '';
    }
    else {
        currOperation = operation;
        prevOperand = currOperand;
        currOperand = '';
        displayVal = '';
    }
}

function operate(operator, a, b) {
    if (displayVal === 'ERROR') return;
    a = parseFloat(a);
    b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) return;
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
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            if (b === 0) result = 'ERROR';
            else result = divide(a, b);
            break;
        default:
            return;
    }
    prevOperand = result;
    displayVal = result;
    currOperand = '';
    currOperation = '';
}

function negate() {
    if (displayVal === '') return;
    displayVal = -displayVal;
    currOperand = -currOperand;
}

function updateDisplay() {
    displayField.innerText = displayVal;
}