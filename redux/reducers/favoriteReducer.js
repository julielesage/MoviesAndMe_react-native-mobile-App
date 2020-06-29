const initialState = { favoriteFilms: [] };

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      // console.log(action.value.id); OK
      const favoriteFilmIndex = state.favoriteFilms.findIndex(
        (item) => item.id === action.value.id
      );
      if (favoriteFilmIndex !== -1) {
        //suppression du favori existant:
        nextState = {
          ...state,
          // sortir tous les favoris sauf l'index
          favoriteFilms: state.favoriteFilms.filter(
            (item, i) => i !== favoriteFilmIndex
          ),
        };
      } else {
        // ajouter un nouveau favori à la copie du tableau:
        nextState = {
          ...state,
          favoriteFilms: [...state.favoriteFilms, action.value],
        };
      }
      // renvoyer nextState ou state si nextState est undefined :
      return nextState || state;

    default:
      return state;
  }
}

export default toggleFavorite;
