import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
    this._comments = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          actors: film.film_info.actors,
          ageAllowance: film.film_info.age_rating,
          alternativelTitle: film.film_info.alternative_title,
          description: film.film_info.description,
          director: film.film_info.director,
          genre: film.film_info.genre,
          poster: film.film_info.poster,
          rating: film.film_info.total_rating,
          release: {
            date: film.film_info.release.date,
            film: film.film_info.release.country,
          },
          runtime: film.film_info.runtime,
          title: film.film_info.title,
          writers: film.film_info.writers,
        },
        userDetails: {
          alreadyWatched: film.film_info.already_watched,
          favorite: film.film_info.favorite,
          watchList: film.film_info.watchlist,
          watchingDate: film.film_info.watching_date,
        },
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'filmInfo': {
          'actors': film.filmInfo.actors,
          'age_rating': film.filmInfo.ageAllowance,
          'alternative_title': film.filmInfo.alternativelTitle,
          'description': film.filmInfo.description,
          'director': film.filmInfo.director,
          'genre': film.filmInfo.genre,
          'poster': film.filmInfo.poster,
          'total_rating': film.filmInfo.rating,
          'release': {
            'date': film.filmInfo.release.date,
            'release_country': film.filmInfo.release.country,
          },
          'runtime': film.filmInfo.runtime,
          'title': film.filmInfo.title,
          'writers': film.filmInfo.writers,
        },
        'userDetails': {
          'already_watched': film.filmInfo.alreadyWatched,
          'favorite': film.filmInfo.favorite,
          'watchList': film.filmInfo.watchlist,
          'watching_date': film.filmInfo.watchingDate,
        },
      },
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}
