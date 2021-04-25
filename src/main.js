import { FILMS_QUANTITY } from './const.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { render } from './utils/render';
import UserRankView from './view/user-rank.js'; // импорт по умолчанию (фигурные скобки не нужны)
import SiteMenuView from './view/site-menu.js';
import FilmsBoardPresenter from './presenter/films-board.js';
import FooterStatisticsView from './view/footer-statistics.js';

const films = new Array(FILMS_QUANTITY).fill().map((item, index) => generateFilm(index + 1));
const filters = generateFilter(films);

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

render(headerElement, new UserRankView().getElement());
render(siteMainElement, new SiteMenuView(filters).getElement());

// Витрина с фильмами (сортировка, список фильмов, кн. "Show more")
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement);
filmsBoardPresenter.init(films);

// Статистика в подвале
render(footerStatisticsElement, new FooterStatisticsView(films.length).getElement());
