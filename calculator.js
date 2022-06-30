// To Do list: 
// 1) Sort out decimal point, equals button, selecting multiple operators at once, delete button, divide by zero error, roundning, backspace.  


//global variables
let numberString = "";
let number=0;
let storedValues = [];
let clickCount = -1;
let result = 0;
let operatorSelected = [];
let equalsSelected = false;

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
    console.log(`operatorCheck before Calc = ${checkOperatorSelected}`);
    console.log(`equals check before Calc = ${equalsSelected}`);
    if (!isNaN(arrayNumbers[1])) {
        let i = operatorSelected.length-1;
        // if two operators in the operatorArray, i = 1, hence first value (previousValue in above function arguments) from arrayNumbers is equal to "result" variable herein. 
        if (arrayNumbers.length === 2) {
            result = arrayNumbers[0];
            if (equalsSelected === true) {
                i+=1;
            }
        } else if ( i >=1 && equalsSelected === true) {
            i += 1;
        }
        // bug when entering equals a second time - fix required: 
        // if operator selected after equals, do NOT evaluate just yet. 
        if (equalsSelected === true && checkOperatorSelected === true) {
            // do nothing and display result when user selects operator immedietely after selecting equals.
            answerScreen(result);
        } else if (operatorSelected[i-1] === "+") {
            result = add(result, arrayNumbers[i]);
            answerScreen(result);
            equalsSelected = false;
            checkOperatorSelected = false;
            
            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1] === "-") {
            result = subtract(result, arrayNumbers[i]);
            answerScreen(result);
            equalsSelected = false;
            checkOperatorSelected = false;

            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1]==="x") {
            result = multiply(result, arrayNumbers[i]);
            answerScreen(result);
            equalsSelected = false;
            checkOperatorSelected = false;
            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1]==="/") {
            result = divide(result, arrayNumbers[i]);
            answerScreen(result);
            equalsSelected = false;
            checkOperatorSelected = false;

            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);
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
        clickCountNumber = -1;
        clickCountOperator = -1;
        checkOperatorSelected = false;
        equalsSelected = false;
        answerScreen(numberString)
    }) 
}

function answerScreen(value) {
    const answerScreen = document.querySelector(".answerScreen");
    return answerScreen.textContent = value;

}

let checkOperatorSelected = false;

function operatorSelection() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operator => {
        operator.addEventListener("click", (e) => {
            checkOperatorSelected = true;
            evaluateUserSelection(e);
        })
    })
}

function userSelectsEquals() {
    equalsButton = document.querySelector(".result");
    equalsButton.addEventListener("click", (e) => {
        equalsSelected = true;
        evaluateUserSelection(e);
    })
}

let clickCountOperator = -1;
let clickCountNumber = -1;

function evaluateUserSelection(e) {
    clickCountNumber+=1;
    storedValues[clickCountNumber] = number;
    console.log(storedValues);
    numberString="";

    if (e.target.id !== "=") {
        clickCountOperator+=1;
        operatorSelected[clickCountOperator] = e.target.id;
        console.log(operatorSelected);
    }
    // if more than one element in array, do math.
    if (clickCountNumber > -1) {
        operate(storedValues, operatorSelected);
    }  
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