import FilmsModel from '../model/films.js';
import { isOnline } from '../utils/common.js';

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

// this._store = store; = Паттерн Dependency Injection (Внедрение зависимостей) —
// стиль настройки объекта, при котором поля объекта задаются внешней сущностью;
// Паттерн Делегирование
export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  getComments(movieId) {
    if (isOnline()) {
      return this._api.getComments(movieId)
        .then((comments) => {
          const items = createStoreStructure(comments);
          this._store.setItems(items);
          return comments;
        });
    }

    const storeComments = Object.values(this._store.getItems());

    return Promise.resolve(storeComments);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdFilms = getSyncedFilms(response.created);
          const updatedFilms = getSyncedFilms(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdFilms, ...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
