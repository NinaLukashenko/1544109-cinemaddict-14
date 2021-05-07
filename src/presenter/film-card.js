import { render, replace, remove } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';
import { UserAction, UpdateType } from '../const.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'POPUP',
};

export default class FilmCard {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._mode = Mode.DEFAULT;
    this._filmPopup = {};

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
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

  destroy() {
    remove(this._filmCardComponent);
  }

  _handleFilmClick() {
    const footerElement = document.querySelector('.footer');

    this._changeMode();
    this._mode = Mode.POPUP;
    const filmDetailPopupComponent = new FilmDetailsPopupView(this._film);
    this._filmPopup[this._film.id] = filmDetailPopupComponent;

    filmDetailPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    filmDetailPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    filmDetailPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    filmDetailPopupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);


    footerElement.appendChild(filmDetailPopupComponent.getElement());
    document.body.classList.add('hide-overflow');

    filmDetailPopupComponent.setCloseBtnClickHandler(() => {
      footerElement.removeChild(filmDetailPopupComponent.getElement());
      document.body.classList.remove('hide-overflow');
    });
  }

  _closePopup() {
    remove(this._filmPopup[this._film.id]);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleWatchlistClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { watchlist: !this._film.user_details.watchlist});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

  _handleWatchedClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { watched: !this._film.user_details.watched});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

  _handleFavoriteClick() {
    const newUserDetails = Object.assign({}, this._film.user_details, { favorite: !this._film.user_details.favorite});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { user_details: newUserDetails }),
    );
  }

  _handleDeleteCommentClick(id) {
    const currentComments = this._film.comments.slice().filter((item) => {
      return item !== Number(id);
    });
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { comments: currentComments }),
    );
  }
}
