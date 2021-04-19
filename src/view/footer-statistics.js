import AbstractView from './abstract.js';

const createFooterStatisticsTemplate = (quantity) => {
  return `<p> ${quantity} movies inside</p>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._quantity);
  }
}
