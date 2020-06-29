function reducerProfil(state, action) {
  // attention un state est immuable, impossible de le modifier il faut en retourner un autre :
  let nextState;
  // le reducer peut engager plusieurs type d'action, d'ou lutilité d'un switch case:
  switch (action.type) {
    case "ADD_PROFIL":
      nextState = {
        ...state,
        profil: action.value,
      };
      return nextState;
    case "UPDATE_PROFIL":
      return nextState;
    case "DELETE_PROFIL":
      return nextState;
    default:
      return state;
  }
}

// Une action est un objet toujours composé d'un type d'action et d'une valeur correspondant à l'objet que l'on souhaite modifier dans le state:
const action = {
  type: "ADD_PROFIL",
  value: profil,
};
