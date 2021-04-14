import SiteMenuView from './view/site-menu.js';
import FilmSortingView from './view/film-sorting';
import FilmCardView from './view/film-card.js';
import GenreContainerView from './view/genres-container.js';
import GenreView from './view/genres.js';
import UserRankView from './view/user-rank.js';
import AllFilmsView from './view/films.js';
import FilmListView from './view/films-list.js';
import CommentsContainerView from './view/comments-container.js';
import CommentView from './view/comments.js';
import StatsView from './view/stats.js';
import TopRatedFilmsView from './view/top-rated-films.js';
import TopCommentedFilmsView from './view/most-commented-films.js';
import FooterStatsView from './view/footer-stats.js';
import LoadMoreButtonView from './view/load-more-button.js';
import PopupView from './view/popup.js';
import {generateFilmsMock} from './mock/film.js';
import {generateUserRank} from './mock/rank.js';
import {generateFilmFilters} from './mock/filter.js';
import {generateSortedByDateFilms, generateSortedByRatingFilms, render, RenderPosition, isEscEvent} from './utils.js';

const MAX_CARD_COUNT = 27;
const MAX_CARD_RENDERED = 5;
const MIN_CARD_COUNT = 2;
const FILMS_DISPLAY_STEP = 5;

const films = new Array(MAX_CARD_COUNT).fill().map(generateFilmsMock);
const userRank = generateUserRank(films);
const filters = generateFilmFilters(films);
const filmsCount = films.length;

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.header');
const mainElement = bodyElement.querySelector('.main');
const footerElement = bodyElement.querySelector('.footer');

// Render User Rank, Menu, Sorting
render(headerElement, new UserRankView(userRank).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new FilmSortingView().getElement(), RenderPosition.BEFOREEND);

// Render Stats
const statsButton = mainElement.querySelector('.main-navigation__additional');

statsButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  render(mainElement, new StatsView(films).getElement(), RenderPosition.AFTERBEGIN);
});

// Render main page container
render(mainElement, new AllFilmsView().getElement(), RenderPosition.BEFOREEND);

const allFilms = mainElement.querySelector('.films');

render(allFilms, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const allFilmsList = allFilms.querySelector('.films-list');
const allFilmsListContainer = allFilmsList.querySelector('.films-list__container');

// Function for rendering film card
const renderFilmCard = (container, films) => {
  const filmCard = new FilmCardView(films);
  const popup = new PopupView(films);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const closePopup = () => {
    popup.getElement().remove;
    popup.removeElement();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  // const openPopup = () => {

  // }
};


//All film cards
for(let i=0; i< Math.min(films.length, FILMS_DISPLAY_STEP); i++){
  render(allFilmsListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if(films.length>FILMS_DISPLAY_STEP){
  let displayedFilms = FILMS_DISPLAY_STEP;

  render(allFilmsList, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
  loadMoreFilmsButton.addEventListener('click', (evt)=> {
    evt.preventDefault();
    films
      .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
      .forEach((film) => render(allFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    displayedFilms += FILMS_DISPLAY_STEP;

    if(displayedFilms >= films.length){
      loadMoreFilmsButton.remove();
    }
  });
}

// Popup container
const filmCard = allFilmsListContainer.querySelectorAll('.film-card');

for(let i=0; i<filmCard.length; i++) {
  filmCard[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    for(let j=0; j<films.length; j++){
      render(bodyElement, new PopupView(films[j]).getElement(), RenderPosition.BEFOREEND);

      // Comments container
      const filmDetails = bodyElement.querySelector('.film-details');
      const filmDetailsInner = filmDetails.querySelector('.film-details__inner');
      const filmDetailsBottomContainer = filmDetailsInner.querySelector('.film-details__bottom-container');
      const title = filmDetailsBottomContainer.querySelector('.film-details__comments-title');

      render(title, new CommentsContainerView().getElement(), RenderPosition.BEFOREBEGIN);
      const commentsList = filmDetailsBottomContainer.querySelector('.film-details__comments-list');

      for(let k=0; k<films[j].comments.length; k++){
        render(commentsList, new CommentView(films[j].comments[k]).getElement(), RenderPosition.BEFOREEND);
      }

      // Genres container
      const filmDetailsTopContainer = filmDetailsInner.querySelector('.film-details__top-container');
      const filmDetailsInfoContainer = filmDetailsTopContainer.querySelector('.film-details__info');
      const filmDetailsTable = filmDetailsInfoContainer.querySelector('.film-details__table');
      const filmDetailsRow = filmDetailsTable.querySelector('.film-details__row-genre');

      render(filmDetailsRow, new GenreContainerView().getElement(), RenderPosition.BEFOREEND);
      const genreList = filmDetailsRow.querySelector('.film-details__cell');

      for(let i=0; i<1; i++){
        for(let j=0; j<films[i].filmInfo.genre.length; j++){
          render(genreList, new GenreView(films[i].filmInfo.genre[j]).getElement(), RenderPosition.AFTERBEGIN);
        }
      }
    }
  });
}

// Sort by date
const sortButtons = mainElement.querySelectorAll('.sort__button');
const sortByDateButton = mainElement.querySelector('.sort__button-date');
const sortedBydateFilms = films.slice().sort(generateSortedByDateFilms);

sortByDateButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByDateButton.classList.add('sort__button--active');

  for(let i=0; i< Math.min(sortedBydateFilms.length, FILMS_DISPLAY_STEP); i++){
    render(allFilmsListContainer, new FilmCardView(sortedBydateFilms[i]).getElement(), RenderPosition.BEFOREEND);
  }

  if(sortedBydateFilms.length>FILMS_DISPLAY_STEP){
    let displayedFilms = FILMS_DISPLAY_STEP;

    render(allFilmsListContainer, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
    loadMoreFilmsButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      sortedBydateFilms
        .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
        .forEach((film) => render(allFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

      displayedFilms += FILMS_DISPLAY_STEP;

      if(displayedFilms >= sortedBydateFilms.length){
        loadMoreFilmsButton.remove();
      }
    });
  }
});

// Sort by rating
const sortByRatingButton = mainElement.querySelector('.sort__button-rating');
const sortedByRatingFilms = films.slice().sort(generateSortedByRatingFilms);

sortByRatingButton.addEventListener('click', () => {
  sortButtons.forEach((button) => {
    button.classList.remove('sort__button--active');
  });
  sortByRatingButton.classList.add('sort__button--active');

  for(let i=0; i< Math.min(sortedByRatingFilms.length, FILMS_DISPLAY_STEP); i++){
    render(allFilmsListContainer, new FilmCardView(sortedByRatingFilms[i]).getElement(), RenderPosition.BEFOREEND);
  }

  if(sortedByRatingFilms.length>FILMS_DISPLAY_STEP){
    let displayedFilms = FILMS_DISPLAY_STEP;

    render(allFilmsListContainer, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    const loadMoreFilmsButton = allFilmsList.querySelector('.films-list__show-more');
    loadMoreFilmsButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      sortedByRatingFilms
        .slice(displayedFilms, displayedFilms + MAX_CARD_RENDERED)
        .forEach((film) => render(allFilmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

      displayedFilms += FILMS_DISPLAY_STEP;

      if(displayedFilms >= sortedByRatingFilms.length){
        loadMoreFilmsButton.remove();
      }
    });
  }
});

// Top films container
render(allFilms, new TopRatedFilmsView().getElement(), RenderPosition.BEFOREEND);

const topFilms = allFilms.querySelector('.films-list--top');
const topFilmsContainer = topFilms.querySelector('.films-list__container');

for(let i=0; i< MIN_CARD_COUNT; i++){
  if(sortedByRatingFilms !==0){
    render(topFilmsContainer, new FilmCardView(sortedByRatingFilms[i]).getElement(), RenderPosition.BEFOREEND);
  }
}

// Most commented films
render(allFilms, new TopCommentedFilmsView().getElement(), 'beforeend');
const mostCommentedFilms = allFilms.querySelector('.films-list--popular');
const mostCommentedFilmsContainer = mostCommentedFilms.querySelector('.films-list__container');

const compareComments = (filmA, filmB) => {
  const commentA = filmA.comments.length;
  const commentB = filmB.comments.length;
  return commentB - commentA;
};

const mostCommentedFilmsArray = films.slice().sort(compareComments);

for(let i=0; i< MIN_CARD_COUNT; i++){
  if(mostCommentedFilmsArray !==0){
    render(mostCommentedFilmsContainer, new FilmCardView(mostCommentedFilmsArray[i]).getElement(), RenderPosition.BEFOREEND);
  }
}

// Footer stats
render(footerElement, new FooterStatsView(filmsCount), RenderPosition.BEFOREEND);
