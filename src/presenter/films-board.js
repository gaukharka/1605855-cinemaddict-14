import UserRankView from '../view/user-rank.js';
import AllFilmsView from '../view/films.js';
import FilmListMainView from '../view/films-list.js';
import NoFilms from '../view/no-films.js';
import FilmSortingView from '../view/film-sorting';
import TopRatedFilmsView from '../view/top-rated-films.js';
import TopCommentedFilmsView from '../view/most-commented-films.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import FooterStatsView from '../view/footer-stats.js';
import FilmPresenter from './film.js';
import {render, remove} from '../utils/render.js';
import {filter} from '../utils/filters.js';
import {generateSortedByDateFilms, generateSortedByRatingFilms, compareComments} from '../utils/film.js';
import {SortType, UserAction, UpdateType} from '../const.js';

const FILMS_DISPLAY_STEP = 5;
const MIN_CARD_COUNT = 2;
const ZERO_FILMS = 0;
export default class FilmsBoard {
  constructor(headerElement, bodyElement, mainElement, footerElement, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._headerElement = headerElement;
    this._bodyElement = bodyElement;
    this._mainElement = mainElement;
    this._footerElement = footerElement;
    this._displayedFilms = FILMS_DISPLAY_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._filmSortingComponent = null;
    this._loadMoreButtonComponent = null;

    this._topRatedFilmsComponent = null;
    this._topCommentedFilmsComponent = null;

    this._sortedByRatingFilmsArray = this._filmsModel.getFilms().slice().sort(generateSortedByRatingFilms);
    this._mostCommentedFilmsArray = this._filmsModel.getFilms().slice().sort(compareComments);

    this._allFilmsComponent = new AllFilmsView();
    this._filmListMainComponent = new FilmListMainView();
    this._noFilmsComponent = new NoFilms();
    this._footerStatsComponent = new FooterStatsView();
    this._userRankComponent = new UserRankView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._mainElement, this._allFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._filmListMainComponent, 'beforeend');

    this._renderFilmCardBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms().slice();
    const filteredFilms = filter[filterType](films);

    switch(this._currentSortType) {
      case SortType.DEFAULT:
        return filteredFilms;
      case SortType.BY_DATE:
        return filteredFilms.sort(generateSortedByDateFilms);
      case SortType.BY_RATING:
        return filteredFilms.sort(generateSortedByRatingFilms);
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmCardBoard();
        this._renderFilmCardBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmCardBoard({resetDisplayedFilmCount: true, resetSortType: true});
        this._renderFilmCardBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmCardBoard({resetDisplayedFilmCount: true});
    this._renderFilmCardBoard();
  }

  _renderSort() {
    if(this._filmSortingComponent !== null) {
      this._filmSortingComponent = null;
    }

    this._filmSortingComponent = new FilmSortingView(this._currentSortType);
    this._filmSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._allFilmsComponent, this._filmSortingComponent, 'afterbegin');
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmCards(films) {
    films.forEach((film) => this._renderFilmCard(this._filmListMainComponent.getContainer(), film));
  }

  _renderNoFilms() {
    render(this._mainElement, this._noFilmsComponent, 'beforeend');
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._displayedFilms + FILMS_DISPLAY_STEP);
    const films = this._getFilms().slice(this._displayedFilms, newRenderedFilmsCount);

    this._renderFilmCards(films);
    this._displayedFilms = newRenderedFilmsCount;

    if(this._displayedFilms >= filmsCount){
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if(this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setLoadMoreButtonClickHandler(this._handleLoadMoreButtonClick);

    render(this._filmListMainComponent, this._loadMoreButtonComponent, 'beforeend');
  }

  _clearFilmCardBoard({resetDisplayedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._filmSortingComponent);
    remove(this._noFilmsComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._topRatedFilmsComponent);
    remove(this._topCommentedFilmsComponent);

    if(resetDisplayedFilmCount) {
      this._displayedFilms = FILMS_DISPLAY_STEP;
    } else {
      this._displayedFilms = Math.min(filmCount, this._displayedFilms);
    }

    if(resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderExtraFilmCardsList(container, films) {
    for(let i=0; i< MIN_CARD_COUNT; i++){
      if(films !==0){
        this._renderFilmCard(container.getContainer(), films[i]);
      }
    }
  }

  _renderExtraFilms() {
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topCommentedFilmsComponent = new TopCommentedFilmsView();

    this._renderExtraFilmCardsList(this._topRatedFilmsComponent, this._sortedByRatingFilmsArray);
    this._renderExtraFilmCardsList(this._topCommentedFilmsComponent, this._mostCommentedFilmsArray);

    render(this._allFilmsComponent, this._topRatedFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._topCommentedFilmsComponent, 'beforeend');
  }

  _renderFooterStats() {
    if(this._getFilms().length === 0){
      this._renderNoFilms();
      render(this._footerElement, new FooterStatsView(ZERO_FILMS), 'beforeend');
      remove(this._topRatedFilmsComponent);
      remove(this._topCommentedFilmsComponent);
    }

    this._renderExtraFilms();
    render(this._footerElement, new FooterStatsView(this._getFilms().length), 'beforeend');
  }

  _renderUserRank() {
    render(this._headerElement, new UserRankView(this._getFilms()), 'beforeend');
  }

  _renderFilmCardBoard() {
    const films = this._getFilms();
    const filmsCount = films.length;
    this._renderUserRank();
    this._renderSort();
    this._renderFooterStats();

    this._renderFilmCards(films.slice(0, Math.min(filmsCount, this._displayedFilms)));
    if(filmsCount > this._displayedFilms) {
      this._renderLoadMoreButton();
    }
  }
}
