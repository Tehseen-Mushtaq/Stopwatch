const display = document.getElementById("display");
let timer = null;
let starttime = 0;
let elapsedtime = 0;
let isRunning = false;
const fsBtn = document.getElementById('fs-btn');

function start() {
    if (!isRunning) {
        starttime = Date.now() - elapsedtime;
        timer = setInterval(update, 10);
        isRunning = true;
    }

}

function stop() {
    if (isRunning) {
        clearInterval(timer)
        elapsedtime = Date.now() - starttime
        isRunning = false
    }
}

function reset() {
    clearInterval(timer)
    starttime = 0;
    elapsedtime = 0;
    isRunning = false;
    display.textContent = "00:00:00"
}

function update() {
    const currenttime = Date.now();
    elapsedtime = currenttime - starttime

    let hours = Math.floor(elapsedtime / (1000 * 60 * 60))
    let minutes = Math.floor(elapsedtime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedtime / 1000 % 60)
    // let milliseconds = Math.floor(elapsedtime % 1000 / 10) //divide by 10 as we only want only 2 digits of milliseconds

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    // milliseconds = String(milliseconds).padStart(2, "0");
    display.textContent = `${hours}:${minutes}:${seconds}`
}


fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(()=> console.log("service worker registered")).catch((error)=> console.log("service worker failed", error));
}