let bulbShape = document.getElementById("bulbShape");
let toggleButton = document.getElementById("toggleButton");
let brightnessButton = document.getElementById("brightnessButton");
let bulbType = document.getElementById("bulbType");

let isOn = false;
let brightness = 1;
let timeout;

function updateBulb() {
    let type = bulbType.value;

    
    bulbShape.className = `bulb ${isOn ? 'on' : 'off'} ${isOn ? type : ''}`;

    
    bulbShape.classList.remove('on', 'off'); 
    bulbShape.classList.add(isOn ? 'on' : 'off'); 

    if (isOn) {
        bulbShape.classList.add(type); 
    }

    bulbShape.style.opacity = brightness; 
}


toggleButton.addEventListener("click", function () {
  isOn = !isOn;
  toggleButton.textContent = isOn ? "Вимкнути" : "Включити";
  updateBulb();
  resetTimer();
});

brightnessButton.addEventListener("click", function () {
  let input = prompt("Введіть яскравість (0.1 - 1)");
  let value = parseFloat(input);
  if (value >= 0.1 && value <= 1) {
    brightness = value;
    updateBulb();
  } else {
    alert("Неправильне значення!");
  }
});

function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    isOn = false;
    toggleButton.textContent = "Включити";
    updateBulb();
  }, 5 * 60 * 1000);
}

bulbType.addEventListener("change", updateBulb);

updateBulb();
