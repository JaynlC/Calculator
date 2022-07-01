// To Do list: 
// 1) Sort out decimal point, delete button, roundning, backspace (keyboard support), delete all console.logs() 

let numberString = "";
let number=0;
let storedValues = [];
let clickCount = -1;
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
            number = parseInt(numberString);
            // if user selects number, operator is no longer selected. 
            if (checkOperatorSelected ===true) {
                checkOperatorSelected = false;
            }
            if (equalsSelected ===true) {
                equalsSelected = false;
            }
            answerScreen(number);
        })
    }) 
}

function answerScreen(value) {
    const answerScreen = document.querySelector(".answerScreen");
    return answerScreen.textContent = value;
}

function userSelectsDecimal() {
    buttonDecimal.addEventListener("click", (e) => {
        numberString += e.target.id;
        number = numberString;
        // watch what happens here when selecting decimal
        buttonDecimal.classList.remove("decimal");
        answerScreen(numberString);
    })
}

function clearScreen() {
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

function operate(arrayNumbers, operatorSelected) {
    console.log(`operatorCheck before Calc = ${checkOperatorSelected}`);
    console.log(`equals check before Calc = ${equalsSelected}`);
    if (!isNaN(arrayNumbers[1])) {
        let i = operatorSelected.length-1;
        let j = arrayNumbers.length - 1;
        buttonDecimal.classList.add("decimal");
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
        if ((equalsSelected === true && checkOperatorSelected === true) || (equalsSelected === false && checkOperatorSelected === false)) {
            // do nothing and display result when user selects operator immedietely after selecting equals.
            answerScreen(result);
        } else if (operatorSelected[i-1] === "+") {
            result = add(result, arrayNumbers[j]);
            answerScreen(result);
            
            
            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1] === "-") {
            result = subtract(result, arrayNumbers[j]);
            answerScreen(result);
            
            

            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1]==="x") {
            result = multiply(result, arrayNumbers[j]);
            answerScreen(result);
            
            
            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);

        } else if (operatorSelected[i-1]==="/") {
            result = divide(result, arrayNumbers[j]);
            answerScreen(result);
            
            

            console.log(result);
            console.log(`operatorCheck = ${checkOperatorSelected}`);
            console.log(`equals check: ${equalsSelected}`);
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

userSelectionNumber();
userSelectsEquals();
userSelectsOperator();
userSelectsDecimal(); 
clearScreen();
hoverButtons();