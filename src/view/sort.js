import { SORTS } from '../const.js';

export const createSortTemplate = () => {
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
