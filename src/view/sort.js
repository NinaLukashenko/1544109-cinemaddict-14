import AbstractView from './abstract.js';
import { SORTS } from '../const.js';

const createSortTemplate = () => {
  const sortList = SORTS.reduce((prev, item, index) => {
    const sortClass = index === 0
      ? 'sort__button--active'
      : '';

    return `
      ${prev}
      <li><a href="#" class="sort__button ${sortClass}">${item}</a></li>
    `;
  }, '');

  return `<ul class="sort">${sortList}</ul>`;
};

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
