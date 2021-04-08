import { createUserRankTemplate } from './view/user-rank.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmsTemplate } from './view/films.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFilmDetailsPopupTemplate } from './view/film-details-popup.js';
import { generateMovie } from './mock/film.js';

const FILMS_QUANTITY = 5;
const TOP_FILMS_QUANTITY = 2;
const COMMENTED_FILMS_QUANTITY = 2;

console.log(generateMovie());

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

const filmsListContainerElement = siteMainElement.querySelector('.films .films-list:first-child .films-list__container');
for (let i = 0; i < FILMS_QUANTITY; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

const filmsListElement = siteMainElement.querySelector('.films-list');
render(filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

const topFilmsListElement = siteMainElement.querySelector('.films .films-list:nth-child(2) .films-list__container');
for (let i = 0; i < TOP_FILMS_QUANTITY; i++) {
  render(topFilmsListElement, createFilmCardTemplate(), 'beforeend');
}

const commentedFilmsListElement = siteMainElement.querySelector('.films .films-list:nth-child(3) .films-list__container');
for (let i = 0; i < COMMENTED_FILMS_QUANTITY; i++) {
  render(commentedFilmsListElement, createFilmCardTemplate(), 'beforeend');
}

// // Попап
// const footerElement = document.querySelector('.footer');
// render(footerElement, createFilmDetailsPopupTemplate(), 'afterend');
