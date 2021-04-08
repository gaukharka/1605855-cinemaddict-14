export const generateReleaseYear = (date) => {
  const newDate = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);

  return `${year}`;
};

export const generateReleaseDate = (date) => {
  const newDate = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(newDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate);

  return `${day} ${month} ${year}`;
};

export const isTrue = (value) => {
  value.length >= 2 ? true : false;
};

// const createGenresTemplate = (genre) => {
//   for(let i=0; i<genre.length; i++){
//     return `<span class="film-details__genre">${genre[i]}
//   </span>`;
//   }
// };

const countMovieFilters = {
  watchlist: (films) => films.filter((film) => film.userDetails.watchList).length,
  history: (films) => films.filter((film) => film.userDetails.alreadyWatched).length,
  favorite: (films) => films.filter((film) => film.userDetails.alreadyWatched).length,
};

export const generateFilmFilters = (films) => {
  return Object.entries(countMovieFilters).map(([filmFilterName, filmCounts]) => {
    return{
      name: filmFilterName,
      count: filmCounts(films),
    };
  });
};

export const generateSortedByDateFilms = (filmA, filmB) => {
  const dateA = generateReleaseYear(filmA.filmInfo.release.releaseDate);
  const dateB = generateReleaseYear(filmB.filmInfo.release.releaseDate);

  return dateB -dateA;
};
