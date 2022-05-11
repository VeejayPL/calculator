const buttons = [
  clear,
  plusminus,
  percent,
  divide,
  multiply,
  minus,
  plus,
  equal,
  dot,
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
];

buttons.forEach((element) =>
  element.addEventListener("click", (e) => console.log(e.target.innerHTML))
);
