import { remove, render, RenderPosition } from '../utils/render.js';
import { FILMS_STEP, UserAction, UpdateType, Mode } from '../const.js';
import SortView from '../view/sort.js';
import FilmsView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmCardPresenter from './film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import { filter } from '../utils/filter.js';

export default class FilmsBoard {
  constructor(filmsContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmsContainer = filmsContainer;
    this._renderedFilmsQuantity = FILMS_STEP;
    this._filmCardPresenter = {};
    this._openedPopup = null;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();

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
        this._filmsModel.updateFilm(updateType, update);
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
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({ resetRenderedFilmsQuantity: true });
        this._renderFilmsBoard();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film) {
    const filmsListContainerElement = this._filmsComponent.getElement().querySelector('.films-list__container');
    let popup = null;

    if (this._openedPopup) {
      const popupId = Number(Object.keys(this._openedPopup)[0]);
      if (popupId === film.id) {
        popup = this._openedPopup[popupId];
      }
    }

    const filmCardPresenter = new FilmCardPresenter(filmsListContainerElement, this._handleViewAction, this._handleModeChange);
    filmCardPresenter.init(film, popup);
    this._filmCardPresenter[film.id] = filmCardPresenter;
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

    // Проверка нужно ли удалять кнопку
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

  _clearFilmsBoard({ resetRenderedFilmsQuantity = false } = {}) {
    const filmsQuantity = this._getFilms().length;

    // Проверка наличия открытого попапа
    this._checkOpenedPopup();

    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmsQuantity) {
      this._renderedFilmsQuantity = FILMS_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества фильмов
      // нужно скорректировать число показанных фильмов
      this._renderedFilmsQuantity = Math.min(filmsQuantity, this._renderedFilmsQuantity);
    }
  }

  _checkOpenedPopup() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => {
        if (presenter._mode === Mode.POPUP) {
          this._openedPopup = presenter._filmPopup;
        }
      });
  }

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmsQuantity = films.length;

    this._renderSort();

    this._renderFilms(films.slice(0, Math.min(filmsQuantity, this._renderedFilmsQuantity)));

    if (filmsQuantity > this._renderedFilmsQuantity) {
      this._renderShowMoreButton();
    }
  }
}
