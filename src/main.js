import { FILMS_QUANTITY, FILMS_STEP } from './const.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { remove, render } from './utils/render';
import UserRankView from './view/user-rank.js'; // импорт по умолчанию (фигурные скобки не нужны)
import SiteMenuView from './view/site-menu.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmDetailsPopupView from './view/film-details-popup.js';
import FooterStatisticsView from './view/footer-statistics.js';

const films = new Array(FILMS_QUANTITY).fill().map((item, index) => generateFilm(index + 1));
const filters = generateFilter(films);

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStatisticsElement = document.querySelector('.footer__statistics');

// Количество фильмов для отрисовки
let renderedFilmsQuantity = FILMS_QUANTITY >= FILMS_STEP ? FILMS_STEP : FILMS_QUANTITY;

render(headerElement, new UserRankView().getElement());
render(siteMainElement, new SiteMenuView(filters).getElement());
render(siteMainElement, new SortView().getElement());

const renderFilmCard = (filmsComponent, filmCard) => {
  const filmCardComponent = new FilmCardView(filmCard);

  render(filmsComponent, filmCardComponent.getElement());

  // Попап с детальным описанием фильма
  const showFilmDetailPopup = () => {
    const filmDetailPopupComponent = new FilmDetailsPopupView(filmCard);
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

};

const renderFilms = (films) => {
  const filmsComponent = new FilmsView();
  render(siteMainElement, filmsComponent.getElement());

  const filmsListElement = filmsComponent.getElement().querySelector('.films-list');
  const filmsListContainerElement = filmsComponent.getElement().querySelector('.films-list__container');

  for (let i = 0; i < renderedFilmsQuantity; i++) {
    renderFilmCard(filmsListContainerElement, films[i]);
  }

  if (FILMS_QUANTITY > renderedFilmsQuantity) {
    // Кнопка "Show more"
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListElement, showMoreButtonComponent.getElement());

    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsQuantity, renderedFilmsQuantity + FILMS_STEP)
        .forEach((item) => renderFilmCard(filmsListContainerElement, item));

      renderedFilmsQuantity += FILMS_STEP;

      // Проверка нужно ли прятать кнопку
      if (FILMS_QUANTITY <= renderedFilmsQuantity) {
        remove(showMoreButtonComponent);
      }
    });
  }
};

// Список фильмов
renderFilms(films);

// Статистика в подвале
render(footerStatisticsElement, new FooterStatisticsView(films.length).getElement());
