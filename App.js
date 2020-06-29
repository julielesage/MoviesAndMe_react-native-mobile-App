import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "./containers/Search";
import FilmDetails from "./containers/FilmDetails";

// Pour utiliser Redux :
// npm install --save redux
// npm install --save react-redux
// npm install
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Search">{() => <Search />}</Stack.Screen>

            <Stack.Screen name="Film Details">
              {(props) => <FilmDetails {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
