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
import {generateSortedByDateFilms, generateSortedByRatingFilms, compareComments, render, RenderPosition, isEscEvent} from './utils.js';

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

// Render User Rank, Menu, Sorting
render(headerElement, new UserRankView(userRank).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmSortingView().getElement(), RenderPosition.BEFOREEND);

// Render Stats
const statsButton = mainElement.querySelector('.main-navigation__additional');

statsButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  render(mainElement, new StatsView(films).getElement(), RenderPosition.AFTERBEGIN);
});

// Render main page container
render(mainElement, new AllFilmsView().getElement(), RenderPosition.BEFOREEND);
const allFilms = mainElement.querySelector('.films');
render(allFilms, new FilmListMainView().getElement(), RenderPosition.BEFOREEND);
const allFilmsListMain = allFilms.querySelector('.films-list--main');
const allFilmsListMainContainer = allFilmsListMain.querySelector('.films-list__container');

// Render top rated films container
render(allFilms, new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);
const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

// Render most commented films container
render(allFilms, new TopCommentedFilmsView().getElement(), RenderPosition.BEFOREEND);
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

  const onClickClosePopup = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const closePopup = () => {
    popup.getElement().remove();
    popup.removeElement();
    document.body.classList.add('hide-overflow');
    popup.getCloseButton().removeEventListener('click', onClickClosePopup);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  const openPopup = () => {
    render(bodyElement, popup.getElement(), RenderPosition.BEFOREEND);
    popup.getCloseButton().addEventListener('click', onClickClosePopup);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  filmCard.getPoster().addEventListener('click', openPopup);
  filmCard.getTitle().addEventListener('click', openPopup);
  filmCard.getComment().addEventListener('click', openPopup);
  render(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

//Function for rendering all film cards
const renderFilmCards = (filmsData) => {
  allFilmsListMainContainer.innerHTML = '';

  for(let i=0; i< Math.min(filmsData.length, FILMS_DISPLAY_STEP); i++){
    renderFilmCard(allFilmsListMainContainer, filmsData[i]);
  }

  if(filmsData.length>FILMS_DISPLAY_STEP) {
    let displayedFilms = FILMS_DISPLAY_STEP;

    render(allFilmsListMain, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const loadMoreFilmsButton = allFilmsListMain.querySelector('.films-list__show-more');
    loadMoreFilmsButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      filmsData
        .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
        .forEach((film) => renderFilmCard(allFilmsListMainContainer, film));

      displayedFilms += FILMS_DISPLAY_STEP;

      if(displayedFilms >= filmsData.length){
        loadMoreFilmsButton.remove();
      }
    });
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

// Sort by date
const sortButtons = mainElement.querySelectorAll('.sort__button');
const sortByDateButton = mainElement.querySelector('.sort__button-date');

sortByDateButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByDateButton.classList.add('sort__button--active');
  allFilmsListMain.querySelector('.films-list__container').innerHTML = '';
  renderFilmCards(sortedBydateFilmsArray);
});

// Sort by rating
const sortByRatingButton = mainElement.querySelector('.sort__button-rating');

sortByRatingButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByRatingButton.classList.add('sort__button--active');
  allFilmsListMain.querySelector('.films-list__container').innerHTML = '';
  renderFilmCards(sortedByRatingFilmsArray);
});

renderFilmCards(films);
renderExtraFilmCards(topFilmsContainer, sortedByRatingFilmsArray);
renderExtraFilmCards(mostCommentedFilmsContainer, mostCommentedFilmsArray);
render(footerElement, new FooterStatsView(filmsCount).getElement(), RenderPosition.BEFOREEND);
