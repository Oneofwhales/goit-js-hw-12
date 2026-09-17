// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
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
  galleryContainer.innerHTML = result;
  lightbox.refresh();
};

export const clearGallery = function clearGallery() {
  galleryContainer.innerHTML = '';
};
