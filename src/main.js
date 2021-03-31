import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createAllFilmsTemplate} from './view/films.js';
import {createAllFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmSortingElement} from './view/film-sorting';
import {createStatsTemplate} from './view/stats.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {createLoadMoreButton} from './view/load-more-button.js';
import {createToRatedFilmsTemplate} from './view/top-rated-films.js';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films.js';
import {createPopupTemplate} from './view/popup.js';


const MAX_CARD_COUNT = 5;
const MIN_CARD_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderAllFilms = (container, template, place, count) => {
  for(let i=0; i<count; i++){
    container.insertAdjacentHTML(place, template);
  }
};

const bodyElement = document.querySelector('body');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

// render(bodyElement, createPopupTemplate(), 'beforeend');
render(headerElement, createUserRankTemplate(), 'beforeend');
render(mainElement, createSiteMenuTemplate(), 'beforeend');
render(mainElement, createFilmSortingElement(), 'beforeend');
render(mainElement, createStatsTemplate(), 'beforeend');
render(mainElement, createAllFilmsTemplate(), 'beforeend');

const allFilms = mainElement.querySelector('.films');

render(allFilms, createAllFilmsListTemplate(), 'beforeend');

const allFilmsList = allFilms.querySelector('.films-list');
const allFilmsListContainer = allFilmsList.querySelector('.films-list__container');

renderAllFilms(allFilmsListContainer, createFilmCardTemplate(), 'beforeend', MAX_CARD_COUNT);
render(allFilmsList, createLoadMoreButton(), 'beforeend');
render(allFilms, createToRatedFilmsTemplate(), 'beforeend');

const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

renderAllFilms(topFilmsContainer, createFilmCardTemplate(), 'beforeend', MIN_CARD_COUNT);
render(allFilms, createMostCommentedFilmsTemplate(), 'beforeend');

const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

renderAllFilms(mostCommentedFilmsContainer, createFilmCardTemplate(), 'beforeend', MIN_CARD_COUNT);

render(footerElement, createFooterStatsTemplate(), 'beforeend');
