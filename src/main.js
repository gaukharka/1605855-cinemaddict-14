import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createFilmsTemplate} from './view/films.js';
import {createPopupTemplate} from './view/popup.js';
import {createSortingElement} from './view/list-sort';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortingElement(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');
// render(siteMainElement, createPopupTemplate(), 'beforeend');
