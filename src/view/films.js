import {createElement} from '../utils.js';

const createAllFilmsTemplate = () => {
  return `<section class="films">
  </section>`;
};
export default class AllFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAllFilmsTemplate();
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
