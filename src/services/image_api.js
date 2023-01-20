const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31255242-50a56ca895b91ac33e828d5f7';

async function fetchImage({ query, page }) {
  return await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Sorry, but nothing was found for your query ${query}`)
    );
  });
}

export default fetchImage;
