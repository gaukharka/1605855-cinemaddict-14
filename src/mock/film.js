import {generateReleaseDate} from '../utils.js';

const MIN_RATING = 1;
const MAX_RATING = 9;
// const MIN_COMMENT_COUNT = 0;
// const MAX_COMMENT_COUNT = 5;

const TITLE = [
  'Movie #1',
  'Movie #2',
  'Movie #3',
  'Movie #4',
  'Movie #5',
];

const RELEASE_DATE = [
  '2019-05-11T00:00:00.000Z',
  '2000-02-11T00:00:00.000Z',
  '1980-05-21T00:00:00.000Z',
  '2009-12-05T00:00:00.000Z',
  '2020-01-01T00:00:00.000Z',
  '1980-03-28T00:00:00.000Z',
];

const RUNTIME = [
  '90',
  '180',
  '130',
  '50',
  '110',
];

const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const EMOJI = [
  './images/emoji/smile.png',
  './images/emoji/sleeping.png',
  './images/emoji/puke.png',
  './images/emoji/angry.png',
];

const GENRE = [
  'Comedy',
  'Drama',
  'Melodrama',
  'Musical',
  'Action',
  'Horror',
  'Romance',
  'Western',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Johnny Depp',
  'John Travolta',
  'Bradlay Cooper',
  'Lili Reinhart',
];

const DIRECTORS = [
  'Steven Spielberg',
  'Jordan Alan',
  'Wyatt Bardouille',
  'Richard Foster Baker',
  'Carroll Ballard',
  'Bradley Barker',
  'Marilyn Agrelo',
  'Jane Anderson',
  'Yvonne Andersen',
];

const WRITERS = [
  'Robert Towne',
  'Ethan Coen',
  'Joel Coen',
  'Francis Ford Coppola',
  'Charlie Kaufman',
  'Woody Allen',
  'Ernest Lehman',
  'Oliver Stone',
  'Spike Lee',
  'Preston Sturges',
];

const COUNTRY = [
  'USA',
  'Italy',
  'Germany',
  'France',
  'Brasil',
  'China',
  'Japan',
];

const AGE_ALLOWANCE = [
  '18+',
  '16+',
];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const NAME = [
  'Olya',
  'John',
  'Naima',
  'Dina',
  'Mila',
  'Ivan',
  'Anvar',
];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const generateCommentDate = () => {
  const date = new Date();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();
  const time = date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, '$1');

  if(month.length < 2) {
    month = '0' + month;
  }
  if(day.length < 2){
    day = '0' + day;
  }

  return `${year}/${month}/${day} ${time}`;
};

const generateDuration = (duration) => {
  const hours = Math.floor(duration/60);
  const minutes = Math.round(((duration/60)-hours)*60);

  return `${hours}h ${minutes}m`;
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length-1)];
};

const generateValues = (array) => {
  shuffle(array);
  const arrayLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(array[i]);
  }

  const values = result.join(' ');
  return values;
};

const generateArrays = (array) => {
  shuffle(array);
  const arrayLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(array[i]);
  }

  const values = result.join(', ');
  return values;
};

const generateComment = (id) => {
  return {
    id:  `comment${id}`,
    author: `${getRandomElement(NAME)}`,
    comment: `${getRandomElement(COMMENTS)}`,
    data: generateCommentDate(),
    emotion: `${getRandomElement(EMOJI)}`,
  };
};

const generateComments = (filmId) => {
  const commentLength = getRandomNumber(1, 5);
  const comments = [];

  for (let i = 0; i < commentLength; i++) {
    comments.push(generateComment(`${filmId}${i}`));
  }
  return comments;
};

// Film Card
// const generateFilmCard = () => {
//   return  {
//     id: id,
//     title: `${getRandomElement(TITLE)}`,
//     runtime: generateDuration(getRandomElement(RUNTIME)),
//     release: generateReleaseYear(getRandomElement(RELEASE_DATE)),
//      releaseDate: generateReleaseDate(getRandomElement(RELEASE_DATE)),
//     poster: `${getRandomElement(POSTERS)}`,
//     genre: generateArrays(GENRE),
//     description: generateValues(DESCRIPTION),
//     rating: getRandomNumber(MIN_RATING, MAX_RATING),
//     commentsCount: getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
//   };
// };

// Popup
let id = 0;

const generateFilmPopupMocks = () => {
  return {
    id: id++,
    comments: generateComments(id),
    filmInfo: {
      title: `${getRandomElement(TITLE)}`,
      alternativelTitle: `${getRandomElement(TITLE)}`,
      rating: getRandomNumber(MIN_RATING, MAX_RATING),
      poster: `${getRandomElement(POSTERS)}`,
      ageAllowance: `${getRandomElement(AGE_ALLOWANCE)}`,
      director: generateArrays(DIRECTORS),
      writers: generateArrays(WRITERS),
      actors: generateArrays(ACTORS),
      release: {
        releaseDate: `${getRandomElement(RELEASE_DATE)}`,
        country: `${getRandomElement(COUNTRY)}`,
      },
      runtime: generateDuration(getRandomElement(RUNTIME)),
      genre: generateArrays(GENRE),
      description: generateValues(DESCRIPTION),
    },
    userDetails: {
      watchList: false,
      alreadyWatched: true,
      favorit: false,
      // watchingDate: generateReleaseDate(getRandomElement(RELEASE_DATE)),
    },
  };
};

export {generateFilmPopupMocks};
