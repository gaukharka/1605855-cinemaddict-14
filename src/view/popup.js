import {generateReleaseDate, isEnterEvent} from '../utils/film.js';
import SmartView from './smart.js';
import he from 'he';

const Emoji = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const createPopupTemplate = (film, state) => {
  const {selectedEmoji, newComment} = state;
  const comments = film.comments;
  const {title, alternativelTitle, runtime, poster, description, genre, rating, ageAllowance, director, writers, actors, release } = film.filmInfo;
  const {watchList, alreadyWatched, favorite} = film.userDetails;

  const stringGenre = (genre.length>=2) ? 'Genres' : 'Genre';
  const releaseDate = generateReleaseDate(release.releaseDate);

  const generateGenres = () => {
    return `${genre.map((value) => `<span class="film-details__genre">
    ${value}
    </span>`).join('')}`;
  };

  const generateComments = () => {
    return `${comments.map((comment) => `<li class="film-details__comment" data-id="${comment.id}">
      <span class="film-details__comment-emoji">
        <img src="images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.data}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`).join('')}`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageAllowance}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativelTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.country}</td>
            </tr>
            <tr class="film-details__row film-details__row-genre">
              <td class="film-details__term">${stringGenre}</td>
              <td class="film-details__cell">
              ${generateGenres()}</td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchList ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? 'checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${generateComments()}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${selectedEmoji ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-${selectedEmoji}"></img>` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment ? newComment : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.SMILE}" value="${Emoji.SMILE}" ${selectedEmoji === Emoji.SMILE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${Emoji.SMILE}">
              <img src="./images/emoji/${Emoji.SMILE}.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.SLEEPING}" value="${Emoji.SLEEPING}" ${selectedEmoji === Emoji.SLEEPING ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${Emoji.SLEEPING}">
              <img src="./images/emoji/${Emoji.SLEEPING}.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.PUKE}" value="${Emoji.PUKE}" ${selectedEmoji === Emoji.PUKE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${Emoji.PUKE}">
              <img src="./images/emoji/${Emoji.PUKE}.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji.ANGRY}" value="${Emoji.ANGRY}" ${selectedEmoji === Emoji.ANGRY ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${Emoji.ANGRY}">
              <img src="./images/emoji/${Emoji.ANGRY}.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};
export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._state = {
      selectedEmoji: '',
      newComment: '',
    };

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiSelectHandler = this._emojiSelectHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);
    this._enterKeyDownHandler = this._enterKeyDownHandler.bind(this);
    this._deleteCommentButtonHandler = this._deleteCommentButtonHandler.bind(this);

    this._setInnerChangeHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._state);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeButtonClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setPopupWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._watchListClickHandler);
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setPopupAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setPopupFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._favoriteClickHandler);
  }

  reset() {
    this.updateState({
      newComment: '',
    }, true);

    this.updateState({
      selectedEmoji: '',
    });
  }

  restoreHandlers() {
    this._setInnerChangeHandlers();
    this.setPopupWatchListClickHandler(this._callback.watchListClick);
    this.setPopupAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick );
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setCommentSubmitHandler(this._callback.commentSubmit);
    this.setDeleteCommentButtonClickHandler(this._callback.deleteCommentButtonClick);
  }

  _emojiSelectHandler(evt) {
    const initialPosition = this.getElement().scrollTop;
    evt.preventDefault();

    this.updateState({
      selectedEmoji: evt.target.value,
    });

    this.getElement().scrollTop = initialPosition;
  }

  _textInputHandler(evt) {
    evt.preventDefault();

    this.updateState({
      newComment: evt.target.value,
    }, true);
  }

  _setInnerChangeHandlers() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiSelectHandler);
  }

  //comment submit
  _enterKeyDownHandler(evt) {
    const initialPosition = this.getElement().scrollTop;

    if(isEnterEvent(evt)) {
      evt.preventDefault();

      if(!this._state.selectedEmoji || !this._state.newComment){
        return;
      }

      this._callback.commentSubmit(Popup.parseStateToData(this._state));

      this.updateState({
        newComment: '',
        selectedEmoji: '',
      });
    }

    this.getElement().scrollTop = initialPosition;
  }

  setCommentSubmitHandler(callback) {
    this._callback.commentSubmit = callback;
    document.addEventListener('keydown', this._enterKeyDownHandler);
  }

  //comment delete
  _deleteCommentButtonHandler(evt) {
    evt.preventDefault();
    if (evt.target.matches('.film-details__comment-delete')) {
      const id = evt.target.closest('.film-details__comment').dataset.id;
      const comments = this._film.comments.filter((item) => item.id !== id);

      this.updateState({
        comments,
      });

      this._callback.deleteCommentButtonClick(comments);
    }
  }

  setDeleteCommentButtonClickHandler(callback) {
    this._callback.deleteCommentButtonClick = callback;
    this.getElement().querySelector('.film-details__comment-delete').addEventListener('click', this._deleteCommentButtonHandler);
  }

  static parseStateToData(state){
    const data = {
      comment: state.newComment,
      emotion: state.selectedEmoji,
    };

    delete state.newComment;
    delete state.selectedEmoji;

    return data;
  }
}
