import AllFilmsView from '../view/films.js';
import FilmListMainView from '../view/films-list.js';
import NoFilms from '../view/no-films.js';
import FilmSortingView from '../view/film-sorting';
import TopRatedFilmsView from '../view/top-rated-films.js';
import TopCommentedFilmsView from '../view/most-commented-films.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import {render, remove} from '../utils/render.js';
import {generateSortedByDateFilms, generateSortedByRatingFilms, compareComments} from '../utils/film.js';
import FilmPresenter from './film.js';

const FILMS_DISPLAY_STEP = 5;
const MIN_CARD_COUNT = 2;
export default class FilmCards {
  constructor(bodyElement, mainElement) {
    this._bodyElement = bodyElement;
    this._mainElement = mainElement;
    this._displayedFilms = FILMS_DISPLAY_STEP;

    this._filmSortingComponent = new FilmSortingView();
    this._allFilmsComponent = new AllFilmsView();
    this._filmListMainComponent = new FilmListMainView();
    this._noFilmsComponent = new NoFilms();
    this._topRatedFilmsComponent = new TopRatedFilmsView();
    this._topCommentedFilmsComponent = new TopCommentedFilmsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films;
    this._initialFilmsSource = films.slice();
    this._sortedBydateFilmsArray = this._initialFilmsSource .slice().sort(generateSortedByDateFilms);
    this._sortedByRatingFilmsArray = this._initialFilmsSource .slice().sort(generateSortedByRatingFilms);
    this._mostCommentedFilmsArray = this._initialFilmsSource .slice().sort(compareComments);

    render(this._mainElement, this._allFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._filmListMainComponent, 'beforeend');
    render(this._allFilmsComponent, this._topRatedFilmsComponent, 'beforeend');
    render(this._allFilmsComponent, this._topCommentedFilmsComponent, 'beforeend');

    this._renderFilmCardBoard();
  }

  _renderSort() {
    this._filmSortingComponent.getElement().remove();
    this._filmSortingComponent.removeElement();
    this._allFilmsComponent.getElement().remove();
    this._allFilmsComponent.removeElement();
    render(this._mainElement, this._filmSortingComponent, 'beforeend');
  }

  _renderFilmCard(container, film) {
    const filmPresenterComponent = new FilmPresenter(this._bodyElement);
    filmPresenterComponent.init(container, film);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(this._filmListMainComponent.getContainer(), film));
  }

  _renderNoFilms() {
    render(this._mainElement, this._noFilmsComponent, 'beforeend');
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

  _renderFilmCardsList() {
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_DISPLAY_STEP));

    if(this._films.length>FILMS_DISPLAY_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderExtraFilmCardsList(container, films) {
    for(let i=0; i< MIN_CARD_COUNT; i++){
      if(films !==0){
        this._renderFilmCard(container.getContainer(), films[i]);
      }
    }
  }

  _renderFilmCardBoard() {
    if(this._films === 0) {
      this._renderNoFilms();
      return;
    }

    // this._renderSort();
    this._renderFilmCardsList();
    this._renderExtraFilmCardsList(this._topRatedFilmsComponent, this._sortedByRatingFilmsArray);
    this._renderExtraFilmCardsList(this._topCommentedFilmsComponent, this._mostCommentedFilmsArray);
  }
}
