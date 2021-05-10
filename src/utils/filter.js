import { FilterType } from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((item) => item.user_details.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((item) => item.user_details.watched),
  [FilterType.FAVORITES]: (films) => films.filter((item) => item.user_details.favorite),
};
