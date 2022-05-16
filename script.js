// Display
const input = document.querySelector("#input");
const memory = document.querySelector("#memory");

// Global variables to store input numbers, result and operator
let inputValue = "";
let memoryValue = "";
let result = 0;
let operatorSign = "";
let secondOperator = "";

// Assign click event to all number buttons
// append input/result display with values
// limit the length of input to 10
const numberButton = document.querySelectorAll(".number").forEach((element) =>
  element.addEventListener("click", (e) => {
    if (result != 0 && operatorSign == 0 && secondOperator == 0) {
      reset();
    }
    if (inputValue.length > 10) {
      inputValue.substring(0, 10);
    } else {
      inputValue += e.target.innerHTML;
    }
    return (input.textContent = round(inputValue, 10)).toString();
  })
);

// Operator sign
const operatorButton = document
  .querySelectorAll(".operator")
  .forEach((element) =>
    element.addEventListener("click", (e) => {
      if (operatorSign != 0) {
        operate(memoryValue, inputValue, operatorSign);
        operatorSign = "";
        secondOperator = e.target.innerHTML;
        memory.textContent = `${inputValue} ${secondOperator}`;
        memoryValue = inputValue;
        inputValue = "";
      } else if (operatorSign == 0 && secondOperator != 0) {
        operate(memoryValue, inputValue, secondOperator);
        secondOperator = "";
        operatorSign = e.target.innerHTML;
        memory.textContent = `${inputValue} ${operatorSign}`;
        memoryValue = inputValue;
        inputValue = "";
      } else {
        operatorSign = e.target.innerHTML;
        memoryValue = inputValue;
        memory.textContent = `${memoryValue} ${operatorSign}`;
        inputValue = "";
      }
    })
  );

// Reset button
const ac = document.querySelector("#clear").addEventListener("click", () => {
  reset();
});

// Equals to button
const equalSign = document
  .querySelector("#equal")
  .addEventListener("click", () => {
    // Prevent undefined error when pressing equal button multiple times
    if (memoryValue == 0 && result == 0 && inputValue == 0) return reset();
    if (memoryValue == 0 && result != 0 && inputValue == 0) return reset();
    operate();
    operatorSign = "";
    secondOperator = "";
  });

// Positive and negative numbers button
const changeSign = document
  .querySelector("#plusminus")
  .addEventListener("click", () => {
    Number(inputValue) >= 0
      ? (inputValue = `-${inputValue}`)
      : (inputValue = Math.abs(inputValue));
    input.textContent = inputValue;
  });

// Decimals button
const decimalButton = document
  .querySelector(".dot")
  .addEventListener("click", () => {
    if (inputValue == 0) {
      inputValue = "0";
      inputValue += ".";
      input.textContent = inputValue;
    }
    inputValue.includes(".") ? inputValue : (inputValue += ".");
  });

// Percent button
const percentButton = document
  .querySelector(".percent")
  .addEventListener("click", () => {
    // prevent the % out of 0
    if (inputValue == 0) return reset();
    inputValue = Number(inputValue) / 100;
    result = round(inputValue, 10).toString();
    return (input.textContent = result);
  });

// Operate function
function operate() {
  result = calculate(inputValue, memoryValue, operatorSign, secondOperator);
  memory.textContent = `${memoryValue} ${operatorSign}${secondOperator} ${inputValue} =`;
  input.textContent = result;
  if (result === `Ooops`) {
    inputValue = memoryValue;
  } else {
    inputValue = result;
    memoryValue = "";
  }
}
// Calculations
function calculate() {
  if (operatorSign == "+" || secondOperator == "+")
    return round(Number(memoryValue) + Number(inputValue), 5);
  if (operatorSign == "-" || secondOperator == "-")
    return round(Number(memoryValue) - Number(inputValue), 5);
  if (operatorSign == "*" || secondOperator == "*")
    return round(Number(memoryValue) * Number(inputValue), 5);
  if (operatorSign == "/" || secondOperator == "/")
    return inputValue == 0
      ? `Ooops`
      : round(Number(memoryValue) / Number(inputValue), 5);
}

// Round results
function round(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}

// Reset function
function reset() {
  inputValue = "";
  memoryValue = "";
  result = "";
  operatorSign = "";
  secondOperator = "";
  input.textContent = "0";
  memory.textContent = "";
  return;
}
