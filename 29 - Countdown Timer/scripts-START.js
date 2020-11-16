let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const btns = document.querySelectorAll("[data-time]");

const timer = (sec) => {
  const now = Date.now();
  const then = now + sec * 1000;
  displayTimerLeft(sec);
  displayEndTime(then);
  clearInterval(countdown);

  countdown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);
    if (secondLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimerLeft(secondLeft);
  }, 1000);
};

const displayTimerLeft = (sec) => {
  const mins = Math.floor(sec / 60);
  const seconds = sec % 60;
  timerDisplay.textContent = `${mins}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${
    min < 10 ? "0" : ""
  }${min}`;
};

const startTimer = (e) => {
  const sec = parseInt(e.target.dataset.time);
  timer(sec);
};

btns.forEach((btn) => btn.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mins = e.target.minutes.value;
  timer(mins * 60);
  e.target.reset();
});
