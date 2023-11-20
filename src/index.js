import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
// const errorEl = document.querySelector('.error');
const infoEl = document.querySelector('.cat-info');

export { loaderEl };

  
selectorEl.addEventListener('change', onSearch);

function onSearch(e) {
  const elementId = e.target.value;

  fetchCatByBreed(elementId).then(data => {

    // loaderEl.classList.remove("js-unActive");

    data.map(item => {
         infoEl.innerHTML = `<img src="${item.url}" alt="" width="500px">`;
      
      fetchBreeds().then(data => {
        data.map(({ name, description, temperament, id }) => {
          
      if (id === elementId) {
        // loaderEl.classList.add("js-unActive");

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
      .catch(err => {
    if (!err) {
      return
          }
          })
    })
  })
  .catch(err => {
    if (!err) {
      return
    }
    Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!')
  })
};

fetchBreeds().then(data => {
  data.map(({ id, name }) => {
    
    const markup = `
    <option value="${id}">${name}</option>`;
    selectorEl.insertAdjacentHTML('beforeend', markup);
  })
}).catch(err => {
    if (!err) {
      return
    }
    Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!')
  }
)
