export const createFilmCardTemplate = (film) => {
  const { poster, title, rating, year, runtime, genre, description, comments, user_details } = film;
  const { watchlist, watched, favorite } = user_details;

  const watchlistClassName = watchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const watchedClassName = watched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = favorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button ${watchlistClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button ${favoriteClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
