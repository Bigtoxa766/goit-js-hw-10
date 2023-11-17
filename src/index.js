import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const infoEl = document.querySelector('.cat-info');

loaderEl.style.display = 'none';
errorEl.style.display = 'none';

selectorEl.addEventListener('change', onSearch);

function onSearch(e) {
  const elementId = e.target.value;

  fetchCatByBreed(elementId).then(data =>
    data.map(item => {
      infoEl.innerHTML = `<img src="${item.url}" alt="" width="500px">`;
      
      fetchBreeds().then(data => {
        data.map(({name, description, temperament, id}) => {
      if (id === elementId) {
        
        const markup = `
        <div class="wrapper-js">
        <h1 class="name-js">${name}</h1>
      <p class="description-js">${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
        
       return infoEl.insertAdjacentHTML('beforeend', markup)
      }
    })
  })
    }));
 
}

fetchBreeds().then(data => {

  data.map(({ id, name }) => {
    const markup = `
    <option value="${id}">${name}</option>`;
    selectorEl.insertAdjacentHTML('beforeend', markup);
    
  })
});
