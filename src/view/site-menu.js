import {createElement} from '../utils.js';

const createSiteMenuTemplate = (filters) => {
  const watchlistCount = filters[0].count;
  const history = filters[1].count;
  const favorite = filters[2].count;

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
</nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
