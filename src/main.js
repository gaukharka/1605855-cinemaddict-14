import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import StatsView from './view/stats.js';
import FooterStatsView from './view/footer-stats.js';
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
const filmsCount = films.length;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');
const siteMenuView = new SiteMenuView(filters);
const userRankView = new UserRankView(userRank);
const footerStatsView = new FooterStatsView(filmsCount);

// Render User Rank, Menu, Sorting
render(headerElement, userRankView, 'beforeend');
render(mainElement, siteMenuView, 'beforeend');

// Render Stats
siteMenuView.setStatsClickHandler(() => {
  render(mainElement, new StatsView(films), RenderPosition.AFTERBEGIN);
});

//start
const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement);
filmsCardsBoardPresenter.init(films);

render(footerElement, footerStatsView, RenderPosition.BEFOREEND);
