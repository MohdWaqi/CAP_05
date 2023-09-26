let displayNumber = document.getElementById("display");
let stopButton = document.querySelectorAll("button")[1];
let increaseButton = document.querySelectorAll("button")[2];
let decreaseButton = document.querySelector("button");
let counter;
let count = 0;
let inProgress = true;
const start = () => {
  counter = setInterval(() => {
    count++;
    displayNumber.innerText = count;
  }, 1000);
};

stopButton.addEventListener("click", () => {
  if (inProgress) {
    clearInterval(counter);
    inProgress = false;
    stopButton.innerText = "Start";
  } else {
    start();
    inProgress = true;
    stopButton.innerText = "Stop";
  }
});
decreaseButton.addEventListener("click", () => {
  inProgress = false;
  clearInterval(counter);
  count--;
  stopButton.innerText = "Start";
  displayNumber.innerText = count;
});
increaseButton.addEventListener("click", () => {
  inProgress = false;
  clearInterval(counter);
  count++;
  stopButton.innerText = "Start";
  displayNumber.innerText = count;
});
if (inProgress) {
  start();
}
