import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((item) => item.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((item) => item.userDetails.watched),
  [FilterType.FAVORITES]: (films) => films.filter((item) => item.userDetails.favorite),
};
