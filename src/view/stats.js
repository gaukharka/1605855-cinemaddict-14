import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {generateHour, generateMinutes, makeItemsUniq} from '../utils/stats.js';
import {generateUserRank} from '../mock/rank.js';
import {StatsFilter} from '../const.js';
import dayjs from 'dayjs';

const calculateGenres = (films) => {

  const genreValueArray = films.map((film) => film.filmInfo.genre).flat();
  const uniqueGenres = makeItemsUniq(genreValueArray);
  const filmsByGenresCount = uniqueGenres.map((genre) => {
    return {
      genre,
      count: films.filter((film) => film.filmInfo.genre.includes(genre)).length,
    };
  });
  const sortedFilms = filmsByGenresCount.sort((a, b) => b.count - a.count);
  return sortedFilms ? sortedFilms : [];
};

export const generateFilteredFilms = ({films, currentPeriod}) => {

  const watchedFilms = films.filter((film) => film.userDetails.alreadyWatched);
  if (currentPeriod === StatsFilter.ALL_TIME) {
    return watchedFilms;
  }

  return watchedFilms
    .slice()
    .filter((film) => dayjs(film.userDetails.watchingDate).isSame(dayjs(), currentPeriod));
};

const createStatsChart = (statisticCtx, data) => {

  const filteredFilms = generateFilteredFilms(data);
  console.log(filteredFilms)
  const genresCount = calculateGenres(filteredFilms);
  const genres = genresCount.map((genresCount) => genresCount.genre);
  const count = genresCount.map((genresCount) => genresCount.count);

  const BAR_HEIGHT = 50;
  statisticCtx.style.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: count,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = (data) => {

  const {currentPeriod} = data;
  const filteredFilms = generateFilteredFilms(data);
  const newD = dayjs();
  console.log(newD)
  // console.log(filteredFilms);
  const userRank = generateUserRank(filteredFilms);
  const history = filteredFilms.length;
  const runtimeArray = filteredFilms.map((film) => film.filmInfo.runtime);
  const runtime = filteredFilms.length ? runtimeArray.reduce((runtimeA, runtimeB) => runtimeA + runtimeB) : '';
  const hour = generateHour(runtime);
  const minute = generateMinutes(runtime);
  const genreArray = filteredFilms.map((film) => film.filmInfo.genre).flat();
  const getTopGenre = filteredFilms.length ? genreArray
    .slice()
    .sort((genreA, genreB) => genreArray.filter((film) => film===genreA).length - genreArray.filter((film) => film===genreB).length).pop() : '';
  // console.log(genreArray)
  // console.log(getTopGenre)

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatsFilter.ALL_TIME}" value="${StatsFilter.ALL_TIME}" ${currentPeriod === StatsFilter.ALL_TIME ? ' checked' : ''}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatsFilter.TODAY}" value="${StatsFilter.TODAY}" ${currentPeriod === StatsFilter.TODAY ? ' checked' : ''}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatsFilter.WEEK}" value="${StatsFilter.WEEK}" ${currentPeriod === StatsFilter.WEEK ? ' checked' : ''}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatsFilter.MONTH}" value="${StatsFilter.MONTH}" ${currentPeriod === StatsFilter.MONTH ? ' checked' : ''}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatsFilter.YEAR}" value="${StatsFilter.YEAR}" ${currentPeriod === StatsFilter.YEAR ? ' checked' : ''}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${history} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${hour} <span class="statistic__item-description">h</span> ${minute} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${getTopGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;
    this._data = {
      films: this._films,
      currentPeriod: StatsFilter.ALL_TIME,  // month, year, week worked, today not working
    };
    this._chart = null;
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._setInnerChangeHandlers();
    this._setChart();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  _handleFilterChange(evt){
    evt.preventDefault();
    this.updateState({
      currentPeriod: evt.target.value,
    });
  }

  _setInnerChangeHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._handleFilterChange);
  }

  restoreHandlers() {
    this._setChart();
    this._setInnerChangeHandlers();
  }

  _setChart() {
    if(this._chart !== null) {
      this._chart = null;
    }

    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._chart = createStatsChart(statisticCtx, this._data);
  }
}
