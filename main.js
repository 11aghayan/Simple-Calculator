
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

const numsReg = /\d/;
let number1 = [];
let number2 = [];
let result;
let action;
let equals;
let ac = false;

function math(a, b, sign) {
  debugger;
  let i = 1;
  let j = 1;
  if (a % 1 !== 0) {
    for (i; a % 1 !== 0; i*=10) {
      a *= 10;
    }
  }
  if (b % 1 !== 0 && sign !== '/') {
    for (j; b % 1 !== 0; j*=10) {
      b *= 10;
    }
  }
  const foo = new Function(`return ${a} ${sign} ${b}`);
  let divNum;

  if (sign === '+' || sign === '-') {
    divNum = i > j ? i : j;
  } else {
    divNum = i * j;
  }

  return (foo() / divNum) + '';
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    //! Variables
    let val = btn.id;
    let number;

    // Working array check
    if (action || equals) {
      number = number2;
    } else {
      number = number1;
    }
    // Number check
    if (val.match(numsReg) || val === '.') {
      if (equals) {
        number1 = [];
        number2 = [];
        number = [];
        action = null;
        equals = false;
        number = number1;
      }
      if (!(!number.length && val === '0')) {
        number.push(val);
      }
    }
    // Erase check
    if (val === 'erase') {
      number.pop();
    } 
    // AC check
    if (val === 'ac') {
        number1 = [];
        number2 = [];
        number = [];
        action = null;
        equals = false;
    }
    // Number Sign check (+/-)
    if (val === 'sign' && number.length) {
      if (number[0] === '-') {
        number.shift();
      } else {
        number.unshift('-');
      }
    } 
    // Action check
    if (btn.classList[1] === 'action' && number1.length) {  
      if (equals) {
        number2 = [];
        equals = false;
        number = number1;
      }
      if (number2.length) {
        number1 = math(+(number1.join('')), +(number2.join('')), action).split('');
        number = number1;
        number2 = [];
      }
      action = val;
    }
    // Percent check
    if (val === 'percent') {
      if (number === number1) {
        number = number1 = (+(number.join('') / 100) + '').split('');
      }
      if (number === number2) {
        number = number2 = (+(number1.join('') / 100 * +(number.join(''))) + '').split('')
      }
    }
    // Equals check
    if (val === 'equal') {
      if (action) {
        number1 = math(+(number1.join('')), +(number2.join('')), action).split('');
        number = number1;
        equals = true;
      }
    }

    // What to display
    if (number[0] === '.') {
      number.unshift('0');
    }
    display.innerHTML = number.join('');
    if (!number.length) {
      display.innerHTML = '0';
    }
  });
});
