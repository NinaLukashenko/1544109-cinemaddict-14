const taskToFilterMap = {
  All: (films) => films.length,
  Watchlist: (films) => films.filter((item) => item.user_details.watchlist).length,
  History: (films) => films.filter((item) => item.user_details.watched).length,
  Favorites: (films) => films.filter((item) => item.user_details.favorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(taskToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
