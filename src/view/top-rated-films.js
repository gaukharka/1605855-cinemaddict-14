import {createFilmCardTemplate} from './film-card.js';

const maxValue = (array) => {
  const topRatedFilms = Math.max(...array);
  return topRatedFilms;
};

const newArray = new Array(2).fill().map(createFilmCardTemplate(maxValue));

const createTopRatedFilmsTemplate = () => {

  return `<section class="films-list films-list--extra films-list--top">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  ${newArray}
  </div>
</section>`;
};

export {createTopRatedFilmsTemplate};
