import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createAllFilmsTemplate} from './view/films.js';
import {createAllFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmSortingElementTemplate} from './view/film-sorting';
import {createStatsTemplate} from './view/stats.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createLoadMoreButton} from './view/load-more-button.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-films.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {generateGenreTemplate} from './view/genres.js';
import {generateGenresContainer} from './view/genres-container.js';
import {createPopupTemplate} from './view/popup.js';
import {createCommentTemplate} from './view/comments.js';
import {createCommentsContainer} from './view/comments-container.js';
import {generateFilmsMock} from './mock/film.js';
import {generateSortedByDateFilms, generateSortedByRatingFilms} from './view/utils.js';
import {generateUserRank} from './mock/rank.js';
import {generateFilmFilters} from './mock/filter.js';

const MAX_CARD_COUNT = 27;
const MAX_CARD_RENDERED = 5;
const MIN_CARD_COUNT = 2;
const FILMS_DISPLAY_STEP = 5;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const userRank = generateUserRank(films);
const filters = generateFilmFilters(films);
const filmsCount = films.length;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');

// Render User Rank, Menu, Sorting
render(headerElement, createUserRankTemplate(userRank), 'beforeEnd');
render(mainElement, createSiteMenuTemplate(filters), 'beforeEnd');
render(mainElement, createFilmSortingElementTemplate(), 'beforeEnd');

// Render Stats
const statsButton = mainElement.querySelector('.main-navigation__additional');

statsButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  render(mainElement, createStatsTemplate(films), 'afterbegin');
});

// Render main page container
render(mainElement, createAllFilmsTemplate(), 'beforeEnd');

const allFilms = mainElement.querySelector('.films');

render(allFilms, createAllFilmsListTemplate(), 'beforeEnd');

const allFilmsList = allFilms.querySelector('.films-list');
const allFilmsListContainer = allFilmsList.querySelector('.films-list__container');

//All film cards
for(let i=0; i< Math.min(films.length, FILMS_DISPLAY_STEP); i++){
  render(allFilmsListContainer, createFilmCardTemplate(films[i]), 'beforeEnd');
}

if(films.length>FILMS_DISPLAY_STEP){
  let displayedFilms = FILMS_DISPLAY_STEP;

  render(allFilmsList, createLoadMoreButton(), 'beforeEnd');

  const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
  loadMoreFilmsButton.addEventListener('click', (evt)=> {
    evt.preventDefault();
    films
      .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
      .forEach((film) => render(allFilmsListContainer, createFilmCardTemplate(film), 'beforeEnd'));

    displayedFilms += FILMS_DISPLAY_STEP;

    if(displayedFilms >= films.length){
      loadMoreFilmsButton.remove();
    }
  });
}

// Sort by date
const sortButtons = mainElement.querySelectorAll('.sort__button');
const sortByDateButton = mainElement.querySelector('.sort__button-date');
const sortedBydateFilms = films.slice().sort(generateSortedByDateFilms);

sortByDateButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByDateButton.classList.add('sort__button--active');

  for(let i=0; i< Math.min(sortedBydateFilms.length, FILMS_DISPLAY_STEP); i++){
    render(allFilmsListContainer, createFilmCardTemplate(sortedBydateFilms[i]), 'beforeEnd');
  }

  if(sortedBydateFilms.length>FILMS_DISPLAY_STEP){
    let displayedFilms = FILMS_DISPLAY_STEP;

    render(allFilmsListContainer, createLoadMoreButton(), 'beforeEnd');

    const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
    loadMoreFilmsButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      sortedBydateFilms
        .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
        .forEach((film) => render(allFilmsListContainer, createFilmCardTemplate(film), 'beforeEnd'));

      displayedFilms += FILMS_DISPLAY_STEP;

      if(displayedFilms >= sortedBydateFilms.length){
        loadMoreFilmsButton.remove();
      }
    });
  }
});

// Sort by rating
const sortByRatingButton = mainElement.querySelector('.sort__button-rating');
const sortedByRatingFilms = films.slice().sort(generateSortedByRatingFilms);

sortByRatingButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByRatingButton.classList.add('sort__button--active');

  for(let i=0; i< Math.min(sortedByRatingFilms.length, FILMS_DISPLAY_STEP); i++){
    render(allFilmsListContainer, createFilmCardTemplate(sortedByRatingFilms[i]), 'beforeEnd');
  }

  if(sortedByRatingFilms.length>FILMS_DISPLAY_STEP){
    let displayedFilms = FILMS_DISPLAY_STEP;

    render(allFilmsListContainer, createLoadMoreButton(), 'beforeEnd');

    const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
    loadMoreFilmsButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      sortedByRatingFilms
        .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
        .forEach((film) => render(allFilmsListContainer, createFilmCardTemplate(film), 'beforeEnd'));

      displayedFilms += FILMS_DISPLAY_STEP;

      if(displayedFilms >= sortedByRatingFilms.length){
        loadMoreFilmsButton.remove();
      }
    });
  }
});

// Popup container
render(bodyElement, createPopupTemplate(films[0]), 'beforeEnd');

// Comments container
const filmDetails = bodyElement.querySelector('.film-details');
const filmDetailsInner = filmDetails.querySelector('.film-details__inner');
const filmDetailsBottomContainer = filmDetailsInner.querySelector('.film-details__bottom-container');
const title = filmDetailsBottomContainer.querySelector('.film-details__comments-title');

render(title, createCommentsContainer(), 'afterend');
const commentsList = filmDetailsBottomContainer.querySelector('.film-details__comments-list');

for(let i=0; i<films[0].comments.length; i++){
  render(commentsList, createCommentTemplate(films[0].comments[i]), 'beforeend');
}

// Genres container
const filmDetailsTopContainer = filmDetailsInner.querySelector('.film-details__top-container');
const filmDetailsInfoContainer = filmDetailsTopContainer.querySelector('.film-details__info');
const filmDetailsTable = filmDetailsInfoContainer.querySelector('.film-details__table');
const filmDetailsRow = filmDetailsTable.querySelector('.film-details__row-genre');

render(filmDetailsRow, generateGenresContainer(), 'beforeend');
const genreList = filmDetailsRow.querySelector('.film-details__cell-genre');

for(let i=0; i<1; i++){
  for(let j=0; j<films[i].filmInfo.genre.length; j++){
    render(genreList, generateGenreTemplate(films[i].filmInfo.genre[j]), 'beforeend');
  }
}

// Top films container
render(allFilms, createTopRatedFilmsTemplate(), 'beforeEnd');

const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

for(let i=0; i< MIN_CARD_COUNT; i++){
  if(sortedByRatingFilms !==0){
    render(topFilmsContainer, createFilmCardTemplate(sortedByRatingFilms[i]), 'beforeEnd');
  }
}

// Most commented films
render(allFilms, createMostCommentedFilmsTemplate(), 'beforeend');
const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

const compareComments = (filmA, filmB) => {
  const commentA = filmA.comments.length;
  const commentB = filmB.comments.length;
  return commentB - commentA;
};

const mostCommentedFilmsArray = films.slice().sort(compareComments);

for(let i=0; i< MIN_CARD_COUNT; i++){
  if(mostCommentedFilmsArray !==0){
    render(mostCommentedFilmsContainer, createFilmCardTemplate(mostCommentedFilmsArray[i]), 'beforeEnd');
  }
}

// Footer stats
render(footerElement, createFooterStatsTemplate(filmsCount), 'beforeend');
