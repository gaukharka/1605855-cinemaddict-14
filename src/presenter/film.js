import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {remove, render, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/film.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class Film {
  constructor(container, bodyElement, changeData, changeMode) {
    this._container = container;
    this._bodyElement = bodyElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handlePopupOpenClick = this._handlePopupOpenClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._popupComponent = new PopupView(this._film);

    this._filmCardComponent.setPosterClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setTitleClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setCommentClickHandler(this._handlePopupOpenClick);
    this._popupComponent.setCloseButtonClickHandler(this._handlePopupCloseClick);

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setPopupWatchListClickHandler(this._handleWatchListClick);
    this._popupComponent.setPopupAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setPopupFavoriteClickHandler(this._handleFavoriteClick);

    if(prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent, 'beforeend');
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if(this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  }

  resetView() {
    if (this._mode === Mode.POPUP) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openPopup() {
    render(this._bodyElement, this._popupComponent.getElement(), 'beforeend');
  }

  _handlePopupOpenClick() {
    this._openPopup();
    this._changeMode();
    this._mode = Mode.POPUP;
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopupCloseClick() {
    this._closePopup();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _closePopup() {
    remove(this._popupComponent);
    this._mode = Mode.DEFAULT;
  }

  _handleWatchListClick() {
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        watchList: !this._film.userDetails.watchList,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        alreadyWatched: !this._film.userDetails.alreadyWatched,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        favorite: !this._film.userDetails.favorite,
      },
    );

    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
  }
}
