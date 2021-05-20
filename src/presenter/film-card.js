import { render, replace, remove } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';
import { UserAction, UpdateType, Mode } from '../const.js';
import { isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';

export default class FilmCard {
  constructor(filmsListContainer, changeData, changeMode, api) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmDetailsPopupComponent = null; // Initial popup
    this._mode = Mode.DEFAULT;
    this._film = null;
    this._comments = null;
    this._footerElement = document.querySelector('.footer');
    this._api = api;

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

    if (this._mode === Mode.POPUP) {
      this._updatePopup();
    }

    if (prevFilmCardComponent === null) {
      render(this._filmsListContainer, this._filmCardComponent);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  getFilmId() {
    return this._film !== null ? this._film.id : null;
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _handleFilmClick() {
    this._openPopup();
  }

  _getPopup() {
    const filmDetailsPopupComponent = new FilmDetailsPopupView(this._film, this._comments);
    filmDetailsPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    filmDetailsPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    filmDetailsPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    filmDetailsPopupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    // Closing the popup
    filmDetailsPopupComponent.setCloseBtnClickHandler(() => {
      this._footerElement.removeChild(filmDetailsPopupComponent.getElement());
      document.body.classList.remove('hide-overflow');
    });
    //Sending Form
    filmDetailsPopupComponent.setCommentFormSendHandler(this._handleCommentFormSend);
    return filmDetailsPopupComponent;
  }

  _updatePopup() {
    const prevFilmDetailsPopupComponent = this._filmDetailsPopupComponent;
    this._filmDetailsPopupComponent = this._getPopup();
    // Replacing the popup
    replace(this._filmDetailsPopupComponent, prevFilmDetailsPopupComponent);
    // Removing "prev" popup
    remove(prevFilmDetailsPopupComponent);
  }

  _openPopup() {
    this._changeMode(); // Close all Opened Popups

    this._api.getComments(this._film.id)
      .then((response) => {
        this._mode = Mode.POPUP;
        this._comments = response;
        this._filmDetailsPopupComponent = this._getPopup();
        this._footerElement.appendChild(this._filmDetailsPopupComponent.getElement());
        document.body.classList.add('hide-overflow');
      });
  }

  _closePopup() {
    this._filmDetailsPopupComponent.unSetCommentFormSendHandler();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _handleWatchlistClick() {
    const newUserDetails = Object.assign({}, this._film.userDetails, { watchlist: !this._film.userDetails.watchlist});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { userDetails: newUserDetails }),
    );
  }

  _handleWatchedClick() {
    const newUserDetails = Object.assign({}, this._film.userDetails, { watched: !this._film.userDetails.watched});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { userDetails: newUserDetails }),
    );
  }

  _handleFavoriteClick() {
    const newUserDetails = Object.assign({}, this._film.userDetails, { favorite: !this._film.userDetails.favorite});

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign({}, this._film, { userDetails: newUserDetails }),
    );
  }

  _handleDeleteCommentClick(id) {
    if (!isOnline()) {
      toast('You can\'t delete comment offline');
      return;
    }

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
    if (!isOnline()) {
      toast('You can\'t add comment offline');
      return;
    }
    // console.log("We send form to server");
  }
}
