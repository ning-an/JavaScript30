const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fullscreen");

const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

const updateBtn = () => {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.innerText = icon;
};

const skip = (e) => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
};

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

let isFullscreen = false;
const handleFullscreen = () => {
  if (!isFullscreen) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  isFullscreen = !isFullscreen;
};

toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);

skipBtns.forEach((btn) => btn.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreen.addEventListener("click", handleFullscreen);
