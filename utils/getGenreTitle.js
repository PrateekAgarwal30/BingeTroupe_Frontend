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
export default (genreId) => {
  return genresTitle[genreId];
};
