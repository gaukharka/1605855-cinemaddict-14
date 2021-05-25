import StatsView from './view/stats.js';
import UserRankView from './view/user-rank.js';
import FooterStatsView from './view/footer-stats.js';
import {generateFilmsMock} from './mock/film.js';
import {remove, render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';
import { MenuItem } from './const.js';

const MAX_CARD_COUNT = 25;
const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.FILMS:
      remove(statsComponent);
      filmsCardsBoardPresenter.destroy();
      filmsCardsBoardPresenter.init();
      break;
    case MenuItem.STATS:
      remove(statsComponent);
      filmsCardsBoardPresenter.destroy();
      statsComponent = new StatsView(filmsModel.getFilms());
      render(mainElement, statsComponent, 'beforeend');
      break;
  }
};

render(headerElement, new UserRankView(filmsModel.getFilms()), 'beforeend');
render(footerElement, new FooterStatsView(filmsModel.getFilms().length), 'beforeend');

const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsCardsBoardPresenter.init();
