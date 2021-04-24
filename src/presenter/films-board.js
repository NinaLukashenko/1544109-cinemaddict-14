import { remove, render } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { FILMS_STEP } from '../const.js';
import SortView from '../view/sort.js';
import FilmsView from '../view/films.js';
import FilmCardPresenter from './film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';

export default class FilmsBoard {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmsQuantity = FILMS_STEP;
    this._filmCardPresenter = {};

    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();

    this._renderFilmsBoard();
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilmCard(film) {
    const filmsListContainerElement = this._filmsComponent.getElement().querySelector('.films-list__container');

    const filmCardPresenter = new FilmCardPresenter(filmsListContainerElement, this._handleFilmChange);
    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _renderCardsOfFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _handleShowMoreButtonClick() {
    this._renderCardsOfFilms(this._renderedFilmsQuantity, this._renderedFilmsQuantity + FILMS_STEP);
    this._renderedFilmsQuantity += FILMS_STEP;

    // Проверка нужно ли прятать кнопку
    if (this._films.length <= this._renderedFilmsQuantity) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const filmsListElement = this._filmsComponent.getElement().querySelector('.films-list');
    render(filmsListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    this._renderCardsOfFilms(0, Math.min(this._films.length, FILMS_STEP));

    if (this._films.length > FILMS_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    this._renderSort();

    render(this._filmsContainer, this._filmsComponent);
    this._renderFilmsList();
  }

}
