import AbstractView from './abstract.js';

const createLoadMoreButton = () => {
  return `<button class="films-list__show-more">Show more
  </button>`;
};
export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
    this._loadMoreButtonCliclHandler = this._loadMoreButtonCliclHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreButton();
  }

  _loadMoreButtonCliclHandler(evt) {
    evt.preventDefault();
    this._callback.loadMoreButtonClick();
  }

  setLoadMoreButtonClickHandler(callback) {
    this._callback.loadMoreButtonClick = callback;
    this.getElement().addEventListener('click', this._loadMoreButtonCliclHandler);
  }
}

