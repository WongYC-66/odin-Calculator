let num1 = '';
let num2 = '';
let tempNum = '';
let operator = '';

function add(x, y){
    return x + y
}

function subtract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    if(y === 0) return 'infinity'
    return x / y
}

function operate(num1, num2, operator){
    switch(operator){
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
        default:
            return 'Error, unknown operator'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const display = document.querySelector('.display')  
    // add buttonclick for 0 - 9
    let domArray = [...document.querySelectorAll('.num')]
    domArray.forEach(button => button.addEventListener('click', e => {
        if(tempNum.startsWith('0')){ // handle trailing '0' issue
            tempNum = ''
            display.textContent = '0'
            return
        }
        if(e.target.textContent === '.' && tempNum.endsWith('.')){ // handle tailing '.' issue
            return
        }
        tempNum += e.target.textContent
        display.textContent = tempNum
       
    }))

    // add buttonclick for + - x / =
    domArray = [...document.querySelectorAll('.operand')]
    domArray.forEach(button => button.addEventListener('click', e => {
        if(num1 == ''){
            num1 = parseFloat(tempNum)
        } else {
            num2 = parseFloat(tempNum)
        }
        tempNum = '';
        // 'AC' 
        if(e.target.textContent == 'AC'){
            return reset()
        }
        if(!num1) return console.log('num1 undefined');
        // + - x ÷
        if(e.target.textContent.match(/[\+\-\x\÷]/)){
            if(operator !== ''){ // not new, then chaining
                operateAndUpdate();
            } 
            operator = e.target.textContent
            // console.log({num1, num2, operator})
            return;
        }
        // '=' 
        operateAndUpdate();
        return 

    }))
});

function operateAndUpdate(){
    let result = operate(num1, num2, operator)
    result = parseFloat(result.toFixed(6))
    document.querySelector('.display').textContent = result
    num1 = result
    return
}

function reset(){
    num1 = ''
    num2 = ''
    operator = ''
    document.querySelector('.display').textContent = '0'
    return
}