import { UpdateType, AUTHORIZATION, END_POINT } from './const.js';
import { render } from './utils/render';
import UserRankView from './view/user-rank.js'; // импорт по умолчанию (фигурные скобки не нужны)
import FilmsBoardPresenter from './presenter/films-board.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import Api from './api.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, filterModel, api);

render(headerElement, new UserRankView());
filterPresenter.init();
filmsBoardPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticsElement, new FooterStatisticsView(films.length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    render(footerStatisticsElement, new FooterStatisticsView(0));
  });
