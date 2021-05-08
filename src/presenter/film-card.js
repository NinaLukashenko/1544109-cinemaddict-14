import { render, replace, remove } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';
import { UserAction, UpdateType, Mode } from '../const.js';

export default class FilmCard {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null; // Initial popup
    this._mode = Mode.DEFAULT;
    this._filmPopup = {};

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
  }

  init(film, popup) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmCardComponent.setFilmClickHandler(this._handleFilmClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (popup !== null) {
      this._filmDetailsPopupComponent = popup;
      this._openPopup();
    }

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
    this._openPopup();
  }

  _openPopup() {
    const prevFilmDetailsPopupComponent = this._filmDetailsPopupComponent;

    const footerElement = document.querySelector('.footer');

    this._changeMode(); // Close all Opened Popups
    this._mode = Mode.POPUP;
    this._filmDetailsPopupComponent = new FilmDetailsPopupView(this._film);
    this._filmPopup[this._film.id] = this._filmDetailsPopupComponent;

    this._filmDetailsPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsPopupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    // Closing the popup
    this._filmDetailsPopupComponent.setCloseBtnClickHandler(() => {
      footerElement.removeChild(this._filmDetailsPopupComponent.getElement());
      document.body.classList.remove('hide-overflow');
    });
    //Sending Form
    this._filmDetailsPopupComponent.setCommentFormSendHandler(this._handleCommentFormSend);

    // create Popup from scratch
    if (prevFilmDetailsPopupComponent === null) {
      footerElement.appendChild(this._filmDetailsPopupComponent.getElement());
      document.body.classList.add('hide-overflow');
      return;
    }

    // Replacing the popup
    replace(this._filmDetailsPopupComponent, prevFilmDetailsPopupComponent);

    // Removing "prev" popup
    remove(prevFilmDetailsPopupComponent);
  }

  _closePopup() {
    this._filmDetailsPopupComponent.unSetCommentFormSendHandler();
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

  _handleCommentFormSend() {
    // console.log("We send form to server");
  }
}
