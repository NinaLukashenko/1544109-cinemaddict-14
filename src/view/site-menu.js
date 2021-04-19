import AbstractView from './abstract.js';

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

const createSiteMenuTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
