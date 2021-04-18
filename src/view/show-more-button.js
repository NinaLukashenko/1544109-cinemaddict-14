import AbstractView from './abstract.js';

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">
  Show more</button>`;
};

export default class ShowMoreButton extends AbstractView {
  constructor(){
    super();
    // Привяжем обработчик к контексту с помощью bind
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    // Внутри абстрактного обработчика вызовем колбэк
    this._callback.click();
  }

  setClickHandler(callback) {
    // Колбэк запишем во внутреннее свойство
    this._callback.click = callback;
    // В addEventListener передадим абстрактный обработчик
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
