import { render } from '../utils/render.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsPopupView from '../view/film-details-popup.js';


export default class FilmCard {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;
    this._filmCardComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    this._filmCardComponent.setFilmClickHandler(this._handleFilmClick);

    render(this._filmsListContainer, this._filmCardComponent);
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
}
