import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((item) => item.id === update.id);

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
    // Film Info
    const adaptedFilmInfo = Object.assign(
      {},
      film.film_info,
      {
        alternativeTitle:  film.film_info.alternative_title,
        rating:  film.film_info.total_rating,
        ageRating:  film.film_info.age_rating,
      },
    );

    const adaptedRelease = Object.assign(
      {},
      film.film_info.release,
      {
        country: film.film_info.release.release_country,
        date: new Date(film.film_info.release.date),
      },
    );

    adaptedFilmInfo.release = adaptedRelease;
    delete adaptedFilmInfo.release.release_country;


    // Ненужные ключи удаляем
    delete adaptedFilmInfo.alternative_title;
    delete adaptedFilmInfo.total_rating;
    delete adaptedFilmInfo.age_rating;

    // User Details
    const adaptedUserDetails = Object.assign(
      {},
      film.user_details,
      {
        watched:  film.user_details.already_watched,
      },
    );

    // Ненужные ключи удаляем
    delete adaptedUserDetails.already_watched;

    // Film
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: adaptedFilmInfo,
        userDetails: adaptedUserDetails,
      },
    );

    // Ненужные ключи удаляем
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    // Film Info
    const adaptedFilmInfo = Object.assign(
      {},
      film.filmInfo,
      {
        alternative_title:  film.filmInfo.alternativeTitle,
        total_rating:  film.filmInfo.rating,
        age_rating:  film.filmInfo.ageRating,
      },
    );

    const adaptedRelease = Object.assign(
      {},
      film.filmInfo.release,
      {
        release_country: film.filmInfo.release.country,
        date: film.filmInfo.release.date.toISOString(),
      },
    );

    adaptedFilmInfo.release = adaptedRelease;

    // Ненужные ключи удаляем
    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.rating;
    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.release.country;

    // User Details
    const adaptedUserDetails = Object.assign(
      {},
      film.userDetails,
      {
        already_watched:  film.userDetails.watched,
      },
    );

    // Ненужные ключи удаляем
    delete adaptedUserDetails.watched;

    // Film
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        film_info: adaptedFilmInfo,
        user_details: adaptedUserDetails,
      },
    );

    // Ненужные ключи удаляем
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }

}
