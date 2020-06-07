document.addEventListener("keydown", (event) => {
    let k = event.key;
    if (+k >= 0 && +k <= 9)  enterDigit(+k);
    else if (k == "/" || k == "*" || k == "-" || k == "+")  enterOperator(k);
    switch (k) {
        case ".":  enterDot(); break;
        case "=": case "Enter":  equal(); break;
        case "Backspace":  backspace(); break;
        case "c":  clear(); break;
    }
});

document.querySelectorAll(".number").forEach((number) => {
    number.onclick = () => {
        enterDigit(+number.textContent);
    };
});
document.querySelectorAll(".operator").forEach((operator) => {
    operator.onclick = () => {
        enterOperator(operator.textContent);
    };
});

document.getElementById("equal").onclick = equal;
document.getElementById("backspace").onclick = backspace;
document.getElementById("clear").onclick = clear;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

let i = 0;
let skippedIndex = [];
let finalNum = [];
let rawNum = [0];
let operators = [];
const arrays = [rawNum, operators, finalNum, skippedIndex];

function operate (operator, a, b) {
    switch (operator) {
        case "/": return a / b;
        case "*": return a * b;
        case "-": return a - b;
        case "+": return a + b;
    }
}

function enterDigit (digit) {
    expression.textContent += digit;
    rawNum[i] = rawNum[i] * 10 + digit;
}


function enterOperator (newOperator) {
    expression.textContent += ` ${newOperator} `;

    operators[i] = newOperator;
    skippedIndex[i] = skippedIndex[i-1];

    if (type(operators[i-1]) == 1 && type(operators[i]) == 2) {    // a + b *
        skippedIndex[i] = i-1; // save a and + for later
        finalNum[i] = rawNum[i];
    }
    else if (i == 0)    // first operator, don't do anything
        finalNum[i] = rawNum[i];
    else     // a + b +   OR   a * b +   OR   a * b *
        finalNum[i] = operate(operators[i-1], finalNum[i-1], rawNum[i]);

    if (    // c + a * b +   =>   c + ab +
        skippedIndex[i] != undefined 
        && type(operators[i-1]) == 2
        && type(operators[i]) == 1
    ) {
        finalNum[i] = operate(operators[skippedIndex[i]], finalNum[skippedIndex[i]], finalNum[i]); // (c+ab) +
        skippedIndex[i] = undefined;
    }
    result.textContent = finalNum[i];

    i++;
    rawNum[i] = 0;
}

function type (operator) {
    switch (operator) {
        case "/":  case "*":  return 2;
        case "-":  case "+":  return 1;
    }
}

function equal () {
    expression.textContent += " =";

    finalNum[i] = operate(operators[i-1], finalNum[i-1], rawNum[i]);
    if (skippedIndex[i] != undefined)
        finalNum[i] = operate(operators[skippedIndex[i]], finalNum[skippedIndex[i]], finalNum[i]);

    result.textContent = finalNum[i];

    arrays.forEach((array) => { array = []; });
    rawNum[0] = finalNum[i];

    i = 0;
}

function backspace () {
    let e = () => expression.textContent; // gets latest expression
    
    if (e().slice(-1) == " ") { // last char is a space i.e. expression ends in an operator
        expression.textContent = e().slice(0, -3);
        i--; // reverse calculations by one step
        arrays.forEach((array) => { array.pop(); });
    }
    else { // ends in a number
        expression.textContent = e().slice(0, -1);
        let toArray = e().split(" ");
        rawNum[i] = +toArray.pop(); // gets last number (with all digits)
    }

    result.textContent = finalNum[i-1];
}

function clear () {
    expression.textContent = "";
    result.textContent = 0;

    arrays.forEach((array) => { array = []; });
    rawNum[0] = 0;
    i = 0;
}