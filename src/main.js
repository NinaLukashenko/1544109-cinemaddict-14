import { FILMS_QUANTITY } from './const.js';
import { generateFilm } from './mock/film.js';
import { render } from './utils/render';
import UserRankView from './view/user-rank.js'; // импорт по умолчанию (фигурные скобки не нужны)
import SiteMenuView from './view/site-menu.js';
import FilmsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

const films = new Array(FILMS_QUANTITY).fill().map((item, index) => generateFilm(index + 1));

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

render(headerElement, new UserRankView());

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

// Витрина с фильмами (сортировка, список фильмов, кн. "Show more")
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, filterModel);
filmsBoardPresenter.init();

// Статистика в подвале
render(footerStatisticsElement, new FooterStatisticsView(films.length));
