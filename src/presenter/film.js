import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render} from '../utils/render.js';
import {isEscEvent} from '../utils/film.js';

export default class Film {
  constructor(bodyElement) {
    this._bodyElement = bodyElement;

    this._handlePopupOpenClick = this._handlePopupOpenClick.bind(this);
    this._handlePopupCloseClick = this._handlePopupCloseClick.bind(this);
  }

  init(container, film) {
    this._film = film;
    this._container = container;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    this._filmCardComponent.setPosterClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setTitleClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setCommentClickHandler(this._handlePopupOpenClick);

    render(this._container, this._filmCardComponent, 'beforeend');
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
}
