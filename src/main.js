import SiteMenuView from './view/site-menu.js';
import FilmSortingView from './view/film-sorting';
import FilmCardView from './view/film-card.js';
import UserRankView from './view/user-rank.js';
import AllFilmsView from './view/films.js';
import FilmListMainView from './view/films-list.js';
import StatsView from './view/stats.js';
import TopRatedFilmsView from './view/top-rated-films.js';
import TopCommentedFilmsView from './view/most-commented-films.js';
import FooterStatsView from './view/footer-stats.js';
import LoadMoreButtonView from './view/load-more-button.js';
import PopupView from './view/popup.js';
import {generateFilmsMock} from './mock/film.js';
import {generateUserRank} from './mock/rank.js';
import {generateFilmFilters} from './mock/filter.js';
import {generateSortedByDateFilms, generateSortedByRatingFilms, compareComments, isEscEvent} from './utils/film.js';
import {render, remove, RenderPosition} from './utils/render.js';

const MAX_CARD_COUNT = 27;
const MAX_CARD_RENDERED = 5;
const MIN_CARD_COUNT = 2;
const FILMS_DISPLAY_STEP = 5;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const userRank = generateUserRank(films);
const filters = generateFilmFilters(films);
const filmsCount = films.length;
const sortedBydateFilmsArray = films.slice().sort(generateSortedByDateFilms);
const sortedByRatingFilmsArray = films.slice().sort(generateSortedByRatingFilms);
const mostCommentedFilmsArray = films.slice().sort(compareComments);

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const siteMenuView = new SiteMenuView(filters);
const userRankView = new UserRankView(userRank);
const filmSortingView = new FilmSortingView();
const showMoreButton = new LoadMoreButtonView();
const allFilmsView = new AllFilmsView();
const filmListMainView = new FilmListMainView();
const topRatedFilmsView = new TopRatedFilmsView();
const topCommentedFilmsView = new TopCommentedFilmsView();
const footerStatsView = new FooterStatsView(filmsCount);

// Render User Rank, Menu, Sorting
render(headerElement, userRankView, RenderPosition.BEFOREEND);
render(mainElement, siteMenuView, RenderPosition.BEFOREEND);
render(mainElement, filmSortingView, RenderPosition.BEFOREEND);

// Render Stats
siteMenuView.setStatsClickHandler(() => {
  render(mainElement, new StatsView(films), RenderPosition.AFTERBEGIN);
});

// Render main page container
render(mainElement, allFilmsView, RenderPosition.BEFOREEND);
const allFilms = mainElement.querySelector('.films');
render(allFilms, filmListMainView.getElement(), RenderPosition.BEFOREEND);
const allFilmsListMain = allFilms.querySelector('.films-list--main');
const allFilmsListMainContainer = allFilmsListMain.querySelector('.films-list__container');

// Render top rated films container
render(allFilms, topRatedFilmsView, RenderPosition.BEFOREEND);
const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

// Render most commented films container
render(allFilms, topCommentedFilmsView, RenderPosition.BEFOREEND);
const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

// Function for rendering film card
const renderFilmCard = (container, films) => {
  const filmCard = new FilmCardView(films);
  const popup = new PopupView(films);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onClickClosePopup = () => {
    closePopup();
  };

  const closePopup = () => {
    popup.getElement().remove();
    popup.removeElement();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  const openPopup = () => {
    render(bodyElement, popup, RenderPosition.BEFOREEND);
    popup.setCloseButtonClickHandler(() => onClickClosePopup());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  filmCard.setPosterClickHandler(() => openPopup());
  filmCard.setTitleClickHandler(() => openPopup());
  filmCard.setCommentClickHandler(() => openPopup());
  render(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

// Function to show more films
const showMoreFilms = (films) => {
  let displayedFilms = FILMS_DISPLAY_STEP;

  render(allFilmsListMain, showMoreButton, RenderPosition.BEFOREEND);
  showMoreButton.setLoadMoreButtonClickHandler(() => {
    films
      .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
      .forEach((film) => renderFilmCard(allFilmsListMainContainer, film));

    displayedFilms += FILMS_DISPLAY_STEP;

    if(displayedFilms >= films.length){
      remove(showMoreButton);
    }
  });
};

//Function for rendering all film cards
const renderFilmCards = (filmsData) => {
  allFilmsListMainContainer.innerHTML = '';
  showMoreFilms.remove;

  for(let i=0; i< Math.min(filmsData.length, FILMS_DISPLAY_STEP); i++){
    renderFilmCard(allFilmsListMainContainer, filmsData[i]);
  }

  if(films.length>FILMS_DISPLAY_STEP) {
    showMoreFilms(filmsData);
  }
};

// Function for rendering extra films
const renderExtraFilmCards = (container, filmsData) => {
  for(let i=0; i< MIN_CARD_COUNT; i++){
    if(filmsData !==0){
      renderFilmCard(container, filmsData[i]);
    }
  }
};

// Function for rendering Sort by Default, by Date, by Ratings
const renderSorting = (sortingButton, sort) => {
  sortingButton.addEventListener('click', () => {
    sortButtons.forEach((button) => {
      button.classList.remove('sort__button--active');
    });
    sortingButton.classList.add('sort__button--active');
    renderFilmCards(sort);
  });
};

const sortButtons = filmSortingView.getSortButton();
const sortByDefaultButton = filmSortingView.getSortByDefaultButton();
const sortByDateButton = filmSortingView.getSortByDateButton();
const sortByRatingButton = filmSortingView.getSortByRateButton();

renderSorting(sortByDefaultButton, films);
renderSorting(sortByDateButton, sortedBydateFilmsArray);
renderSorting(sortByRatingButton, sortedByRatingFilmsArray);
renderFilmCards(films);
renderExtraFilmCards(topFilmsContainer, sortedByRatingFilmsArray);
renderExtraFilmCards(mostCommentedFilmsContainer, mostCommentedFilmsArray);
render(footerElement, footerStatsView, RenderPosition.BEFOREEND);
