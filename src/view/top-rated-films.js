// import {createFilmCardTemplate} from './film-card.js';

// const sortByMaxValue = (filmA, filmB) => {
//   const valueA = filmA.comments.length;
//   const valueB = filmB.comments.length;
//   return valueB - valueA;
// };

// const getTopRatedFilms = (film) => {

//   return film.slice().sort(sortByMaxValue)
// };

// const topRatedFilms = new Array(2).fill().map(getTopRatedFilms(film));

// const topRatedFilm = createFilmCardTemplate(topRatedFilms);

const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra films-list--top">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

export {createTopRatedFilmsTemplate};
