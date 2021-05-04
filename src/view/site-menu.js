import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  const isCurrentFilterType = type === currentFilterType;

  const filterClassName = isCurrentFilterType
    ? 'main-navigation__item--active'
    : '';

  const filterCountElement = isCurrentFilterType
    ? ''
    : `<span class="main-navigation__item-count">${count}</span>`;

  return `
      <a href="#${name.toLowerCase()}" class="main-navigation__item ${filterClassName}" data-filter=${name}>${name} ${filterCountElement}</a>
    `;
};

const createSiteMenuTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.classList.contains('main-navigation__item')) {
      evt.preventDefault();
      this._callback.filterTypeChange(evt.target.dataset.filter);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._filterTypeChangeHandler);
  }
}
