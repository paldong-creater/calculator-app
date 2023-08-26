//Onload both theme2 & theme3 are disabled
document.styleSheets[1].disabled = true;
document.styleSheets[2].disabled = true;

//catch three radio button
let theme1 = document.querySelector(".box label:nth-child(1)");
let theme2 = document.querySelector(".box label:nth-child(2)");
let theme3 = document.querySelector(".box label:nth-child(3)");

// Add change eventlistener for radio button
theme1.addEventListener("change", radioCheck);
theme2.addEventListener("change", radioCheck);
theme3.addEventListener("change", radioCheck);

//Change theme according to user input
function radioCheck(e) {
  let checkValue = document.querySelector(
    ".slider-container input:checked"
  ).value;
  if (checkValue == 1) {
    document.styleSheets[1].disabled = true;
    document.styleSheets[2].disabled = true;
  } else if (checkValue == 2) {
    document.styleSheets[1].disabled = false;
    document.styleSheets[2].disabled = true;
  } else if (checkValue == 3) {
    document.styleSheets[1].disabled = true;
    document.styleSheets[2].disabled = false;
  }
}

//catch all calculator button
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let seven = document.getElementById("seven");
let eight = document.getElementById("eight");
let nine = document.getElementById("nine");
let zero = document.getElementById("zero");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let mutiply = document.getElementById("multiply");
let divide = document.getElementById("divide");
let equal = document.getElementById("equal");
let reset = document.getElementById("reset");
let del = document.getElementById("del");
let dot = document.getElementById("dot");

//Add event listener to button click by user
one.addEventListener("click", btnClick);
two.addEventListener("click", btnClick);
three.addEventListener("click", btnClick);
four.addEventListener("click", btnClick);
five.addEventListener("click", btnClick);
six.addEventListener("click", btnClick);
seven.addEventListener("click", btnClick);
eight.addEventListener("click", btnClick);
nine.addEventListener("click", btnClick);
zero.addEventListener("click", btnClick);
plus.addEventListener("click", btnClick);
minus.addEventListener("click", btnClick);
mutiply.addEventListener("click", btnClick);
divide.addEventListener("click", btnClick);
equal.addEventListener("click", btnClick);
reset.addEventListener("click", btnClick);
del.addEventListener("click", btnClick);
dot.addEventListener("click", btnClick);

let array = [];
let operandRegex = /\.|\d/; //Regex for number and period
let operatorRegex = /[x+\/-]/; //Regex for Math keyword

//Function to check which button click
function btnClick(e) {
  let variable = e.target.innerHTML;
  if (operandRegex.test(variable)) {
    if (array.length - 1 < 0 || operatorRegex.test(array[array.length - 1])) {
      array.push(variable);
      displayToScreen();
    } else {
      let newVariable = array[array.length - 1] + variable;
      array[array.length - 1] = newVariable;
      displayToScreen();
    }
  } else if (operatorRegex.test(variable)) {
    if (array.length - 1 == -1) {
      refreshScreen();
    } else if (array.length - 1 == 0) {
      array.push(variable);
      displayToScreen();
    } else if (array.length - 1 == 1) {
      refreshScreen();
    } else {
      calculate(variable);
    }
  } else if (variable == "RESET") {
    array = [];
    displayToScreen();
  } else if (variable == "=") {
    if (array.length - 1 == 2) {
      calculate();
    } else {
      refreshScreen();
    }
  } else if (variable == "DEL") {
    if (array.length - 1 >= 0) {
      deleteVar();
    }
  } else {
    alert("Reset the calculator");
  }
}

//Function for Arithematic operation
function calculate(operatorVar) {
  let operand1 = Number(array[0]);
  let operand2 = Number(array[2]);
  let operator = array[1];
  let result;

  switch (operator) {
    case "+":
      result = parseFloat((operand1 + operand2).toFixed(2));
      break;

    case "-":
      result = parseFloat((operand1 - operand2).toFixed(2));
      break;

    case "x":
      result = parseFloat((operand1 * operand2).toFixed(2));
      break;

    case "/":
      result = parseFloat((operand1 / operand2).toFixed(2));
      break;
  }
  array = [];
  array.push(String(result));
  if (operatorVar) {
    array.push(operatorVar);
  }
  displayToScreen();
}

//Function to delete variable from screen
function deleteVar() {
  let temp = array[array.length - 1];
  temp = temp.split("");
  temp.pop();
  temp = temp.join("");
  if (temp == "") {
    array.pop();
  } else {
    array[array.length - 1] = temp;
  }
  displayToScreen();
}

//Function to display value from array to calculator screen
function displayToScreen() {
  let display = document.getElementById("display");
  display.innerHTML = array.join(" ");
}

//Function to blink text when = is press
function refreshScreen() {
  let text = document.getElementById("display");
  text.style.display = "none";
  setInterval(function () {
    text.style.display = "";
  }, 500);
}
