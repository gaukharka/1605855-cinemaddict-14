import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {remove, render, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/film.js';
import {isOnline} from '../utils/common.js';
import {toast} from '../utils/toast.js';
import {UserAction, UpdateType, PopupState} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class Film {
  constructor(container, bodyElement, changeData, changeMode, commentsModel, api) {
    this._container = container;
    this._bodyElement = bodyElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;
    this._api = api;

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
    this._handleCommentDelete = this._handleCommentDelete.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);

    this._filmCardComponent.setPosterClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setTitleClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setCommentClickHandler(this._handlePopupOpenClick);
    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if(prevFilmCardComponent === null) {
      render(this._container, this._filmCardComponent, 'beforeend');
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  resetView() {
    if (this._mode === Mode.POPUP) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmCardComponent);

    if (this._mode === Mode.DEFAULT) {
      remove(this._popupComponent);
    }
  }

  _escKeyDownHandler(evt) {
    if(isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openPopup(comments) {
    const prevPopupComponent = this._popupComponent;
    this._popupComponent = new PopupView(this._film, comments);

    this._popupComponent.setCloseButtonClickHandler(this._handlePopupCloseClick);
    this._popupComponent.setPopupWatchListClickHandler(this._handleWatchListClick);
    this._popupComponent.setPopupAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._popupComponent.setPopupFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setCommentSubmitHandler(this._handleCommentSubmit);
    this._popupComponent.setDeleteCommentButtonClickHandler(this._handleCommentDelete);

    if (prevPopupComponent !== null) {
      replace(this._popupComponent, prevPopupComponent);
    }
    render(this._bodyElement, this._popupComponent.getElement(), 'beforeend');

    remove(prevPopupComponent);
  }

  _closePopup() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, this._film);
    remove(this._popupComponent);
    this._mode = Mode.DEFAULT;
  }

  _handlePopupOpenClick() {
    this._changeMode();
    this._mode = Mode.POPUP;

    this._api.getComment(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._openPopup(comments);
      });

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

  _setViewState(state, id) {
    const resetState = () => {
      this._popupComponent.updateState({
        isDisabled: false,
        deletingCommentId: '',
      });
    };

    switch(state) {
      case PopupState.SENDING:
        this._popupComponent.updateState({
          isDisabled: false,
        });
        break;
      case PopupState.DELETING:
        this._popupComponent.updateState({
          isDisabled: false,
          deletingCommentId: id,
        });
        break;
      case PopupState.ABORTING:
        this._popupComponent.shake(resetState);
        break;
    }
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
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
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          userDetails: newUserDetails,
        },
      ),
    );
  }

  _handleCommentSubmit(newComment) {
    const initialPosition = this._popupComponent.getElement().scrollTop;

    if (!isOnline()) {
      toast('You can\'t send comment when offline');
      return;
    }

    this._setViewState(PopupState.SENDING);
    this._api.addComment(this._film.id, newComment)
      .then((response) => {
        this._changeData(
          this._popupComponent.updateState({
            comments: response.comments,
          }),
          UpdateType.MINOR,
          Object.assign(
            {},
            this._film,
            {
              comments: response.comments,
            },
          ),
        );
      })
      .catch(() => {
        this._setViewState(PopupState.ABORTING);
      });
    this._popupComponent.getElement().scrollTop = initialPosition;
  }

  _handleCommentDelete(id) {
    const initialPosition = this._popupComponent.getElement().scrollTop;

    if (!isOnline()) {
      toast('You can\'t delete comment when offline');
      return;
    }

    this._setViewState(PopupState.DELETING);
    this._api.deleteComment(id)
      .then(() => {
        this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.MINOR,
          Object.assign(
            {},
            this._film,
            {
              comments: this._commentsModel.getComments()
                .filter((comment) => comment.id !== id)
                .map((comment) => comment.id),
            },
          ),
        );
      })
      .catch(() => {
        this._setViewState(PopupState.ABORTING);
      });
    this._popupComponent.getElement().scrollTop = initialPosition;
  }
}
