import './js/library';
import { showWatched } from './js/library';
const queueButton = document.querySelector('#queue-button');
const watchedButton = document.querySelector('#watched-button');
watchedButton.classList.add('is-active');
const API_KEY = '3453ae595a5d53cbc877c6d05de8a002';
const BASE_URL = 'https://api.themoviedb.org/3';
queueButton.addEventListener('click', () => {
  queueButton.classList.add('is-active');
  watchedButton.classList.remove('is-active');
  showQueue();
});
watchedButton.addEventListener('click', () => {
  queueButton.classList.remove('is-active');
  watchedButton.classList.add('is-active');
  showWatched();
});
showWatched();
