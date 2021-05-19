export const generateHour = (duration) => {
  const hours = Math.floor(duration/60);

  return `${hours}`;
};

export const generateMinutes = (duration) => {
  const hours = Math.floor(duration/60);
  const minutes = Math.round(((duration/60)-hours)*60);

  return `${minutes}`;
};

export const generateWatchedFilmsArray = (films) => {
  films.filter((film) => film.userDetails.alreadyWatched);
};
