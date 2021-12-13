'use strict';
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

const updateDisplay = () =>{
    document.querySelector('.display').innerHTML = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true ){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}

function inputDecimal(dot){
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return
    }
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator){
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(calculator.displayValue === '0' && calculator.operator === '/'){
        window.alert('Illegal operation');
        resetCalculator();
        return;
    }

    if (operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if(firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator){
    switch (operator){
        case "+": 
            return add(firstOperand, secondOperand);
            break;
        case "-": 
            return subtract(firstOperand, secondOperand);
            break;
        case "*": 
            return multiply(firstOperand, secondOperand);
            break;
        case "/": 
            return divide(firstOperand, secondOperand);
            break;
        default:
            return secondOperand;
    }
}

function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

document.querySelectorAll('.button').forEach(key => {
    key.addEventListener('click', event => {
        inputDigit(event.target.getAttribute('data-value'))
        updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(key => {
    key.addEventListener('click', event => {
        handleOperator(event.target.getAttribute('data-value'));
        updateDisplay();
    });
});

const decimalKey = document.querySelector('.decimal');
decimalKey.addEventListener('click', event =>{
    inputDecimal(event.target.getAttribute('data-value'));
    updateDisplay();
});

const resetKey = document.querySelector('.all-clear');
resetKey.addEventListener('click', event =>{
    resetCalculator();
    updateDisplay();
});

window.addEventListener('keydown', (e) =>{
    console.log(e);
    if (e.key === 'Backspace'){
        if (calculator.displayValue !== '0'){
            calculator.displayValue = calculator.displayValue.substring(0,calculator.displayValue.length - 1);
            updateDisplay();
        }
        else if (calculator.displayValue.length === 1){
            calculator.displayValue = '0';
            cosnole.log(calculator.displayValue.length);
            updateDisplay;
        }
        return;
    }
});