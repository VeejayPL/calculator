const input = document.querySelector("#input");
const memory = document.querySelector("#memory");

// Global variables to store input numbers, result and operator
let inputValue = "";
let memoryValue = "";
let result = 0;
let operatorSign = "";

// Assign click event to all number buttons
// append input/result display with values
const numberButton = document.querySelectorAll(".number").forEach((element) =>
  element.addEventListener("click", (e) => {
    if (result != 0 && operatorSign == 0) {
      reset();
    }
    inputValue += e.target.innerHTML;
    return (input.textContent = inputValue);
  })
);

// Operator sign
const operatorButton = document
  .querySelectorAll(".operator")
  .forEach((element) =>
    element.addEventListener("click", (e) => {
      // if (inputValue != 0 && memoryValue != 0) return operate();
      operatorSign = e.target.innerHTML;
      memoryValue = inputValue;
      memory.textContent = `${memoryValue} ${operatorSign} `;
      inputValue = "";
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
    if (memoryValue == 0 && result == 0) return reset();
    if (memoryValue == 0 && result != 0) return reset();
    operate();
    operatorSign = "";
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
  result = calculate(inputValue, memoryValue, operatorSign);
  memory.textContent = `${memoryValue} ${operatorSign} ${inputValue}`;
  input.textContent = round(result, 10).toString();
  if (result === `Whoopsie! Don't divide by 0 ;-)`) {
    inputValue = memoryValue;
  } else {
    inputValue = result;
    memoryValue = "";
  }
}
// Calculations
function calculate() {
  if (operatorSign === "+") return Number(memoryValue) + Number(inputValue);
  if (operatorSign === "-") return Number(memoryValue) - Number(inputValue);
  if (operatorSign === "*") return Number(memoryValue) * Number(inputValue);
  if (operatorSign === "/")
    return inputValue == 0
      ? `Whoopsie! Don't divide by 0 ;-)`
      : Number(memoryValue) / Number(inputValue);
}
// Round results
function round(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}
// Reset function
function reset() {
  inputValue = "";
  memoryValue = "";
  result = 0;
  operatorSign = "";
  input.textContent = "0";
  memory.textContent = "";
  return;
}
