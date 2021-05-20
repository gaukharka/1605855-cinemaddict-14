import UserRankView from './view/user-rank.js';
import FooterStatsView from './view/footer-stats.js';
import {generateFilmsMock} from './mock/film.js';
import {render} from './utils/render.js';
import FilmCardsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filters-model.js';

const MAX_CARD_COUNT = 15;
const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footer = bodyElement.querySelector('.footer');
const footerElement = footer.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

render(headerElement, new UserRankView(filmsModel.getFilms()), 'beforeend');
render(footerElement, new FooterStatsView(filmsModel.getFilms().length), 'beforeend');

//start
const filmsCardsBoardPresenter = new FilmCardsBoardPresenter(bodyElement, mainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel, filmsCardsBoardPresenter);

filterPresenter.init();
filmsCardsBoardPresenter.init();
