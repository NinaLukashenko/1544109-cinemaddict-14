import { createUserRankTemplate } from './view/user-rank.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsTemplate } from './view/films.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFilmDetailsPopupTemplate } from './view/film-details-popup.js';
import { generateFilm } from './mock/film.js';

const FILMS_QUANTITY = 18;
const FILMS_STEP = 5;

const films = new Array(FILMS_QUANTITY).fill().map(generateFilm);
console.log(films);

// Количество фильмов для отрисовки
let renderedFilms = FILMS_QUANTITY >= FILMS_STEP ? FILMS_STEP : FILMS_QUANTITY;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Звание пользователя
const headerElement = document.querySelector('.header');
render(headerElement, createUserRankTemplate(), 'beforeend');

// Меню
const siteMainElement = document.querySelector('.main');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');

// Контент
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsListContainerElement = siteMainElement.querySelector('.films .films-list .films-list__container');

for (let i = 0; i < renderedFilms; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

// Кнопка "Show more"
const filmsListElement = siteMainElement.querySelector('.films-list');

if (FILMS_QUANTITY > renderedFilms) {
  render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreElement = filmsListElement.querySelector('.films-list__show-more');

  showMoreElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilms, renderedFilms + FILMS_STEP)
      .forEach((item) => {
        render(filmsListContainerElement, createFilmCardTemplate(item), 'beforeend');
      });

    renderedFilms += FILMS_STEP;

    // Проверка нужно ли прятать кнопку
    if (FILMS_QUANTITY <= renderedFilms) {
      showMoreElement.remove();
    }
  });

}

// // Попап
// const footerElement = document.querySelector('.footer');
// render(footerElement, createFilmDetailsPopupTemplate(), 'afterend');
