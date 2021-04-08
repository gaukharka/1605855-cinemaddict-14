export const createFilmSortingElement = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button-default">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button-rating sort__button--active">Sort by rating</a></li>
</ul>`;
};
