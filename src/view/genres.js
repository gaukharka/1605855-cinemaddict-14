import {createElement} from '../utils.js';

const generateGenreTemplate = (genre) => {
  return `<span class="film-details__genre">
    ${genre}
  </span>`;
};
export default class Genre {
  constructor(genre) {
    this._genre = genre;
    this._element = null;
  }

  getTemplate() {
    return generateGenreTemplate(this._genre);
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
