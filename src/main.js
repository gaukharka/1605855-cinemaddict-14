import StatsView from './view/stats.js';
import UserRankView from './view/user-rank.js';
import FooterStatsView from './view/footer-stats.js';
import {remove, render} from './utils/render.js';
import {toast} from './utils/toast.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';
import CommentsModel from './model/comments-model.js';
import { MenuItem, UpdateType } from './const.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic at2we52fv27551e';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const STORE_PREFIX = 'cinemaddict-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
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

const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, filmsModel, filterModel, commentsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, handleSiteMenuClick);

filterPresenter.init();
filmsCardsBoardPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(headerElement, new UserRankView(filmsModel.getFilms()), 'beforeend');
    render(footerElement, new FooterStatsView(filmsModel.getFilms().length), 'beforeend');
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  toast('You are offline');
});
