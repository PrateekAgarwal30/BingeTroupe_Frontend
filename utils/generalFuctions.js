const genresTitle = {
  action: "Action",
  adventure: "Adventure",
  comedy: "Comedy",
  crime: "Crime",
  drama: "Drama",
  fantasy: "Fantasy",
  historical: "Historical",
  horror: "Horror",
  mystery: "Mystery",
  philosophical: "Philosophical",
  political: "Political",
  romance: "Romance",
  sci_fi: "Science Fiction",
  thriller: "Thriller",
};
export const getGenreTitle = (genreId) => {
  return genresTitle[genreId];
};
export const getCOntentDuration = (durationinMillSec) => {
  var durationInSec = durationinMillSec / 1000;
  var s = durationInSec % 60;
  var m = ((durationInSec - s) / 60) % 60;
  var h = ((durationInSec - m - s) / (60 * 60)) % 24;
  if (h) {
    return `${h}h ${m}m`;
  } else {
    return `${m}m ${s}s`;
  }
};
