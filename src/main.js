// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';
const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);
function formSubmit(event) {
  event.preventDefault();

  const searchQuery = new FormData(event.target).get('search-text').trim();
  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Заповніть поле вводу',
    });
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(searchQuery)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createGallery(hits);
        form.reset();
      }
    })
    .catch(error => {
      console.error(error.message);
    })
    .finally(() => {
      hideLoader();
    });
}
// getImagesByQuery('cats').then(data => console.log(data.hits));
// showLoader();
// hideLoader();
// createGallery();
// clearGallery();
