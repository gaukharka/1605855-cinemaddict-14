import {createElement} from '../utils.js';

const generateGenresContainer = () => {
  return `<td class="film-details__cell">
  </td>`;
};

export default class GenreContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return generateGenresContainer();
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
