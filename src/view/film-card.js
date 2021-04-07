import {generateReleaseYear} from './utils.js';

const isDescriptionLong = (description) => {
  return description.length >=140 ? true : false;
};

export const createFilmCardTemplate = (film) => {
  const {comments} = film;
  const {title, runtime, release, poster, genre, description, rating} = film.filmInfo;
  const filmDescription = isDescriptionLong(description) === true ? description.substring(0, 139) + '...' : description;

  const year = generateReleaseYear(release.releaseDate);

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};
