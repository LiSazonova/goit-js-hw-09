const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

function onClickStart() {
    startBtn.setAttribute('disabled', true);
    
    intervalId = setInterval(changeColorBody, 1000);
    
    stopBtn.removeAttribute('disabled');
}

function onClickStop() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
    clearInterval(intervalId);
}

function changeColorBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
