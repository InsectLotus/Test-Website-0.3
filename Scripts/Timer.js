let workTime = 25 * 60;
let shortBreak = 15 * 60;
let longBreak = 45 * 60;
let currentTime = workTime;
let currentPhaseDuration = workTime;
let isRunning = false;
let interval = null;
let sessionCount = 0;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timerLabel = document.getElementById("timer-label");
const phaseSelect = document.getElementById("phase-select");
const progressBar = document.getElementById("progressBar");

function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    let percentLeft = (currentTime / currentPhaseDuration) * 100;
    progressBar.style.width = percentLeft + "%";
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = "Start";
    } else {
        interval = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateDisplay();
                updateProgressBar();
            } else {
                clearInterval(interval);
                interval = null;
                sessionCount++;

                if (sessionCount % 4 === 0) {
                    currentTime = longBreak;
                    currentPhaseDuration = longBreak;
                    timerLabel.textContent = "Long Break";
                } else if (sessionCount % 2 === 0) {
                    currentTime = shortBreak;
                    currentPhaseDuration = shortBreak;
                    timerLabel.textContent = "Short Break";
                } else {
                    currentTime = workTime;
                    currentPhaseDuration = workTime;
                    timerLabel.textContent = "Work Time";
                }
                alert("Time's up! Next phase starts now.");
                updateDisplay();
                updateProgressBar();
                startPauseTimer();
            }
        }, 1000);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    sessionCount = 0;
    updatePhase();
    startPauseBtn.textContent = "Start";
    updateDisplay();
    updateProgressBar();
}

function updatePhase() {
    const selectedPhase = phaseSelect.value;
    if (selectedPhase === "work") {
        currentTime = workTime;
        currentPhaseDuration = workTime;
        timerLabel.textContent = "Work Time";
    } else if (selectedPhase === "shortBreak") {
        currentTime = shortBreak;
        currentPhaseDuration = shortBreak;
        timerLabel.textContent = "Short Break";
    } else if (selectedPhase === "longBreak") {
        currentTime = longBreak;
        currentPhaseDuration = longBreak;
        timerLabel.textContent = "Long Break";
    }
    updateDisplay();
    updateProgressBar();
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
phaseSelect.addEventListener("change", () => {
    resetTimer();
});

updateDisplay();
updateProgressBar();