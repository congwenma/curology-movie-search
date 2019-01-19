// SHOW:
// https://api.themoviedb.org/3/movie/550?api_key=dedc779b0985d05887300490a84aba70

// https://api.themoviedb.org/3/movie/343611?api_key=dedc779b0985d05887300490a84aba70

const API_KEY = "dedc779b0985d05887300490a84aba70";

/**
 *
 * @result
 *   "page": 1,
 *   "total_results": 2,
 *   "total_pages": 1,
 *   "results": [...]
 */
export const search = ({ query, page }) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
};

export const show = ({ id }) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
};
