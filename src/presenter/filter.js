import StatsView from '../view/stats.js';
import FilterView from '../view/site-menu.js';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {FilterType, MenuItem, UpdateType} from '../const.js';

export default class Filter {
  constructor(mainContainer, filterModel, filmsModel, filmsBoard) {
    this._mainContainer = mainContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filmsBoard = filmsBoard;

    this._statsComponent = null;
    this._currentFilter = null;
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

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatsClickHandler(this._handleStatClick);

    if(prevFilterComponent === null) {
      render(this._mainContainer, this._filterComponent, 'beforeend');
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);

    if(filterType === MenuItem.STATS) {
      this._statsComponent = new StatsView(this._filmsModel.getFilms());
      render(this._mainContainer, this._statsComponent, 'beforeend');
    } else {
      remove(this._statsComponent);
    }
  }

  _handleStatClick() {
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
