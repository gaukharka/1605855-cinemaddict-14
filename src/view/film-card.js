import {generateReleaseYear, generateDuration} from '../utils/film.js';
import {createElement} from '../utils/render.js';
import AbstractView from './abstract.js';

const isDescriptionLong = (description) => {
  return description.length >=140 ? true : false;
};

const createFilmCardTemplate = (film) => {

  const {comments} = film;
  const {title, runtime, release, genre, poster, description, rating} = film.filmInfo;
  const {watchList, alreadyWatched, favorite} = film.userDetails;

  const filmDescription = isDescriptionLong(description) === true ? description.substring(0, 139) + '...' : description;
  const watchlistClassName = watchList ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClassName = alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = favorite ? 'film-card__controls-item--active' : '';

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

    this._posterClickHandler= this._posterClickHandler.bind(this);
    this._titleClickHandler= this._titleClickHandler.bind(this);
    this._commentClickHandler= this._commentClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _getPoster() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__poster');
  }

  _getTitle() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__title');
  }

  _getComment() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element.querySelector('.film-card__comments');
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this._getPoster().addEventListener('click', this._posterClickHandler);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this._getTitle().addEventListener('click', this._titleClickHandler);
  }

  _commentClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentClick();
  }

  setCommentClickHandler(callback) {
    this._callback.commentClick = callback;
    this._getComment().addEventListener('click', this._commentClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
