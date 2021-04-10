const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;

  const filterClassName = isActive
    ? 'main-navigation__item main-navigation__item--active'
    : 'main-navigation__item';

  const filterCountElement = isActive
    ? ''
    : `<span class="main-navigation__item-count">${count}</span>`;

  return `
      <a href="#${name.toLowerCase()}" class="${filterClassName}">${name} ${filterCountElement}</a>
    `;
};

export const createSiteMenuTemplate = (filters) => {
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
