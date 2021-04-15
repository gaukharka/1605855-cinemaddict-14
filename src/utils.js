export const generateDuration = (duration) => {
  const hours = Math.floor(duration/60);
  const minutes = Math.round(((duration/60)-hours)*60);

  return `${hours}h ${minutes}m`;
};

export const generateHour = (duration) => {
  const hours = Math.floor(duration/60);

  return `${hours}`;
};

export const generateMinutes = (duration) => {
  const hours = Math.floor(duration/60);
  const minutes = Math.round(((duration/60)-hours)*60);

  return `${minutes}`;
};

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

export const generateSortedByDateFilms = (filmA, filmB) => {
  const dateA = generateReleaseYear(filmA.filmInfo.release.releaseDate);
  const dateB = generateReleaseYear(filmB.filmInfo.release.releaseDate);

  return dateB - dateA;
};

export const generateSortedByRatingFilms = (filmA, filmB) => {
  const ratingA = filmA.filmInfo.rating;
  const ratingB = filmB.filmInfo.rating;

  return ratingB - ratingA;
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREBEGIN: 'beforebegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export const compareComments = (filmA, filmB) => {
  const commentA = filmA.comments.length;
  const commentB = filmB.comments.length;
  return commentB - commentA;
};
