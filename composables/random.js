/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { clearInterval } from "timers";

const numbers = "0123456789";
let interval = null;
document.querySelector(".random-event-trigger").onmouseover = (event) => {
  let r = document.querySelector(".random");
  let iterations = 0;
  let a = [
    Math.floor(9 * Math.random() + 1),
    Math.floor(10 * Math.random()),
    Math.floor(10 * Math.random()),
    Math.floor(10 * Math.random()),
    Math.floor(10 * Math.random()),
    Math.floor(10 * Math.random()),
  ];
  clearInterval(interval);
  interval = setInterval(() => {
    r.innerText = r.innerText
      .split("")
      .map((event, r) =>
        r < iterations ? a[r] : numbers[Math.floor(10 * Math.random())]
      )
      .join("");
    if (iterations >= a.length) {
      clearInterval(interval);
    }
    iterations += 1 / 3;
  }, 30);
};
