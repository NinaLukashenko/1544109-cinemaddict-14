import { createElement } from '../utils.js';

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;

  const filterClassName = isActive
    ? 'main-navigation__item--active'
    : '';

  const filterCountElement = isActive
    ? ''
    : `<span class="main-navigation__item-count">${count}</span>`;

  return `
      <a href="#${name.toLowerCase()}" class="main-navigation__item ${filterClassName}">${name} ${filterCountElement}</a>
    `;
};

const createFilterTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
