const rankMap = new Map();

rankMap.set({
  min: 0,
  max: 0,
}, '');

rankMap.set({
  min: 1,
  max: 10,
}, 'Novice');

rankMap.set({
  min: 11,
  max: 20,
}, 'Fan');

rankMap.set({
  min: 21,
  max: Infinity,
}, 'Movie Buff');

export const generateUserRank = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched).length;

  for(const value of rankMap) {
    if(watchedFilms >= value[0].min && watchedFilms <= value[0].max) {
      return value[1];
    }
  }
};
