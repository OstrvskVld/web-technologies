
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateClock, 1000);


const endTimeInput = document.getElementById('endTime');
const startTimerButton = document.getElementById('startTimer');
const countdownDisplay = document.getElementById('countdown');
let countdownInterval;

startTimerButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    const endTime = new Date(endTimeInput.value).getTime();

    if (isNaN(endTime)) {
        countdownDisplay.textContent = 'Будь ласка, введіть коректну дату та час.';
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = 'Час вийшов!';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownDisplay.textContent = `Залишилося: ${days} дн., ${hours} год., ${minutes} хв., ${seconds} сек.`;
    }, 1000);
});


const monthYearPicker = document.getElementById('monthYearPicker');
const calendarBody = document.getElementById('calendar-body');
let currentDate = new Date();

function renderCalendar(date) {
    calendarBody.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Понеділок - 0, Неділя - 6

    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendarBody.appendChild(dayElement);
    });

    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendarBody.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;
        if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dayElement.classList.add('today');
        }
        calendarBody.appendChild(dayElement);
    }
}

function updateCalendar() {
    const [year, month] = monthYearPicker.value.split('-');
    if (year && month) {
        currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        renderCalendar(currentDate);
    } else {
        currentDate = new Date();
        renderCalendar(currentDate);
    }
}

monthYearPicker.addEventListener('change', updateCalendar);
renderCalendar(currentDate);
monthYearPicker.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;


const birthdayPicker = document.getElementById('birthdayPicker');
const birthdayCountdownDisplay = document.getElementById('birthdayCountdown');

function updateBirthdayCountdown() {
    const birthdayInputValue = birthdayPicker.value;
    if (birthdayInputValue) {
        const birthdayDate = new Date(birthdayInputValue);
        const now = new Date();
        const nextBirthday = new Date(now.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());

        if (nextBirthday < now) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }

        const timeLeft = nextBirthday.getTime() - now.getTime();

        if (timeLeft > 0) {
            const totalSeconds = Math.floor(timeLeft / 1000);
            const seconds = totalSeconds % 60;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const minutes = totalMinutes % 60;
            const totalHours = Math.floor(totalMinutes / 60);
            const hours = totalHours % 24;
            const days = Math.floor(totalHours / 24);
            const months = nextBirthday.getMonth() - now.getMonth() + (nextBirthday.getFullYear() - now.getFullYear()) * 12;
            const accurateDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // Точна кількість днів

            birthdayCountdownDisplay.textContent = `До дня народження: ${months} міс., ${accurateDays} дн., ${hours} год., ${minutes} хв., ${seconds} сек.`;
        } else {
            birthdayCountdownDisplay.textContent = 'Сьогодні ваш день народження!';
        }
    } else {
        birthdayCountdownDisplay.textContent = 'Будь ласка, вкажіть дату народження.';
    }
}

birthdayPicker.addEventListener('change', updateBirthdayCountdown);
updateBirthdayCountdown(); 