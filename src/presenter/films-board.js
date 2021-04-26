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
import {generateSortedByDateFilms, generateSortedByRatingFilms, compareComments} from '../utils/film.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';

const FILMS_DISPLAY_STEP = 5;
const MIN_CARD_COUNT = 2;
const ZERO_FILMS = 0;
export default class FilmsBoard {
  constructor(bodyElement, mainElement, footerElement) {
    this._bodyElement = bodyElement;
    this._mainElement = mainElement;
    this._footerElement = footerElement;
    this._displayedFilms = FILMS_DISPLAY_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._filmSortingComponent = new FilmSortingView();
    this._allFilmsComponent = new AllFilmsView();
    this._filmListMainComponent = new FilmListMainView();
    this._noFilmsComponent = new NoFilms();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topCommentedFilmsComponent = new TopCommentedFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._footerStatsComponent = new FooterStatsView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._initialFilmsSource = films.slice();
    this._filmsCount = films.length;

    this._sortedBydateFilmsArray = this._films.slice().sort(generateSortedByDateFilms);
    this._sortedByRatingFilmsArray = this._films.slice().sort(generateSortedByRatingFilms);
    this._mostCommentedFilmsArray = this._films.slice().sort(compareComments);

    render(this._mainElement, this._allFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._filmSortingComponent, 'beforeend');
    render(this._allFilmsComponent, this._filmListMainComponent, 'beforeend');
    render(this._allFilmsComponent, this._topRatedFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._topCommentedFilmsComponent, 'beforeend');

    this._renderFilmCardBoard();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._initialFilmsSource = updateItem(this._initialFilmsSource, updatedFilm);

    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._addActiveToButton(this._filmSortingComponent.getSortByDateButton());
        this._films.sort(generateSortedByDateFilms);
        break;
      case SortType.BY_RATING:
        this._addActiveToButton(this._filmSortingComponent.getSortByRateButton());
        this._films.sort(generateSortedByRatingFilms);
        break;
      default:
        this._addActiveToButton(this._filmSortingComponent.getSortByDefaultButton());
        this._films = this._initialFilmsSource.slice();
    }
    this._currentSortType = sortType;
  }

  _addActiveToButton(sortingButton) {
    sortingButton.addEventListener('click', () => {
      this._filmSortingComponent.getSortButton().forEach((button) => {
        button.classList.remove('sort__button--active');
      });
      sortingButton.classList.add('sort__button--active');
    });
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._clearFilmCardList();
    this._sortFilms(sortType);
    this._renderFilmCardsList();
  }

  _clearFilmCardList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._displayedFilms = FILMS_DISPLAY_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderSort() {
    this._filmSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleFilmCardChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(this._filmListMainComponent.getContainer(), film));
  }

  _renderFilmCardsList() {
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_DISPLAY_STEP));

    if(this._films.length > FILMS_DISPLAY_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._displayedFilms, this._displayedFilms + FILMS_DISPLAY_STEP);
    this._displayedFilms += FILMS_DISPLAY_STEP;

    if(this._displayedFilms >= this._films.length){
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmListMainComponent, this._loadMoreButtonComponent, 'beforeend');
    this._loadMoreButtonComponent.setLoadMoreButtonClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderExtraFilmCardsList(container, films) {
    for(let i=0; i< MIN_CARD_COUNT; i++){
      if(films !==0){
        this._renderFilmCard(container.getContainer(), films[i]);
      }
    }
  }

  _renderFooterStats() {
    if(this._films.length === 0){
      this._renderNoFilms();
      render(this._footerElement, this._footerStatsComponent.getElement(ZERO_FILMS), 'beforeend');
    }

    render(this._footerElement, this._footerStatsComponent.getElement(this._filmsCount), 'beforeend');
  }

  _renderNoFilms() {
    render(this._mainElement, this._noFilmsComponent, 'beforeend');
  }

  _renderFilmCardBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilmCardsList();
    this._renderExtraFilmCardsList(this._topRatedFilmsComponent, this._sortedByRatingFilmsArray);
    this._renderExtraFilmCardsList(this._topCommentedFilmsComponent, this._mostCommentedFilmsArray);
    this._renderFooterStats();
  }
}
