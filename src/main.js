import StatsView from './view/stats.js';
import SiteMenuView from './view/site-menu.js';
import {generateFilmsMock} from './mock/film.js';
import {render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';
import { MenuItem } from './const.js';

const MAX_CARD_COUNT = 11;
const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

// const siteMenuComponent = new SiteMenuView();
// const statsComponent = new StatsView();

// Render User Rank, Menu
// render(headerElement, siteMenuComponent, 'beforeend');

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

// const handleSiteMenuClick = (menuItem) => {
//   switch(menuItem) {
//     case MenuItem.FILMS:
//       // dddfd
//       break;
//     case MenuItem.STATS:
//       // dddd
//       break;
//   }
// };

// siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

// Render Stats
// siteMenuView.setStatsClickHandler(() => {
//   render(mainElement, new StatsView(films), RenderPosition.AFTERBEGIN);
// });

//start
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(headerElement, bodyElement, mainElement, footerElement, filmsModel, filterModel);

filterPresenter.init();
filmsCardsBoardPresenter.init();
