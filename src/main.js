import StatsView from './view/stats.js';
import UserRankView from './view/user-rank.js';
import FooterStatsView from './view/footer-stats.js';
// import {generateFilmsMock} from './mock/film.js';
import {remove, render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';
import CommentsModel from './model/comments-model.js';
import { MenuItem, UpdateType } from './const.js';
import Api from './api.js';

// const MAX_CARD_COUNT = 25;
const AUTHORIZATION = 'Basic er2we52fv27551e';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

// const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
// console.log(films)
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commenstModel = new CommentsModel();
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

const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, filmsModel, filterModel, commenstModel, api);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsCardsBoardPresenter.init();

api.getFilms()
  .then((films) => {
    console.log(films);
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
