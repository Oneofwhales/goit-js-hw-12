// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export const createGallery = function createGallery(images) {
  const result = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class='gallery-item'>
       <a href = '${largeImageURL}'>
       <img src = '${webformatURL}' alt = '${tags}'/>
       </a>
       <ul class ='info'>
         <li class="info-item">Likes <span class="span-info">${likes}</span></li>
         <li class="info-item">Views <span class="span-info">${views}</span></li>
         <li class="info-item">Comments <span class="span-info">${comments}</span></li>
         <li class="info-item">Downloads <span class="span-info">${downloads}</span></li>
       </ul>
   </li>`
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', result);
  lightbox.refresh();
};

export const clearGallery = function clearGallery() {
  galleryContainer.innerHTML = '';
};
export const checkEndOfResults = function checkEndOfResults(
  currentPage,
  totalHits
) {
  if (currentPage * 15 >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreButton();
  }
};
