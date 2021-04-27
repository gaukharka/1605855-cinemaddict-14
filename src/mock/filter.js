const countMovieFilters = {
  watchList: (films) => films.filter((film) => film.userDetails.watchList).length,
  alreadyWatched: (films) => films.filter((film) => film.userDetails.alreadyWatched).length,
  favorite: (films) => films.filter((film) => film.userDetails.favorite).length,
};

export const generateFilmFilters = (films) => {
  return Object.entries(countMovieFilters).map(([filmFilterName, filmCounts]) => {
    return{
      name: filmFilterName,
      count: filmCounts(films),
    };
  });
};
