import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const { id, poster, title, rating, release, runtime, genre, description, comments, user_details } = film;
  const { watchlist, watched, favorite } = user_details;
  const { date } = release;

  const year = date.getFullYear();

  const watchlistClassName = watchlist
    ? 'film-card__controls-item--active'
    : '';

  const watchedClassName = watched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = favorite
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card" id=${id}>
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    // Привяжем обработчик к контексту
    this._filmClickHandler = this._filmClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _filmClickHandler() {
    // Внутри абстрактного обработчика вызовем колбэк
    this._callback.showFilmDetailPopup();
  }

  setFilmClickHandler(callback) {
    // Колбэк запишем во внутреннее свойство
    this._callback.showFilmDetailPopup = callback;
    // В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._filmClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._filmClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._filmClickHandler);
  }
}
