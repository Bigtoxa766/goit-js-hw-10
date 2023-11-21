import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectorEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');

// new SlimSelect({
//   select: '#single'
// })

selectorEl.addEventListener('change', onSearch);

function onSearch(e) {
  const elementId = e.target.value;

  fetchCatByBreed(elementId).then(data => {

    if (data.length === 0) {
      return Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!')
    }

    selectorEl.hidden = true;
  
    data.map(item => {
      loaderEl.style.display = 'inline-block';
      infoEl.innerHTML = `<img src="${item.url}" alt="" width="500px">`;
      
      fetchBreeds().then(data => {
        data.map(({ name, description, temperament, id }) => {
          
      if (id === elementId) {

        const markup = `
        <div class="wrapper-js">
        <h1 class="name-js">${name}</h1>
      <p class="description-js">${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
        
        loaderEl.style.display = 'none';
        selectorEl.hidden = false;
        return infoEl.insertAdjacentHTML('beforeend', markup)
      }
    }).join('')
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
 
  loaderEl.style.display = 'inline-block';
  data.map(({ id, name }) => {
    
    const markup = `
    <option value="${id}">${name}</option>`;
    loaderEl.style.display = 'none';
    selectorEl.hidden = false;
    selectorEl.insertAdjacentHTML('beforeend', markup);
  })
}).catch(err => {
    if (!err) {
      return
    }
    Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!')
  }
)
