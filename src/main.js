import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createAllFilmsTemplate} from './view/films.js';
import {createAllFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmSortingElement} from './view/film-sorting';
// import {createStatsTemplate} from './view/stats.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createLoadMoreButton} from './view/load-more-button.js';
import {createTopRatedFilmsTemplate} from './view/top-rated-films.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {createPopupTemplate} from './view/popup.js';
import {createCommentTemplate} from './view/comments.js';
import {generateFilmCard, generateFilmPopup} from './mock/film.js';

const MAX_CARD_COUNT = 15;
const MIN_CARD_COUNT = 2;
const POPUP_COUNT = 1;

const film = new Array(MAX_CARD_COUNT).fill().map(generateFilmCard);
// const filmInfo = new Array(1).fill().map(generateFilmPopup);
const filmInfo = generateFilmPopup();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

// for(let i=0; i<1; i++){
//   render(bodyElement, createPopupTemplate(filmInfo[i]), 'beforeEnd');
// }

render(bodyElement, createPopupTemplate(filmInfo), 'beforeEnd');

render(headerElement, createUserRankTemplate(), 'beforeEnd');
render(mainElement, createSiteMenuTemplate(), 'beforeEnd');
render(mainElement, createFilmSortingElement(), 'beforeEnd');
// render(mainElement, createStatsTemplate(), 'beforeEnd');
render(mainElement, createAllFilmsTemplate(), 'beforeEnd');

const allFilms = mainElement.querySelector('.films');

render(allFilms, createAllFilmsListTemplate(), 'beforeEnd');

const allFilmsList = allFilms.querySelector('.films-list');
const allFilmsListContainer = allFilmsList.querySelector('.films-list__container');

for(let i=0; i< 5; i++){
  render(allFilmsListContainer, createFilmCardTemplate(film[i]), 'beforeEnd');
}

render(allFilmsList, createLoadMoreButton(), 'beforeEnd');

// Comments container
const filmDetails = bodyElement.querySelector('.film-details');
const filmDetailsBottomContainer = filmDetails.querySelector('.film-details__bottom-container');
const commentsList = filmDetailsBottomContainer.querySelector('.film-details__comments-list');

render(commentsList, createCommentTemplate(filmInfo), 'beforeend');

// Top films
render(allFilms, createTopRatedFilmsTemplate(), 'beforeEnd');

const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

for(let i; i< MIN_CARD_COUNT; i++){
  render(topFilmsContainer, createFilmCardTemplate(film[i]), 'beforeEnd');
}

// Most commented films
render(allFilms, createMostCommentedFilmsTemplate(), 'beforeend');

const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

for(let i; i< MIN_CARD_COUNT; i++){
  render(mostCommentedFilmsContainer, createFilmCardTemplate(film[i]), 'beforeend');
}
render(footerElement, createFooterStatsTemplate(), 'beforeend');
