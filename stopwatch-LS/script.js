// Global Variables
let stopwatchInterval;
let countdownInterval;
let stopwatchTime = 0;
let countdownTime = 0;
let currentKeypadInput = ''; // For countdown keypad input

// DOM Elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const countdownInputField = document.getElementById('countdown-input');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchClearBtn = document.getElementById('stopwatch-clear');
const countdownStartBtn = document.getElementById('countdown-start');
const countdownClearBtn = document.getElementById('countdown-clear');
const keypadButtons = document.querySelectorAll('.keypad-btn');
const upArrow = document.getElementById('up-arrow');
const downArrow = document.getElementById('down-arrow');

// Stopwatch Functionality
stopwatchStartBtn.addEventListener('click', () => {
	if (stopwatchStartBtn.textContent === 'Start') {
		startStopwatch();
	} else {
		pauseStopwatch();
	}
});

stopwatchClearBtn.addEventListener('click', resetStopwatch);

function startStopwatch() {
	stopwatchStartBtn.textContent = 'Pause';
	stopwatchInterval = setInterval(() => {
		stopwatchTime++;
		stopwatchDisplay.textContent = formatTime(stopwatchTime);
	}, 1000);
}

function pauseStopwatch() {
	clearInterval(stopwatchInterval);
	stopwatchStartBtn.textContent = 'Start';
}

function resetStopwatch() {
	clearInterval(stopwatchInterval);
	stopwatchTime = 0;
	stopwatchDisplay.textContent = '00:00:00';
	stopwatchStartBtn.textContent = 'Start';
}

// Countdown Functionality
countdownStartBtn.addEventListener('click', () => {
	if (countdownStartBtn.textContent === 'Start') {
		countdownTime = parseInputTime(countdownInputField.value);
		if (countdownTime > 0) {
			startCountdown();
		}
	} else {
		pauseCountdown();
	}
});

countdownClearBtn.addEventListener('click', clearCountdown);

function startCountdown() {
	countdownStartBtn.textContent = 'Pause';
	countdownInterval = setInterval(() => {
		if (countdownTime > 0) {
			countdownTime--;
			countdownInputField.value = formatTime(countdownTime);
		} else {
			clearInterval(countdownInterval);
			playAlert();
			countdownStartBtn.textContent = 'Start';
		}
	}, 1000);
}

function pauseCountdown() {
	clearInterval(countdownInterval);
	countdownStartBtn.textContent = 'Start';
}

function clearCountdown() {
	clearInterval(countdownInterval);
	countdownTime = 0;
	countdownInputField.value = '00:00:00';
}

// Keypad Functionality for Countdown
keypadButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.textContent === 'Clear') {
			currentKeypadInput = '';
		} else {
			currentKeypadInput += button.textContent;
		}
		countdownInputField.value = formatKeypadInput(currentKeypadInput);
	});
});

// Adjusting countdown time with arrows
upArrow.addEventListener('click', () => {
	countdownTime += 60; // Increase by 1 minute
	countdownInputField.value = formatTime(countdownTime);
});

downArrow.addEventListener('click', () => {
	countdownTime = Math.max(0, countdownTime - 60); // Decrease by 1 minute but not below 0
	countdownInputField.value = formatTime(countdownTime);
});

// Utility Functions
function formatTime(time) {
	const hours = Math.floor(time / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((time % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (time % 60).toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}

function parseInputTime(input) {
	const parts = input.split(':').map((part) => parseInt(part) || 0);
	return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function formatKeypadInput(input) {
	let seconds = parseInt(input) || 0;
	return formatTime(seconds);
}

function playAlert() {
	const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
	audio.play();
}
