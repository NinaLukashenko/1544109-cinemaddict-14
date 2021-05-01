import SmartView from './smart.js';
import { humanizeDate, DateFormat } from '../utils/date.js';
import { COMMENTS } from '../mock/film.js';

const createFilmDetailsPopupTemplate = (filmState) => {
  const {
    poster,
    title,
    alternative_title,
    rating,
    runtime,
    genre,
    description,
    user_details,
    director,
    writers,
    actors,
    release,
    age_rating,
    comments,
    currentEmotion,

  } = filmState;
  const { watchlist, watched, favorite } = user_details;
  const { date, country } = release;

  const createGenreLabel = () => {
    return genre.length > 1 ? 'Genres' : 'Genre';
  };

  const createGenreTemplate = () => {
    return genre.reduce((prev, item) => {
      return `${prev}
              <span class="film-details__genre">${item}</span>`;
    }, '');
  };

  const createList = (people) => {
    return people.reduce((prev, item, index) => {
      if (index === people.length - 1) {
        return `${prev}${item}`;
      } else {
        return `${prev}${item}, `;
      }
    }, '');
  };

  const createCommentTemplate = () => {
    return COMMENTS.reduce((prev, item) => {
      if (comments.includes(item.id)) {
        return `
            ${prev}
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-${item.emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${item.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${item.author}</span>
                  <span class="film-details__comment-day">${humanizeDate(item.date, DateFormat.DATETIME)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
        `;
      } else {
        return `
            ${prev}`;
      }
    }, '');
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${age_rating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${createList(writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${createList(actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeDate(date, DateFormat.DATE)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${createGenreLabel()}</td>
              <td class="film-details__cell">
                ${createGenreTemplate()}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? 'checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentTemplate()}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${currentEmotion ? `<img src="images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji-${currentEmotion}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetailsPopup extends SmartView {
  constructor(film) {
    super();
    this._filmState = FilmDetailsPopup.parseFilmToFilmState(film);
    // Привяжем обработчик к контексту
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._filmState);
  }

  restoreHandlers() {

  }

  _closeBtnClickHandler() {
    // Внутри абстрактного обработчика вызовем колбэк
    this._callback.closeBtnClick();
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
  }

  _watchedClickHandler() {
    this._callback.watchedClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  setCloseBtnClickHandler(callback) {
    // Колбэк запишем во внутреннее свойство
    this._callback.closeBtnClick = callback;
    // В addEventListener передадим абстрактный обработчик
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeBtnClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._favoriteClickHandler);
  }

  static parseFilmToFilmState(film) {
    return Object.assign({}, film, { currentEmotion: null });
  }

  static parseFilmStateToFilm(filmState) {
    filmState = Object.assign({}, filmState);

    if (filmState.currentEmotion !== null) {
      document.querySelector('.film-details__emoji-item').value = filmState.currentEmotion;
    }

    delete filmState.currentEmotion;

    return filmState;
  }
}
