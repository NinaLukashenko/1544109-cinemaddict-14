import { createElement } from '../utils.js';
import { SORTS } from '../const.js';

const createSortTemplate = () => {
  const sortList = SORTS.reduce((prev, item, index) => {
    const sortClass = index === 2
      ? 'sort__button--active'
      : '';

    return `
      ${prev}
      <li><a href="#" class="sort__button ${sortClass}">${item}</a></li>
    `;
  }, '');

  return `
  <ul class="sort">
    ${sortList}
  </ul>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
