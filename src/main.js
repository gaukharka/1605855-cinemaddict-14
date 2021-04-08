import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createAllFilmsTemplate} from './view/films.js';
import {createAllFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmSortingElement} from './view/film-sorting';
import {createStatsTemplate} from './view/stats.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createLoadMoreButton} from './view/load-more-button.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-films.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {createPopupTemplate} from './view/popup.js';
import {createCommentTemplate} from './view/comments.js';
import {createCommentsContainer} from './view/comments-container.js';
import {generateFilmsMock, generateCommentsMocks} from './mock/film.js';
import {generateFilmFilters, generateSortedByDateFilms} from './view/utils.js';

const MAX_CARD_COUNT = 27;
const MAX_CARD_RENDERED = 5;
const MIN_CARD_COUNT = 2;
const FILMS_DISPLAY_STEP = 5;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const comments = generateCommentsMocks();
console.log(films);
console.log(comments);
const filters = generateFilmFilters(films);
console.log(filters)

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

render(headerElement, createUserRankTemplate(), 'beforeEnd');
render(mainElement, createSiteMenuTemplate(filters), 'beforeEnd');
render(mainElement, createFilmSortingElement(), 'beforeEnd');

// Stats
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
console.log(sortedBydateFilms);

const isButtonActive = (button) => {
  for(let i=0; i<button.length; i++){
    button.classList.contains('sort__button--active') ? true : false;
  }
};

sortByDateButton.addEventListener('click', (evt) => {
  isButtonActive(sortButtons) === true ? sortButtons.classList.remove('sort__button--active');
  sortByDateButton.classList.add('sort__button--active')

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


// Popup container
// for(let i=0; i<1; i++){
//   render(bodyElement, createPopupTemplate(films[i]), 'beforeEnd');
// }

// Comments container
// const filmDetails = bodyElement.querySelector('.film-details');
// const filmDetailsInner = filmDetails.querySelector('.film-details__inner');
// const filmDetailsBottomContainer = filmDetailsInner.querySelector('.film-details__bottom-container');
// const title = filmDetailsBottomContainer.querySelector('.film-details__comments-title');

// render(title, createCommentsContainer(), 'afterend');
// const commentsList = filmDetailsBottomContainer.querySelector('.film-details__comments-list');

// for(let i=0; i<comments.length; i++){
//   render(commentsList, createCommentTemplate(comments[i]), 'beforeend');
// }

// Top films container
render(allFilms, createTopRatedFilmsTemplate(), 'beforeEnd');

const compareRatings = (filmA, filmB) => {
  const ratingA = filmA.filmInfo.rating;
  const ratingB = filmB.filmInfo.rating;
  return ratingB - ratingA;
};

const topRatedFilms = [films.slice().sort(compareRatings)];

const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

for(let i; i< MIN_CARD_COUNT; i++){
  render(topFilmsContainer, createFilmCardTemplate(topRatedFilms[i]), 'beforeEnd');
}

// Most commented films
render(allFilms, createMostCommentedFilmsTemplate(), 'beforeend');

const compareComments = (filmA, filmB) => {
  const commentA = filmA.comments.length;
  const commentB = filmB.comments.length;
  return commentB - commentA;
};

const mostCommentedFilmsArray = [films.slice().sort(compareComments)];

const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

for(let i; i< MIN_CARD_COUNT; i++){
  render(mostCommentedFilmsContainer, createFilmCardTemplate(mostCommentedFilmsArray[i]), 'beforeend');
}

// Footer stats
render(footerElement, createFooterStatsTemplate(films), 'beforeend');
