import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import StatsView from './view/stats.js';
import {generateFilmsMock} from './mock/film.js';
import {generateUserRank} from './mock/rank.js';
import {generateFilmFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';

const MAX_CARD_COUNT = 27;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
console.log(films);
const userRank = generateUserRank(films);
const filters = generateFilmFilters(films);

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const siteMenuView = new SiteMenuView(filters);
const userRankView = new UserRankView(userRank);

// Render User Rank, Menu
render(headerElement, userRankView, 'beforeend');
render(mainElement, siteMenuView, 'beforeend');

// Render Stats
siteMenuView.setStatsClickHandler(() => {
  render(mainElement, new StatsView(films), RenderPosition.AFTERBEGIN);
});

//start
const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, footerElement);
filmsCardsBoardPresenter.init(films);
