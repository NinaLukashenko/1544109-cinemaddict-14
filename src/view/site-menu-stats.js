import { createElement } from '../utils.js';

const createSiteMenuStatsTemplate = () => {
  return `
    <a href="#stats" class="main-navigation__additional">Stats</a>`;
};

export default class SiteMenuStats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuStatsTemplate();
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
