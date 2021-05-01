import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._filmState = {};
  }

  // М-д обновляет данные,
  // а также перерисовывает компонент, если тригер justDataUpdating равен false
  updateState(update, justDataUpdating = false, scrollY) {
    if (!update) {
      return;
    }

    this._filmState = Object.assign(
      {},
      this._filmState,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();

    setTimeout(() => {
      document.querySelector('.film-details').scrollTop = scrollY + 130 + 64;
    }, 0);
  }

  // М-д удаляет старый ДОМ-эл, создает новый, помещает новый вместо старого,
  // а также вызывает м-д востановления обработчиков событий
  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  // Востановление обработчиков событий
  // М-д нужно реализовать в наследниках
  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
