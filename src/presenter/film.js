import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {remove, render, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/film.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class Film {
  constructor(bodyElement, changedata, changeMode) {
    this._bodyElement = bodyElement;
    this._changedata = changedata;
    this._changeMode = changeMode;

    this._mode = Mode.DEFAULT;

    this._handlePopupOpenClick = this._handlePopupOpenClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  init(container, film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    this._filmCardComponent.setPosterClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setTitleClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setCommentClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    // this._popupComponent.setSubmitFormHandler(this._handleSubmitForm);

    if(prevFilmCardComponent === null) {
      render(container, this._filmCardComponent, 'beforeend');
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if(this._mode === Mode.POPUP) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _openPopup() {
    render(this._bodyElement, this._popupComponent, 'beforeend');
    this._popupComponent.setCloseButtonClickHandler(this._handlePopupCloseClick);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closePopup() {
    this._popupComponent.getElement().remove();
    this._popupComponent.removeElement();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopupOpenClick() {
    this._openPopup();
  }

  _handlePopupCloseClick() {
    this._closePopup();
  }

  _handleWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          watchList: !this._film.watchList,
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          alreadyWatched: !this._film.alreadyWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          favorite: !this._film.favorite,
        },
      ),
    );
  }

  // _handleSubmitForm(film) {
  //   // if (evt.keyCode === 13 && evt.metaKey) {
  //   //   this._formSubmit();
  //   // }
  //   this._changeData(film);
  // }

  // _formSubmit() {
  //   this._popupComponent.addEventListener('keydown', this._handleSubmitForm);
  // }
}
