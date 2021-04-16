import { createElement } from '../utils.js';

const createFooterStatisticsTemplate = (quantity) => {
  return `
    <p>${quantity} movies inside</p>
  `;
};

export default class FooterStatistics {
  constructor(quantity) {
    this._quantity = quantity;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._quantity);
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
