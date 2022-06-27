//global variables
let numberString = "";
let number=0;

// operation functions
const add = function(numbers) {
	return numbers.reduce((accum, value)=> {
        return accum+value;
    })
};

const subtract = function(numbers) {
	return numbers.reduce((accum, value)=> {
        return accum-value;
    })
};

// const sum = function(numbers) {
// 	return numbers.reduce((accum, value) => {
//     return accum+value;
//   },0);
// };

const multiply = function(numbers) {
  return numbers.reduce((accum, value) => {
    return accum * value;
  })
};

const divide = function(numbers) {
    return numbers.reduce((accum, value) => {
        return accum / value;
    })
}

function operate(num1, num2, operator) {
    // takes in two numbers, takes in operator, and returns answer when equals is clicked
    //num1 is what user selects first in one go. So create an num1=0
    //user then selects an operator, associate that with the functions above. 
    // clear screen so user can see second number next
    //num2 what user selects in one go, so create num2 = 0.
    

    return operator([num1,num2]);
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
    // clear the answerScreen:
    const buttonClearScreen = document.querySelector("#clear");
    buttonClearScreen.addEventListener("click", ()=>{
        numberString="";
        answerScreen(numberString)
    }) 
}

function answerScreen(value) {
    const answerScreen = document.querySelector(".answerScreen");
    return answerScreen.textContent = value;
}

function operatorSelection() {
    //when operator is selected, save the previous number, clear screen, and run userSelection again.
    //where shall we save the previous number? Array? Object?
    // what does object look like? Could each element store previous value entered and summed? Via reduce?
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operator => {
        operator.addEventListener("click", e => {
            // save number first to an object or array. 
            numberString="";
            operatorSelected = e.target.id;
            answerScreen(operatorSelected);
            //save the operator to an object or array too?
            return operatorSelected;
        })
    })
}


userSelection();
operatorSelection();
// operator(numbers, operatorSelection());
