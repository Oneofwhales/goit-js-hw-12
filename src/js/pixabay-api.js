import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '57618791-4db8b96e533d358f5552878ee',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
export const PER_PAGE = 15;
export async function getImagesByQuery(query, page) {
  const response = await axios.get('', {
    params: {
      q: query,
      page,
      per_page: PER_PAGE,
    },
  });
  return response.data;
}
