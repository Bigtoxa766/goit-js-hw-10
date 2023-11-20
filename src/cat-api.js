import axios from "axios";
// 'live_qghZgDxUadKGF3wnRtHDGKXMRWjfgkLv8WMQTRSKnZsBSBaENJvhkvripMcVMkOf';

axios.defaults.headers.common["x-api-key"] = "live_qghZgDxUadKGF3wnRtHDGKXMRWjfgkLv8WMQTRSKnZsBSBaENJvhkvripMcVMkOf";
import { loaderEl } from './index';

export function fetchBreeds() {
  loaderEl.style.display = 'inline-block';

  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(resp => {
      if (!resp.ok) {
      throw new Error(resp.statusText)
      }
      loaderEl.style.display = 'none';
      return resp.json()
  })
};

export function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
    if (!resp.ok) {
      throw new Error (resp.statusText)
      }
      return resp.json()
  })
}