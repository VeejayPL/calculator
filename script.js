const input = document.querySelector("#input");
const memory = document.querySelector("#memory");

// Global variables to store input numbers and operator
let inputValue = "";
let memoryValue = "";
let result = 0;
let operatorSign = "";

// Assign click event to all number buttons
// append input/result display with values
const numberButton = document.querySelectorAll(".number").forEach((element) =>
  element.addEventListener("click", (e) => {
    inputValue += e.target.innerHTML;
    return (input.textContent = inputValue);
  })
);

// Reset AC
const ac = document.querySelector("#clear").addEventListener("click", () => {
  inputValue = "";
  memoryValue = "";
  input.textContent = 0;
  memory.textContent = "";
  return;
});

// Plus sign
const plusSign = document
  .querySelector("#plus")
  .addEventListener("click", () => {
    operatorSign = "+";
    memoryValue = inputValue;
    memory.textContent = `${inputValue} +`;
    inputValue = "";
  });

// Minus sign
const minusSign = document
  .querySelector("#minus")
  .addEventListener("click", () => {
    operatorSign = "-";
    memoryValue = inputValue;
    memory.textContent = `${inputValue} -`;
    inputValue = "";
  });

// Multiply
const multiplySign = document
  .querySelector("#multiply")
  .addEventListener("click", () => {
    operatorSign = "*";
    memoryValue = inputValue;
    memory.textContent = `${inputValue} *`;
    inputValue = "";
  });

// Divide
const divideSign = document
  .querySelector("#divide")
  .addEventListener("click", () => {
    operatorSign = "/";
    memoryValue = inputValue;
    memory.textContent = `${inputValue} /`;
    inputValue = "";
  });

// Equal sign
const equalSign = document
  .querySelector("#equal")
  .addEventListener("click", () => {
    return operate();
  });

// Operate when equal sign is pressed
function operate() {
  switch (true) {
    case operatorSign === "+":
      memory.textContent += ` ${inputValue} =`;
      result = add(memoryValue, inputValue);
      inputValue = result;
      input.textContent = result;
      operatorSign = "";
      break;
    case operatorSign === "-":
      memory.textContent += ` ${inputValue} =`;
      result = substract(memoryValue, inputValue);
      inputValue = result;
      input.textContent = result;
      operatorSign = "";
      break;
    case operatorSign === "*":
      memory.textContent += ` ${inputValue} =`;
      result = multiply(memoryValue, inputValue);
      inputValue = result;
      input.textContent = result;
      operatorSign = "";
      break;
    case operatorSign === "/":
      memory.textContent += ` ${inputValue} =`;
      result = divide(memoryValue, inputValue);
      inputValue = result;
      input.textContent = result;
      operatorSign = "";
      break;
    default:
      inputValue = "";
      memoryValue = "";
      input.textContent = 0;
      memory.textContent = 0;
  }
}
// Math operations
function add() {
  return Number(memoryValue) + Number(inputValue);
}
function substract() {
  return Number(memoryValue) - Number(inputValue);
}
function multiply() {
  return Number(memoryValue) * Number(inputValue);
}
function divide() {
  if (inputValue == 0) {
    return `Whoopsie! Don't divide by 0 ;-)`;
  } else {
    return Number(memoryValue) / Number(inputValue);
  }
}
