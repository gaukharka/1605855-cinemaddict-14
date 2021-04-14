import {createElement} from '../utils.js';

const createCommentsContainer = () => {
  return `<ul class="film-details__comments-list">
    </ul>`;
};
export default class CommentsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsContainer();
  }

  getElement() {
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

