import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const infoEl = document.querySelector('.cat-info');

selectorEl.addEventListener('change', onSearch);

function onSearch(e) {
  const elementId = e.target.value;
  fetchCatByBreed(elementId).then(item => console.log(item))
}

fetchBreeds().then(data => {
  console.log(data);

  data.map(({ id, name }) => {
    const markup = `
    <option value="${id}">${name}</option>`;
    selectorEl.insertAdjacentHTML('beforeend', markup);
    
  })
});
