const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  // array.sort(() => Math.random() - 0.5);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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


const generateComment = () => {
  return {
    // id:  id,
    author: NAME[getRandomNumber(0, NAME.lenght)],
    comment: COMMENTS[getRandomNumber(0, COMMENTS.lenght)],
    data: generateDate(),
    emotion: EMOJI[getRandomNumber(0, EMOJI.lenght)],
  };
};

// console.log(generateComment());

// const generateComments = (id) => {
//   const commentLength = getRandomNumber(1, 5);
//   const comments = [];

//   for (let i = 0; i < commentLength; i++) {
//     comments.push(generateComment(id[i]));
//   }
//   return comments;
// };

// Genre, Actors
const generateValues = (array) => {
  const shuffledArray = shuffle(array);
  const arrayLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(shuffledArray[i]);
  }

  const values = result.join(', ');
  return values;
};

// Description
const generateDescription = (array)=> {
  const shuffledArray = shuffle(array);
  const descriptionLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < descriptionLength; i++) {
    result.push(shuffledArray[i]);
  }

  const description = result.join(' ');
  return description;
};

// Film Card
const generateFilmCard = () => {
  return {
    title: TITLE[getRandomNumber(0, TITLE.length)],
    runtime: RUNTIME[getRandomNumber(0, RUNTIME.length)],
    release: RELEASE_YEAR[getRandomNumber(0, RELEASE_YEAR.length)],
    poster: POSTERS[getRandomNumber(0, POSTERS.length)],
    genre: generateValues(GENRE),
    description: generateDescription(DESCRIPTION),
    rating: getRandomNumber(MIN_RATING, MAX_RATING),
    commentsCount: getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
  };
};

// Popup
// const ids = [];

const generateFilmPopup = () => {
  return {
    // id: id,
    title: TITLE[getRandomNumber(0, TITLE.length)],
    runtime: RUNTIME[getRandomNumber(0, RUNTIME.length)],
    alternativelTitle: TITLE[getRandomNumber(0, TITLE.length)],
    rating: getRandomNumber(MIN_RATING, MAX_RATING),
    poster: POSTERS[getRandomNumber(0, POSTERS.length)],
    country: COUNTRY[getRandomNumber(0, COUNTRY.length)],
    ageAllowance: AGE_ALLOWANCE[getRandomNumber(0, AGE_ALLOWANCE.length)],
    genre: generateValues(GENRE),
    director: generateValues(DIRECTORS),
    writers: generateValues(WRITERS),
    actors: generateValues(ACTORS),
    comments: generateComment(),
    description: generateDescription(),
    releaseDate: RELEASE_DATE[getRandomNumber(0, RELEASE_DATE.length)],
  };
};

export {generateFilmCard, generateFilmPopup};


// let d = new Date(2010, 7, 5);
// let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
// let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
// let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
// console.log(`${da}-${mo}-${ye}`);
