import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';

const POSTERS = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg'];
const MOVIES = ['Made For Each Other', 'Popeye Meets Sinbad', 'Sagebrush Rail', 'The Dance Of Life', 'The Great Flamarion'];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];
const GENRES = ['action', 'comedy', 'drama', 'fantasy', 'thriller'];
const DURATIONS = ['1h 36m', '2h 20m', '1h 10m', '1h 25m', '2h 07m'];
const DIRECTORS = ['Quentin Tarantino', 'Christopher Nolan', 'Ridley Scott', 'Steven Spielberg', 'Kathleen Kennedy'];
const WRITERS = ['Q. Tarantino', 'Ch. Nolan', 'R. Scott', 'St. Spielberg', 'K. Kennedy'];
const ACTORS = ['Brad Pitt', 'Angelina Jolie', 'Johnny Depp', 'Cameron Diaz', 'Scarlett Johansson'];
const COUNTRIES = ['US', 'Germany', 'Italy', 'Japanese', 'India'];
const COMMENTS = [
  { id: 1, text: 'Cool movie!', emotion: 'smile', author: 'Tom', date: new Date(2018, 11, 7, 22, 0) },
  { id: 2, text: 'Too boring!', emotion: 'sleeping', author: 'Barbara', date: new Date(2020, 7, 9, 10, 10) },
  { id: 3, text: 'Not mine genre!', emotion: 'angry', author: 'Ben', date: new Date(2021, 2, 11, 19, 30) },
  { id: 4, text: 'Awful!', emotion: 'puke', author: 'Lora', date: new Date(2020, 8, 5, 20, 8) },
  { id: 5, text: 'Amazing!', emotion: 'smile', author: 'Robert', date: new Date(2019, 9, 15, 19, 1) },
];


const generateArray = (originArray) => {
  const startFrom = getRandomInteger(0, 2);
  const quantity = startFrom + getRandomInteger(1, 3);
  const newArray = [];
  for (let i = startFrom; i < quantity; i++) {
    newArray.push(originArray[i]);
  }
  return newArray;
};

const generateDate = () => {
  const maxYearsGap = 50;
  const yearsGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(yearsGap, 'year').toDate();
};


const generateComments = () => {
  const commentsSet = generateArray(COMMENTS);
  const comments = [];
  commentsSet.forEach((item) => {
    comments.push(item.id);
  });
  return comments;
};

const generateFilm = (filmId) => {
  const randomNumber =  getRandomInteger(0, 4);

  return {
    id: filmId,
    filmInfo: {
      poster: POSTERS[randomNumber],
      title: MOVIES[randomNumber],
      alternativeTitle: MOVIES[randomNumber],
      rating: getRandomInteger(0, 10),
      year: generateDate(),
      runtime: DURATIONS[randomNumber],
      release: {
        date: generateDate(),
        country: COUNTRIES[getRandomInteger(0, 4)],
      },
      ageRating: getRandomInteger(5, 18),
      director: DIRECTORS[getRandomInteger(0, 4)],
      writers: generateArray(WRITERS),
      actors: generateArray(ACTORS),
      genre: generateArray(GENRES),
      description: DESCRIPTIONS[randomNumber],
    },
    comments: generateComments(),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      watched: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};

export { generateFilm, GENRES, COMMENTS };
