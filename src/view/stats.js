import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {generateHour, generateMinutes, generateWatchedFilmsArray} from '../utils/stats.js';
import {generateUserRank} from '../mock/rank.js';

const createStatsChart = () => {
  const BAR_HEIGHT = 50;
  const statisticCtx = this.getElement().querySelector('.statistic__chart');

  statisticCtx.height = BAR_HEIGHT * 5;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: generateGenres(), // should be dynamic
      datasets: [{
        data: generateWatchedFilmsArray(),    // should be dynamic
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

const createStatsTemplate = (films) => {

  const historyArray = films.filter((film) => film.userDetails.alreadyWatched);
  const history = historyArray.length;
  const runtimeArray = historyArray.map((film) => film.filmInfo.runtime);
  const runtime = runtimeArray.reduce((runtimeA, runtimeB) => runtimeA + runtimeB);
  const hour = generateHour(runtime);
  const minute = generateMinutes(runtime);
  const topGenreArray = historyArray.map((film) => film.filmInfo.genre).flat();
  const getTopGenre = (films) => {
    return films.sort((genreA, genreB) =>
      films.filter((film) => film===genreA).length
      - films.filter((film) => film===genreB).length).pop();
  };

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${generateUserRank(historyArray)}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
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
      <p class="statistic__item-text">${getTopGenre(topGenreArray)}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000">${createStatsChart}</canvas>
  </div>

</section>`;
};

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;

    this._setChart();
  }

  getTemplate() {
    return createStatsTemplate(this._films);
  }

  _handleFilterChange(){
    // filter change callback
  }

  _setInnerChangeHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._handleFilterChange);
  }

  restoreHandlers() {
    this._setInnerChangeHandlers();
    this._setCharts();
  }

  _setChart() {
    if(this._chart !== null){
      this._chart = null;
    }

  }
}
