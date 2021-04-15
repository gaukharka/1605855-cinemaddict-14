import {createElement} from '../utils.js';

const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra films-list--top">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  </div>
</section>`;
};
export default class TopRatedFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmsTemplate();
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

