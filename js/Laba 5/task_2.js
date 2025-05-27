const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');
const currentStateDisplay = document.getElementById('currentState');
const redDurationInput = document.getElementById('redDuration');
const yellowDurationInput = document.getElementById('yellowDuration');
const greenDurationInput = document.getElementById('greenDuration');
const applyDurationsButton = document.getElementById('applyDurations');
const manualSwitchButton = document.getElementById('manualSwitch');

let redDuration = parseInt(redDurationInput.value) * 1000;
let yellowDuration = parseInt(yellowDurationInput.value) * 1000;
let greenDuration = parseInt(greenDurationInput.value) * 1000;
let currentState = 'red';
let timer;
let manualMode = false;

function updateLights() {
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');

    if (currentState === 'red') {
        redLight.classList.add('active', 'red');
        currentStateDisplay.textContent = 'Стан: червоний';
        timer = setTimeout(switchToYellow, redDuration);
    } else if (currentState === 'yellow') {
        yellowLight.classList.add('active', 'yellow');
        currentStateDisplay.textContent = 'Стан: жовтий';
        timer = setTimeout(switchToGreen, yellowDuration);
    } else if (currentState === 'green') {
        greenLight.classList.add('active', 'green');
        currentStateDisplay.textContent = 'Стан: зелений';
        timer = setTimeout(switchToBlinkingYellow, greenDuration);
    } else if (currentState === 'blinkingYellow') {
        currentStateDisplay.textContent = 'Стан: жовтий (миготить)';
        blinkYellow(3, switchToRed);
    }
}

function switchToYellow() {
    currentState = 'yellow';
    updateLights();
}

function switchToGreen() {
    currentState = 'green';
    updateLights();
}

function switchToBlinkingYellow() {
    currentState = 'blinkingYellow';
    updateLights();
}

function switchToRed() {
    currentState = 'red';
    updateLights();
}

function blinkYellow(times, callback) {
    let count = 0;
    const interval = setInterval(() => {
        yellowLight.classList.toggle('active');
        count++;
        if (count >= times * 2) { 
            clearInterval(interval);
            if (callback) {
                callback();
            }
        }
    }, 500); 
}

function startTrafficLight() {
    clearTimeout(timer);
    updateLights();
}

applyDurationsButton.addEventListener('click', () => {
    redDuration = parseInt(redDurationInput.value) * 1000;
    yellowDuration = parseInt(yellowDurationInput.value) * 1000;
    greenDuration = parseInt(greenDurationInput.value) * 1000;
    manualMode = false;
    startTrafficLight();
});

manualSwitchButton.addEventListener('click', () => {
    manualMode = true;
    clearTimeout(timer);
    if (currentState === 'red') {
        currentState = 'yellow';
    } else if (currentState === 'yellow') {
        currentState = 'green';
    } else if (currentState === 'green') {
        currentState = 'blinkingYellow';
    } else if (currentState === 'blinkingYellow') {
        currentState = 'red';
    }
    updateLights();
});


startTrafficLight();