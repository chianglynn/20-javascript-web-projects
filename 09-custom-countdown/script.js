const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const titleEl = document.getElementById('title');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeEls = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor(distance % day / hour);
        const minutes = Math.floor(distance % hour / minute);
        const seconds = Math.floor(distance % minute / second);

        // Populate Countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeEls[0].textContent = `${days}`;
        timeEls[1].textContent = `${hours}`;
        timeEls[2].textContent = `${minutes}`;
        timeEls[3].textContent = `${seconds}`;

        // Hide Input
        inputContainer.hidden = true;
        // Show Countdown
        countdownEl.hidden = false;
    }, 1000);
}

// Take Values form Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.')
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, Show Input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = countdownDate = '';
    titleEl.value = dateEl.value = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);