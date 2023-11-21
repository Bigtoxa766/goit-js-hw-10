import axios from "axios";
// 'live_qghZgDxUadKGF3wnRtHDGKXMRWjfgkLv8WMQTRSKnZsBSBaENJvhkvripMcVMkOf';

axios.defaults.headers.common["x-api-key"] = "live_qghZgDxUadKGF3wnRtHDGKXMRWjfgkLv8WMQTRSKnZsBSBaENJvhkvripMcVMkOf";

export function fetchBreeds() {

  return axios('https://api.thecatapi.com/v1/breeds')
    .then(resp => resp.data)
};

export function fetchCatByBreed(breedId) {
  return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data)
}