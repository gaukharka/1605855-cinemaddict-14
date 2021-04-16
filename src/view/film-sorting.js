import AbstractView from './abstract.js';

const createFilmSortingElementTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
</ul>`;
};

export default class FilmSorting extends AbstractView {
  getTemplate() {
    return createFilmSortingElementTemplate();
  }

  getSortButton() {
    return this._element.querySelectorAll('.sort__button');
  }

  getSortByDefaultButton() {
    return this._element.querySelector('.sort__button-default');
  }

  getSortByDateButton() {
    return this._element.querySelector('.sort__button-date');
  }

  getSortByRateButton() {
    return this._element.querySelector('.sort__button-rating');
  }
}
