import { FILMS_QUANTITY, FILMS_STEP } from './const.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition } from './utils.js';
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

// Количество фильмов для отрисовки
let renderedFilmsQuantity = FILMS_QUANTITY >= FILMS_STEP ? FILMS_STEP : FILMS_QUANTITY;


// Звание пользователя
const headerElement = document.querySelector('.header');
render(headerElement, new UserRankView().getElement());

// Меню
const siteMainElement = document.querySelector('.main');
render(siteMainElement, new SiteMenuView(filters).getElement());
// Сортировка
render(siteMainElement, new SortView().getElement());

// Контент
render(siteMainElement, new FilmsView().getElement());

const filmsListContainerElement = siteMainElement.querySelector('.films .films-list .films-list__container');

for (let i = 0; i < renderedFilmsQuantity; i++) {
  render(filmsListContainerElement, new FilmCardView(films[i]).getElement());
}

// Кнопка "Show more"
const filmsListElement = siteMainElement.querySelector('.films-list');

if (FILMS_QUANTITY > renderedFilmsQuantity) {
  render(filmsListElement, new ShowMoreButtonView().getElement());

  const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

  showMoreElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsQuantity, renderedFilmsQuantity + FILMS_STEP)
      .forEach((item) => {
        render(filmsListContainerElement, new FilmCardView(item).getElement());
      });

    renderedFilmsQuantity += FILMS_STEP;

    // Проверка нужно ли прятать кнопку
    if (FILMS_QUANTITY <= renderedFilmsQuantity) {
      showMoreElement.remove();
    }
  });

}

// Статистика в подвале
const footerStatisticsElement = document.querySelector('.footer__statistics');
render(footerStatisticsElement, new FooterStatisticsView(films.length).getElement());


// Попап
const footerElement = document.querySelector('.footer');
render(footerElement, new FilmDetailsPopupView(films[0]).getElement());
