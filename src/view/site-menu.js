import { MenuItem } from '../const.js';
import AbstractView from './abstract.js';

const createSiteMenuItemTemplate = (filter, currentFilterType, currentMenuType) => {
  const {type, name, count} = filter;

  return (
    type === 'All movies' ?
      `<a href="#all" class="main-navigation__item ${type === currentFilterType && currentMenuType === MenuItem.FILMS ? 'main-navigation__item--active' : ''}" data-filter = "${type}">All movies</a>` :
      `<a href="#${name}" class="main-navigation__item ${type === currentFilterType && currentMenuType === MenuItem.FILMS ? 'main-navigation__item--active' : ''}" data-filter = "${type}">
    ${type} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createSiteMenuTemplate = (filterItems, currentFilterType, currentMenuType) => {

  const filterItemsTemplate = filterItems
    .map((filter) => createSiteMenuItemTemplate(filter, currentFilterType, currentMenuType))
    .join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional ${currentMenuType === MenuItem.STATS ? 'main-navigation__additional--active' : ''}">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType, currentMenuType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._currentMenuType = currentMenuType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandler= this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType, this._currentMenuType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => item.addEventListener('click', this._filterTypeChangeHandler));
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => {
      if (item.classList.contains('main-navigation__item--active')) {
        item.classList.remove('main-navigation__item--active');
      }
    });
    this.getElement().querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active');
    this._callback.statsClick();
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._statsClickHandler);
  }
}
