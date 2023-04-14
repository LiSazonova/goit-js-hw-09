import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);
  let position = 0;

  if (delay < 0 || step < 0 || amount <= 0) {
    Notify.failure(`Please enter a correct value`);
  }

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
