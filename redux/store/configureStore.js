// création d'un store :

import { createStore } from "redux";
import toggleFavorite from "../reducers/favoriteReducer";

// let store = createStore(reducer);
export default createStore(toggleFavorite);
