const createFooterStatsTemplate = (count) => {
  return `<section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    <p>${count.length} movies inside</p>
  </section>`;
};

export {createFooterStatsTemplate};
