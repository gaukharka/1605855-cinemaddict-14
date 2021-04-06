// import {createFilmCardTemplate} from './film-card.js';

// const sortByMostCommented = (pictureA, pictureB) => {
//   const commentA = pictureA.comments.length;
//   const commentB = pictureB.comments.length;
//   return commentB - commentA;
// };


const createMostCommentedFilmsTemplate = () => {

  return `<section class="films-list films-list--extra films-list--popular">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container">

  </div>
</section>`;
};

export {createMostCommentedFilmsTemplate};
