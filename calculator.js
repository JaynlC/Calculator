let numberString = "";
let number=0;
let arrayNumbers = [];
let result = 0;
let operatorSelected = [];
let equalsSelected = false;
let checkOperatorSelected = false;
let clickCountOperator = -1;
let clickCountNumber = -1;
const buttonDecimal = document.querySelector(".decimal");

function userSelectionNumber() {
    const buttonNumber = document.querySelectorAll(".number");
    buttonNumber.forEach(buttonNumber => {
        buttonNumber.addEventListener("click", (e) => {
            numberString += e.target.id;
            number = +numberString;
            // if user selects number, operator is no longer selected. 
            if (checkOperatorSelected ===true) {
                checkOperatorSelected = false;
            }
            if (equalsSelected ===true) {
                equalsSelected = false;
            }
            answerScreen(numberString);
        })
    }) 
}

function answerScreen(value) {
    const answerScreen = document.querySelector(".answerScreen");
    return answerScreen.textContent = value;
}

function userSelectsDeletePreviousValue() {
    const buttonDelete = document.getElementById("deletePrevious")
    buttonDelete.addEventListener("click", () => {
        let newNumberString = numberString.slice(0, (numberString.length)-1);
        numberString = newNumberString;
        number = +numberString;
        // If user deletes decimal, let user enter decimal again. 
        if (!numberString.includes(".")) {
            restoreDecimalButton();
        }
        answerScreen(numberString);
    }) 
}

function userSelectsDecimal() {
    buttonDecimal.addEventListener("click", (e) => {
        numberString += e.target.id;
        number = +numberString;
        buttonDecimal.classList.remove("decimal");
        buttonDecimal.removeAttribute("id");
        answerScreen(numberString);
    })
}

function restoreDecimalButton() {
    buttonDecimal.setAttribute("id", ".");
    buttonDecimal.classList.add("decimal");
}

function userSelectsOperator() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            // if user selects operator, then operator again, do not calculate. 
            if (checkOperatorSelected ===true) {
                checkOperatorSelected = false;
            } else if (checkOperatorSelected === false) {
                checkOperatorSelected = true;
            }
            restoreDecimalButton();
            evaluateUserSelection(e);
        })
    })
}

function userSelectsEquals() {
    equalsButton = document.querySelector(".result");
    equalsButton.addEventListener("click", (e) => {
        equalsSelected = true;
        restoreDecimalButton();
        evaluateUserSelection(e);
    })
}

function evaluateUserSelection(e) {
    // Add new number to array and reset numbserString. 
    clickCountNumber+=1;
    arrayNumbers[clickCountNumber] = number;
    numberString="";
    // Check operator selected and add to operator array. 
    if (e.target.id !== "=") {
        clickCountOperator+=1;
        operatorSelected[clickCountOperator] = e.target.id;
    }
    operate(arrayNumbers, operatorSelected);
}

function operate(arrayNumbers, operatorSelected) {
    let i = operatorSelected.length-1;
    let j = arrayNumbers.length - 1;
    
    if (!isNaN(arrayNumbers[1])) {
        if (arrayNumbers.length === 2) {
            result = arrayNumbers[0];
            // If equals selected, select correct (last) operator from operator array list. 
            if (equalsSelected === true) {
                i+=1;
            }
        } else if (i >=1 && equalsSelected === true) {
            i += 1;
        }

        if ((equalsSelected === true && checkOperatorSelected === true) || (equalsSelected === false && checkOperatorSelected === false)) {
            // Do not evaluate if operator selected immediately after equal button. 
            answerScreen(result);
        } else if (operatorSelected[i-1] === "+") {
            result = add(result, arrayNumbers[j]);
            answerScreen(result);
        } else if (operatorSelected[i-1] === "-") {
            result = subtract(result, arrayNumbers[j]);
            answerScreen(result);
        } else if (operatorSelected[i-1]==="x") {
            result = multiply(result, arrayNumbers[j]);
            answerScreen(result);
        } else if (operatorSelected[i-1]==="/") {
            result = divide(result, arrayNumbers[j]);
            answerScreen(result);
        } else if (operatorSelected[i-1]==="exp") {
            result = exponent(result, arrayNumbers[j]);
            answerScreen(result);
        }
    } else answerScreen(operatorSelected);
}

const add = function(previousValue, newNum) {
	return previousValue+newNum;
};

const subtract = function(previousValue, newNum) {
	return previousValue - newNum;
};

const multiply = function(previousValue, newNum) {
  return previousValue * newNum;
};

const divide = function(previousValue, newNum) {
    return previousValue / newNum;
}

function clearScreen() {
    const buttonClearScreen = document.querySelector("#clear");
    buttonClearScreen.addEventListener("click", () => {
        numberString="";
        arrayNumbers = [];
        operatorSelected = [];
        clickCountNumber = -1;
        clickCountOperator = -1;
        checkOperatorSelected = false;
        equalsSelected = false;
        restoreDecimalButton();
        answerScreen(numberString)
        result = 0;
    }) 
}

function hoverButtons() {
    const hoverButtons = document.querySelectorAll(".buttons > *");
    hoverButtons.forEach(button => {
        button.addEventListener(("mouseenter"), () => {
            button.classList.toggle("buttonHover");
        })
    })
    hoverButtons.forEach(button => {
        button.addEventListener(("mouseleave"), () => {
            button.classList.toggle("buttonHover");
        })
    })
    // Confirm to user button click visually. 
    hoverButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.add("buttonClick")
            button.addEventListener("transitionend", ()=>{
                button.classList.remove("buttonClick");
            })
        })
    })
}

userSelectionNumber();
userSelectsDeletePreviousValue();
userSelectsEquals();
userSelectsOperator();
userSelectsDecimal(); 
clearScreen();
hoverButtons();