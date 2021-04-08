import dayjs from 'dayjs';
import { POSTERS, MOVIES, DESCRIPTIONS, GENRES, DURATIONS } from '../const.js';
import { getRandomInteger } from '../utils.js';

const generateDate = () => {
  const maxYearsGap = 50;
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(yearsGap, 'year').toDate();
};

const generateMovie = () => {
  const randomNumber =  getRandomInteger(0, 4);

  return {
    poster: POSTERS[randomNumber],
    name: MOVIES[randomNumber],
    rate: getRandomInteger(5, 10),
    year: generateDate().getFullYear(),
    duration: DURATIONS[randomNumber],
    genre: GENRES[randomNumber],
    description: DESCRIPTIONS[randomNumber],
    comments: getRandomInteger(0, 25),
  };
};

export { generateMovie };
