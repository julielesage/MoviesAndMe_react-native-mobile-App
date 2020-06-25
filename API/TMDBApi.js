// ici on va rassembler toutes les fonctions en rapport avec l'API donc just export sans default
const API_TOKEN = "f10c7a2cf9a0561d23cde2967e1b6391";

export function getFilmsFromApiWithSearchedText(text, currentPage) {
  // voir quelle url : https://developers.themoviedb.org/3/search/search-companies
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    currentPage;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getImageFromAPI(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
