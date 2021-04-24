import { render, replace, remove } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';


export default class FilmCard {
  constructor(filmsListContainer, changeData) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmCardComponent.setFilmClickHandler(this._handleFilmClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this._filmsListContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  _handleFilmClick() {
    const footerElement = document.querySelector('.footer');

    const filmDetailPopupComponent = new FilmDetailsPopupView(this._film);
    footerElement.appendChild(filmDetailPopupComponent.getElement());
    document.body.classList.add('hide-overflow');

    filmDetailPopupComponent.setCloseBtnClickHandler(() => {
      footerElement.removeChild(filmDetailPopupComponent.getElement());
      document.body.classList.remove('hide-overflow');
    });
  }

  _handleWatchlistClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { watchlist: !this._film.user_details.watchlist});

    this._changeData(
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

  _handleWatchedClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { watched: !this._film.user_details.watched});

    this._changeData(
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

  _handleFavoriteClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { favorite: !this._film.user_details.favorite});

    this._changeData(
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

}
