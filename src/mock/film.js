const MIN_RATING = 1;
const MAX_RATING = 9;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 5;

const TITLE = [
  'Movie #1',
  'Movie #2',
  'Movie #3',
  'Movie #4',
  'Movie #5',
];

const RELEASE_YEAR = [
  '1930',
  '2007',
  '2010',
  '1980',
  '2000',
];

const RELEASE_DATE = [
  '26 Apr 1930',
  '05 Aug 2007',
  '31 Dec 2010',
  '01 Jun 1980',
  '01 Mar 2000',
];

const RUNTIME = [
  '1h 30m',
  '2h 10m',
  '1h 45m',
  '2h 20m',
  '1h 30m',
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

const generateDate = () => {
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

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length-1)];
};

const generateComment = (id) => {
  return {
    id:  `comment${id}`,
    author: `${getRandomElement(NAME)}`,
    comment: `${getRandomElement(COMMENTS)}`,
    data: generateDate(),
    emotion: `${getRandomElement(EMOJI)}`,
  };
};

console.log(generateComment());

const generateComments = (filmId) => {
  const commentLength = getRandomNumber(1, 5);
  const comments = [];

  for (let i = 0; i < commentLength; i++) {
    comments.push(generateComment(`${filmId}${i}`));
  }
  return comments;
};

const generateValues = (array) => {
  shuffle(array);
  const arrayLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(array[i]);
  }

  const values = result.join(', ');
  return values;
};

// Film Card
const generateFilmCard = () => {
  return {
    title: `${getRandomElement(TITLE)}`,
    runtime: `${getRandomElement(RUNTIME)}`,
    release: `${getRandomElement(RELEASE_YEAR)}`,
    poster: `${getRandomElement(POSTERS)}`,
    genre: generateValues(GENRE),
    description: generateValues(DESCRIPTION),
    rating: getRandomNumber(MIN_RATING, MAX_RATING),
    commentsCount: getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
  };
};

// Popup
let id = 0;

const generateFilmPopup = () => {

  return {
    id: id++,
    title: `${getRandomElement(TITLE)}`,
    runtime: `${getRandomElement(RUNTIME)}`,
    alternativelTitle: `${getRandomElement(TITLE)}`,
    rating: getRandomNumber(MIN_RATING, MAX_RATING),
    poster: `${getRandomElement(POSTERS)}`,
    country: `${getRandomElement(COUNTRY)}`,
    ageAllowance: `${getRandomElement(AGE_ALLOWANCE)}`,
    releaseDate: `${getRandomElement(RELEASE_DATE)}`,
    genre: generateValues(GENRE),
    director: generateValues(DIRECTORS),
    writers: generateValues(WRITERS),
    actors: generateValues(ACTORS),
    comments: generateComments(id),
    description: generateValues(DESCRIPTION),
  };
};

console.log(generateFilmPopup());

export {generateFilmCard, generateFilmPopup};


// let d = new Date(2010, 7, 5);
// let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
// let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
// let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
// console.log(`${da}-${mo}-${ye}`);
