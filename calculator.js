// To Do list: 
// 1) Sort out decimal point, equals button, selecting multiple operators at once, delete button, divide by zero error, roundning, backspace.  


//global variables
let numberString = "";
let number=0;
let storedValues = [];
let clickCount = -1;
let result = 0;
let operatorSelected = [];

// operation functions
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

function operate(arrayNumbers, operatorSelected) {

    if (!isNaN(arrayNumbers[1])) {
        let i = operatorSelected.length-1;
        if (i === 1) {
            result = arrayNumbers[0];
        }
        if (operatorSelected[i-1] === "+") {
            result = add(result, arrayNumbers[i]);
            answerScreen(result);
            console.log(result);
        } else if (operatorSelected[i-1] === "-") {
            result = subtract(result, arrayNumbers[i]);
            answerScreen(result);
            console.log(result);
        } else if (operatorSelected[i-1]==="x") {
            result = multiply(result, arrayNumbers[i]);
            answerScreen(result);
            console.log(result);
        } else if (operatorSelected[i-1]==="/") {
            result = divide(result, arrayNumbers[i]);
            answerScreen(result);
            console.log(result);
        }     
    } else answerScreen(operatorSelected);
}

function userSelection() {
    // user Selecting a Number:
    const buttonNumber = document.querySelectorAll(".number");
    
    buttonNumber.forEach(buttonNumber => {
        buttonNumber.addEventListener("click", e => {
            numberString += e.target.id;
            number = parseInt(numberString);
            // console.log(number);
            answerScreen(number);
        })
    })
    // clear the answerScreen and erase previous data:
    const buttonClearScreen = document.querySelector("#clear");
    buttonClearScreen.addEventListener("click", ()=>{
        numberString="";
        storedValues = [];
        operatorSelected = [];
        clickCount = -1;
        answerScreen(numberString)
    }) 
}

function answerScreen(value) {
    const answerScreen = document.querySelector(".answerScreen");
    return answerScreen.textContent = value;
}

function operatorSelection() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operator => {
        operator.addEventListener("click", e => {
                clickCount+=1;
                storedValues[clickCount] = number;
                console.log(storedValues);
                numberString="";
                operatorSelected[clickCount] = e.target.id;
                console.log(operatorSelected);
                // answerScreen(operatorSelected);
                if (clickCount > -1) {
                    operate(storedValues, operatorSelected);
                }  
        })
    })
}

// bug requires solving below:
function userSelectsEquals() {
    equalsButton = document.querySelector(".result");
    equalsButton.addEventListener("click", () => {
        // clickCount+=1;
        // storedValues[clickCount] = number;
        operate(storedValues, operatorSelected);
    })
}

// add Hover effect code. 
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
}

userSelection();
userSelectsEquals();
operatorSelection();
hoverButtons();