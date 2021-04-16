import AbstractView from './abstract.js';

const createAllFilmsTemplate = () => {
  return `<section class="films">
  </section>`;
};
export default class AllFilms extends AbstractView {
  getTemplate() {
    return createAllFilmsTemplate();
  }
}
