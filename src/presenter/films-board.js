import { remove, render, RenderPosition } from '../utils/render.js';
import { FILMS_STEP, UserAction, UpdateType } from '../const.js';
import SortView from '../view/sort.js';
import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmCardPresenter from './film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading.js';

export default class FilmsBoard {
  constructor(filmsContainer, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmsContainer = filmsContainer;
    this._renderedFilmsQuantity = FILMS_STEP;
    this._filmCardPresenter = {};
    this._openedPopup = null;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmsContainer, this._filmsComponent);
    render(this._filmsComponent, this._filmsListComponent);
    this._renderSort();
    this._renderFilmsBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView();
    render(this._filmsComponent, this._sortComponent, RenderPosition.BEFORE);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update)
          .then( (response) => {
            this._filmsModel.updateFilm(updateType, response);
          });
        break;
      case UserAction.ADD_FILM:
        this._filmsModel.addFilm(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this._filmsModel.deleteFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._FilmCardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearInvisibleFilms();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({ resetRenderedFilmsQuantity: true });
        this._renderSort();
        this._renderFilmsBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderFilmsBoard();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderLoading() {
    render(this._filmsComponent, this._loadingComponent);
  }

  _renderFilmCard(film) {
    const filmsListContainerElement = this._filmsComponent.getElement().querySelector('.films-list__container');

    const renderedPresenter = this._filmCardPresenter[film.id];

    if (renderedPresenter) {
      renderedPresenter.init(film);
    } else {
      const filmCardPresenter = new FilmCardPresenter(filmsListContainerElement, this._handleViewAction, this._handleModeChange, this._api);
      filmCardPresenter.init(film);
      this._filmCardPresenter[film.id] = filmCardPresenter;
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _handleShowMoreButtonClick() {
    const filmsQuantity = this._getFilms().length;
    const newRenderedFilmsQuantity = Math.min(filmsQuantity, this._renderedFilmsQuantity + FILMS_STEP);
    const films = this._getFilms().slice(this._renderedFilmsQuantity, newRenderedFilmsQuantity);
    this._renderFilms(films);
    this._renderedFilmsQuantity = newRenderedFilmsQuantity;

    // ???????????????? ?????????? ???? ?????????????? ????????????
    if (this._renderedFilmsQuantity >= filmsQuantity) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._filmsListComponent, this._showMoreButtonComponent);
  }

  _clearInvisibleFilms() {
    const films = this._getFilms();
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => {
        if (!films.some((film) => film.id === presenter.getFilmId())) {
          presenter.destroy();
        }
      });
    remove(this._showMoreButtonComponent);
  }

  _clearFilmsBoard({ resetRenderedFilmsQuantity = false } = {}) {
    const filmsQuantity = this._getFilms().length;

    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);
    remove(this._loadingComponent);

    if (resetRenderedFilmsQuantity) {
      this._renderedFilmsQuantity = FILMS_STEP;
    } else {
      // ???? ????????????, ???????? ?????????????????????? ?????????? ??????????????
      // ?????????????????????? ???????????????????? ??????????????
      // ?????????? ?????????????????????????????? ?????????? ???????????????????? ??????????????
      this._renderedFilmsQuantity = Math.min(filmsQuantity, this._renderedFilmsQuantity);
    }
  }

  _renderFilmsBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsQuantity = films.length;

    this._renderFilms(films.slice(0, Math.min(filmsQuantity, this._renderedFilmsQuantity)));

    if (filmsQuantity > this._renderedFilmsQuantity) {
      this._renderShowMoreButton();
    }
  }
}
