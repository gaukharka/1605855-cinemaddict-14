import UserRankView from './view/user-rank.js';
// import StatsView from './view/stats.js';
import {generateFilmsMock} from './mock/film.js';
import {generateUserRank} from './mock/rank.js';
import {render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';

const MAX_CARD_COUNT = 27;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const userRank = generateUserRank(films);

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const userRankView = new UserRankView(userRank);

// Render User Rank, Menu
render(headerElement, userRankView, 'beforeend');

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

// Render Stats
// siteMenuView.setStatsClickHandler(() => {
//   render(mainElement, new StatsView(films), RenderPosition.AFTERBEGIN);
// });

//start
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, footerElement, filmsModel, filterModel);

filterPresenter.init();
filmsCardsBoardPresenter.init();
