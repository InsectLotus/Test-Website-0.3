// Timer-Variablen
let workTime = 25 * 60; // 25 Minuten Arbeitszeit
let breakTime = 5 * 60;  // 5 Minuten Pause
let timeLeft = workTime; // Start mit Arbeitszeit
let isWorking = true; // Startet mit "Arbeiten"
let timerRunning = false;
let timerInterval;

// HTML-Elemente abrufen
const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");

// Funktion zur Anzeige der Zeit
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    statusDisplay.textContent = isWorking ? "Arbeitszeit" : "Pause";
}

// Timer starten oder pausieren
function startPauseTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        startPauseBtn.textContent = "Start";
    } else {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                isWorking = !isWorking; // Wechsel zwischen Arbeiten und Pause
                timeLeft = isWorking ? workTime : breakTime;
                updateDisplay();
            }
        }, 1000);
        timerRunning = true;
        startPauseBtn.textContent = "Pause";
    }
}

// Timer zurücksetzen
function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    isWorking = true;
    timeLeft = workTime;
    updateDisplay();
    startPauseBtn.textContent = "Start";
}

// Event Listener für die Buttons
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Anzeige initial aktualisieren
updateDisplay();