import { remove, render } from '../utils/render.js';
import { FILMS_QUANTITY, FILMS_STEP } from '../const.js';
import SortView from '../view/sort.js';
import FilmsView from '../view/films.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';
import ShowMoreButtonView from '../view/show-more-button.js';

export default class FilmsBoard {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmsQuantity = FILMS_STEP;

    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();

    this._renderFilmsBoard();
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent);
  }

  _renderFilmCard(film) {
    const filmCardComponent = new FilmCardView(film);
    const footerElement = document.querySelector('.footer');

    const filmsListContainerElement = this._filmsComponent.getElement().querySelector('.films-list__container');

    render(filmsListContainerElement, filmCardComponent);

    // Попап с детальным описанием фильма
    const showFilmDetailPopup = () => {
      const filmDetailPopupComponent = new FilmDetailsPopupView(film);
      footerElement.appendChild(filmDetailPopupComponent.getElement());
      document.body.classList.add('hide-overflow');

      filmDetailPopupComponent.setCloseBtnClickHandler(() => {
        footerElement.removeChild(filmDetailPopupComponent.getElement());
        document.body.classList.remove('hide-overflow');
      });
    };

    // Обработчик событий на элементах карточки фильма
    filmCardComponent.setFilmClickHandler(() => {
      showFilmDetailPopup();
    });
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
    if (FILMS_QUANTITY <= this._renderedFilmsQuantity) {
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
