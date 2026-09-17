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
  hideLoadMoreButton,
  showLoadMoreButton,
  checkEndOfResults,
} from './js/render-functions';
let currentQuery = '';
let currentPage = 1;
const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);
async function onLoadMore() {
  currentPage += 1;
  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    createGallery(hits);
    checkEndOfResults(currentPage, totalHits);
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}
async function formSubmit(event) {
  event.preventDefault();
  const searchQuery = new FormData(event.target).get('search-text').trim();
  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Заповніть поле вводу',
    });
    return;
  }
  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      form.reset();
      createGallery(hits);
      checkEndOfResults(currentPage, totalHits);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}
