const option = document.querySelectorAll(".option");
const gridItem = document.querySelectorAll(".grid-item");
const arr = [...gridItem];

option.forEach((selection) =>
  selection.addEventListener("click", playerSelection, { once: true })
);

function playerSelection() {
  console.log(this.textContent);
}

function isNotEmpty(element) {
  return element.textContent === "";
}

function textContent(input) {
  return input.textContent;
}

arr.forEach((cell) => cell.addEventListener("click", log, { once: true }));

function log() {
  console.log(this.textContent);
}
