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
      operatorSign = e.target.innerHTML;
      memoryValue = inputValue;
      memory.textContent = `${memoryValue} ${operatorSign} `;
      inputValue = "";
    })
  );

// Reset AC
const ac = document.querySelector("#clear").addEventListener("click", () => {
  reset();
});

// Equal sign
const equalSign = document
  .querySelector("#equal")
  .addEventListener("click", () => {
    // Prevent undefined error when pressing equal button multiple times
    if (memoryValue == 0 && result == 0) return reset();
    if (memoryValue == 0 && result != 0) return reset();
    result = operate(inputValue, memoryValue, operatorSign);
    memory.textContent = `${memoryValue} ${operatorSign} ${inputValue}`;
    input.textContent = result;
    if (result === `Whoopsie! Don't divide by 0 ;-)`) {
      inputValue = memoryValue;
    } else {
      inputValue = result;
      memoryValue = "";
      operatorSign = "";
    }
  });

// Positive and negative numbers
const changeSign = document
  .querySelector("#plusminus")
  .addEventListener("click", () => {
    Number(inputValue) >= 0
      ? (inputValue = `-${inputValue}`)
      : (inputValue = Math.abs(inputValue));
    input.textContent = inputValue;
  });

// Decimals
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

// Percent
const percentButton = document
  .querySelector(".percent")
  .addEventListener("click", () => {
    inputValue = Number(inputValue) / 100;
    return (input.textContent = inputValue);
  });

// Calculations
function operate() {
  if (operatorSign === "+") return Number(memoryValue) + Number(inputValue);
  if (operatorSign === "-") return Number(memoryValue) - Number(inputValue);
  if (operatorSign === "*") return Number(memoryValue) * Number(inputValue);
  if (operatorSign === "/")
    return inputValue == 0
      ? `Whoopsie! Don't divide by 0 ;-)`
      : Number(memoryValue) / Number(inputValue);
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
