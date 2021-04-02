const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
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

const RUNTIME = [
  '1h 30m',
  '2h 10m',
  '1h 45m',
  '2h 20m',
  '1h 30m',
];

const generateValue = (array) => {
  const randomIndex = getRandomNumber(0, 5);
  return array[randomIndex];
};

const POSTERS = [
  '/public/images/posters/made-for-each-other.png',
  '/public/images/posters/popeye-meets-sinbad.png',
  '/public/images/posters/santa-claus-conquers-the-martians.jpg',
  '/public/images/posters/the-dance-of-life.jpg',
  '/public/images/posters/the-great-flamarion.jpg',
  '/public/images/posters/the-man-with-the-golden-arm.jpg',
];

// const generate
// const POSTER = {
//   poster_1: `/public/images/posters/made-for-each-other.png`,
//   poster_2: `/public/images/posters/popeye-meets-sinbad.png`,
//   poster_3
// };

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

const ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Johnny Depp',
  'John Travolta',
  'Bradlay Cooper',
  'Lili Reinhart',
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

//POSTER
const generatePoster = () => {
  const randomIndex = getRandomNumber(0, 5);

  return poster[randomIndex];
};

// Genre, Actors
const generateValues = (array) => {
  shuffle(array);
  const arrayLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    result.push(array[i]);
  }

  const genres = result.join(', ');
  return genres;
};

// Description
const generateDescription = (array)=> {
  shuffle(array);
  const descriptionLength = getRandomNumber(1, 5);
  const result = [];

  for (let i = 0; i < descriptionLength; i++) {
    result.push(array[i]);
  }

  const description = result.join(' ');

  if(description.length >= 140) {
    const trimmedDescription = description.substring(0, 139) + '...';
    return trimmedDescription;
  }

  const fullDescription = description;
  return fullDescription;
};

// Film Card
const generateFilmCard = () => {
  return {
    title: generateValue(TITLE),
    runtime: generateValue(RUNTIME),
    release: generateValue(RELEASE_YEAR),
    genre: generateValues(GENRE),
    poster: POSTERS[getRandomNumber(0, 6)],
    description: generateDescription(DESCRIPTION),
    rating: getRandomNumber(MIN_RATING, MAX_RATING),
    commentsCount: getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
  };
};

// Popup
// const generateFilmPopup = () => {
//   return {
//     title: generateValue(title),
//     alternativelTitle: generateValue(title),
//     poster: generateLargePoster(),
//     rating: generateRating(),
//     director: generateDirector(),
//     writers: generateWriters(),
//     actors: generateValues(ACTORS),
//     genre: generateValues(GENRE),
//     fullDescription: generateDescription(),
//     releaseDate: generateRelease(),
//     runtime: generateRunTime(),
//     country:
//     ageAllowance:

//   };
// };

// const myDate = new Date().toTimeString().replace(/.*(\d{2}):(\d{2}).*/, "$1h $2m");
// console.log(myDate);


console.log(generateFilmCard());
