import FilterView from '../view/site-menu.js';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {FilterType, MenuItem, UpdateType} from '../const.js';
export default class Filter {
  constructor(mainContainer, filterModel, filmsModel, selectMenuType) {
    this.mainContainer = mainContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._selectMenuType = selectMenuType;

    this._currentMenuType = MenuItem.FILMS;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatClick = this._handleStatClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter(), this._currentMenuType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatsClickHandler(this._handleStatClick);

    if (!prevFilterComponent) {
      render(this.mainContainer, this._filterComponent, 'beforeend');
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType && this._currentMenuType === MenuItem.FILMS) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._selectMenuType(MenuItem.FILMS);
    this._currentMenuType = MenuItem.FILMS;
    this.init();
  }

  _handleStatClick() {
    if (this._currentMenuType === MenuItem.STATS) {
      return;
    }

    this._selectMenuType(MenuItem.STATS);
    this._currentMenuType = MenuItem.STATS;
    this.init;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All movies',
        count: filter[FilterType.ALL_MOVIES](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
