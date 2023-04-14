// Описан в документации
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import '../css/timer-styles.css';

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
chekedDate(selectedDates[0]);
},
};

const textInput = document.querySelector('input#datetime-picker');
const flatpickrEL = flatpickr(textInput, options);

const timer = document.querySelector('.timer');

const refs = {
btnStart: document.querySelector('[data-start]'),
daysField: timer.querySelector('[data-days]'),
hoursField: timer.querySelector('[data-hours]'),
minutesField: timer.querySelector('[data-minutes]'),
secondsField: timer.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', countDown);

disabledBtn();

function chekedDate(selectedDates) {
if (Date.now() > selectedDates) {
Notify.failure('Please choose a date in the future');
if (!refs.btnStart.hasAttribute('disabled', true)) {
refs.btnStart.setAttribute('disabled', true);
}
return;
}

if (refs.btnStart.hasAttribute('disabled', true)) {
refs.btnStart.removeAttribute('disabled');
}
}

function disabledBtn() {
refs.btnStart.setAttribute('disabled', true);
}

function countDown() {
    disabledBtn();
    textInput.setAttribute('disabled', true);
    Notify.success('Timer started');
setInterval(() => {
const timeDiff = flatpickrEL.selectedDates[0].getTime() - Date.now();
const timeObj = convertMs(timeDiff);
updateClockface(timeObj);
}, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
refs.daysField.textContent = addLeadingZero(days);
refs.hoursField.textContent = addLeadingZero(hours);
refs.minutesField.textContent = addLeadingZero(minutes);
refs.secondsField.textContent = addLeadingZero(seconds);

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    Notify.success('Time is over'); 
    textInput.removeAttribute('disabled');
  }
}

function addLeadingZero(value) {
return String(value).padStart(2, '0');
}

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}