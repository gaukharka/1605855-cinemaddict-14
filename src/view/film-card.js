import {generateReleaseYear, generateDuration, createElement} from '../utils.js';
import AbstractView from './abstract.js';

const isDescriptionLong = (description) => {
  return description.length >=140 ? true : false;
};

const createFilmCardTemplate = (film) => {

  const {comments} = film;
  const {title, runtime, release, genre, poster, description, rating} = film.filmInfo;
  const {watchList, alreadyWatched, favorite} = film.userDetails;

  const filmDescription = isDescriptionLong(description) === true ? description.substring(0, 139) + '...' : description;
  const watchlistClassName = watchList === true ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClassName = alreadyWatched === true ? 'film-card__controls-item--active' : '';
  const favoriteClassName = favorite === true ? 'film-card__controls-item--active' : '';

  const year = generateReleaseYear(release.releaseDate);
  const duration = generateDuration(runtime);

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${filmDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button ${favoriteClassName}">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getPoster() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__poster');
  }

  getTitle() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__title');
  }

  getComment() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__comments');
  }
}
