
// from '../utils.js';
const filmToFilterMap = {
  all: (films) => films
    .filter((film) => film.isWatched).length
    .filter((film) => film.isFavorite).length
    .filter((film) => film.isToWatch).length,
  watchlist: (films) => films.filter((film) => film.isToWatch).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorite: (films) => films
    .filter((film) => !film.isWatched)
    .filter((film) => film.isFavorite).legth,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
