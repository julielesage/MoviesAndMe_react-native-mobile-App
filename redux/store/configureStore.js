// création d'un store :

import { createStore } from "redux";
import toggleFavorite from "../reducers/favoriteReducer";
import setAvatar from "../reducers/setAvatar";
import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from "react-native";

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
// let store = createStore(reducer);
export default createStore(persistCombineReducers(rootPersistConfig, { toggleFavorite, setAvatar }));
