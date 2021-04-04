
// const isTopRated = () => {
//   const mainElement = document.querySelector('.main');
//   const filmList = mainElement.querySelector('.films-list--extra');
//   const title = filmList.querySelector('.films-list__title').innerHTML;
//   return title === 'Top rated' ? true : false;
// };

// const sortByMaxValue = (filmA, filmB) => {
//   const valueA = filmA.comments.length;
//   const valueB = filmB.comments.length;
//   return valueB - valueA;
// };

// const filmRating = isTopRated() === true ? sortByMaxValue() : rating ;


const createTopRatedFilmsTemplate = () => {


  return `<section class="films-list films-list--extra films-list--top">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

export {createTopRatedFilmsTemplate};
