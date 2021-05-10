import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {remove, render, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/film.js';
import {UserAction, UpdateType} from '../const.js';

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

    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    // this._handleCommentDelete = this._handleCommentDelete.bind(this);
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

    this._popupComponent.setCommentSubmitHandler(this._handleCommentSubmit);
    this._popupComponent.setDeleteCommentButtonClickHandler(this._handleCommentDelete);

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
    this._popupComponent.setCloseButtonClickHandler(this._handlePopupCloseClick);
  }

  _handlePopupOpenClick() {
    this._openPopup();
    this._changeMode();
    this._mode = Mode.POPUP;
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    document.addEventListener('keydown', this._enterKeyDownHandler);
  }

  _handlePopupCloseClick() {
    this._closePopup();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.removeEventListener('keydown', this._enterKeyDownHandler);
  }

  _closePopup() {
    remove(this._popupComponent);
    this._popupComponent.reset(this._film.comments);
    this._mode = Mode.DEFAULT;
  }

  _handleWatchListClick() {
    const initialPosition = this._popupComponent.getElement().scrollTop;
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        watchList: !this._film.userDetails.watchList,
      },
    );

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
    this._popupComponent.getElement().scrollTop = initialPosition;
  }

  _handleAlreadyWatchedClick() {
    const initialPosition = this._popupComponent.getElement().scrollTop;
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        alreadyWatched: !this._film.userDetails.alreadyWatched,
      },
    );

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
    this._popupComponent.getElement().scrollTop = initialPosition;
  }

  _handleFavoriteClick() {
    const initialPosition = this._popupComponent.getElement().scrollTop;
    const newUserDetails = Object.assign(
      {},
      this._film.userDetails,
      {
        favorite: !this._film.userDetails.favorite,
      },
    );

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
    this._popupComponent.getElement().scrollTop = initialPosition;
  }

  _handleCommentSubmit(state) {
    this._film.comments.push(state);
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      // this._film.comments,
      Object.assign(
        {},
        this._film,
        {
          comments: state,
        },
      ),
    );
  }

  // _handleCommentDelete(film) {
  //   // this._film.comments.
  //   this._changeData(
  //     UserAction.DELETE_FILM,
  //     UpdateType.PATCH,
  //     this._film.comments,
  //   );
  // }
}
