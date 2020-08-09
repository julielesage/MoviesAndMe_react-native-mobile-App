// création d'un store :

import { createStore, combineReducers } from "redux";
import toggleFavorite from "../reducers/favoriteReducer";
import setAvatar from "../reducers/setAvatar";

// let store = createStore(reducer);
export default createStore(combineReducers({ toggleFavorite, setAvatar }));
