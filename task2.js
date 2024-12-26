let startStopBtn = document.getElementById('start-stop-btn');
let resetBtn = document.getElementById('reset-btn');
let lapBtn = document.getElementById('lap-btn');
let timeDisplay = document.getElementById('time-display');
let lapList = document.getElementById('lap-list');

let running = false;
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let lapCount = 1;

// Function to start/stop the stopwatch
function startStop() {
    if (running === false) {
        running = true;
        startStopBtn.innerText = 'Stop';
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
    } else {
        running = false;
        startStopBtn.innerText = 'Start';
        clearInterval(tInterval);
    }
}

// Function to update the stopwatch display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerText = hours + ':' + minutes + ':' + seconds;
}

// Function to reset the stopwatch
function reset() {
    running = false;
    clearInterval(tInterval);
    timeDisplay.innerText = "00:00:00";
    startStopBtn.innerText = "Start";
    lapList.innerHTML = ''; // Clear laps
    lapCount = 1;
    difference = 0;
}

// Function to record lap time
function recordLap() {
    if (running === true) {
        let lapTime = timeDisplay.innerText;
        let lapItem = document.createElement('li');
        lapItem.innerText = 'Lap ' + lapCount + ': ' + lapTime;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

// Event Listeners for buttons
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
