const numbers = document.querySelectorAll(".number");
numbers.forEach(
    (number) => {number.onclick = enterDigit;}
);

const operators = document.querySelectorAll(".operator");
operators.forEach(
    (operator) => {operator.onclick = enterOperator;}
);

const equal = document.getElementById("equal");
equal.onclick = enterEqual;

const del = document.getElementById("delete");

const clear = document.getElementById("clear");
clear.onclick = clearAll;

const result = document.getElementById("result");

let skippedNum;
let prevNum;
let newNum = 0;
let skippedOp;
let prevOp;
let newOp;
let justPressedEqual = false;

function operate (operator, a, b) {
    switch (operator) {
        case "divide": return a / b;
        case "multiply": return a * b;
        case "subtract": return a - b;
        case "add": return a + b;
    }
}

function enterDigit () {
    newNum = newNum * 10 + +this.textContent;
    result.textContent = newNum;
    justPressedEqual = false;
}

function enterOperator () {
    newOp = this.id;
    if (!justPressedEqual) {
        if (type(prevOp) == 1 && type(newOp) == 2) { // a + b *
            //save a and + for later
            skippedOp = prevOp; 
            skippedNum = prevNum;
            prevNum = newNum;
        }
        // a + b +   OR   a * b +   OR   a * b *   OR   a + b =   OR   a * b =
        else if (prevOp) prevNum = operate(prevOp, prevNum, newNum);
        // first operator, don't do anything
        else prevNum = newNum;

        if (skippedOp && type(prevOp) == 2 && type(newOp) == 1) { // c + a * b +   =>   c + ab +
            prevNum = operate(skippedOp, skippedNum, prevNum); // (c+ab) +
            skippedOp = skippedNum = 0;
        }
    }
    prevOp = newOp;
    result.textContent = prevNum;
    newNum = 0;
    justPressedEqual = false;
}

type = operator => (operator == "multiply" || operator == "divide") ? 2 : 1;

function enterEqual () {
    prevNum = operate(prevOp, prevNum, newNum);
    if (skippedOp) prevNum = operate(skippedOp, skippedNum, prevNum);
    result.textContent = prevNum;
    skippedOp = skippedNum = prevOp = newOp = newNum = 0;
    justPressedEqual = true;
}

function clearAll () {
    result.textContent = skippedNum = prevNum = newNum = skippedOp = prevOp = newOp = 0;
}

function debug () {
    console.log(`skippedNum: ${skippedNum} \n skippedOp: ${skippedOp} \n prevNum: ${prevNum} \n prevOp: ${prevOp} \n newNum: ${newNum} \n newOp: ${newOp}`);
}