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
