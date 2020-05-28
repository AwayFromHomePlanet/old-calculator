const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
    number.onclick = enterNumber;
});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.onclick = enterOperator;
})

const del = document.getElementById("delete");

const clear = document.getElementById("clear");
clear.onclick = clearAll;

const result = document.getElementById("result");

let currentNum;
let prevNum;
let currentOp;
let prevOp;

function operate (operator, a, b) {
    switch (operator) {
        case "add": return a + b;
        case "subtract": return a - b;
        case "multiply": return a * b;
        case "divide": return a / b;
    }
}

function enterNumber () {
    switch (currentOp) {
        case "add":
        case "subtract":
            currentNum = +this.textContent;
            break;
        case "multiply":
        case "divide":
            currentNum = operate(currentOp, currentNum, this.textContent);
            result.textContent = currentNum;
            break;
        default: // first number
            currentNum = +this.textContent;
    }
}

function enterOperator () {
    currentOp = this.id;
    switch (currentOp) {
        case "add":
        case "subtract":
            prevNum = prevOp ? operate(prevOp, prevNum, currentNum) : currentNum;
            result.textContent = prevNum;
            prevOp = currentOp;
            break;
        case "equal":
            result.textContent = prevOp ? operate(prevOp, prevNum, currentNum) : currentNum;
            prevOp = prevNum = "";
    }
}

function clearAll () {
    result.textContent = currentOp = prevOp = currentNum = prevNum = "";
}