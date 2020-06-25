// Components/Search.js

import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import FilmItem from "../components/FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

// sous React les components qui affiche des éléments graphiques à l'écran se présentent sous la forme d'une classe
class Search extends React.Component {
  // states toujours un objet global qui prend l'ensemble utile pour le component
  constructor(props) {
    super(props);
    // variables de classe
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    // tous les states ? no sinon trop de Render : veréfier si elle est utilisée dans le render avant si pas affichée, pas besoin
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  /* GET DATA */
  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          // ici on doit concatener les premiers resultats-tableau avec les suivants
          // comme films: this.state.films.concat(data.results)
          // on copie this.state.films, et on y ajoute la copie de data.result :
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchFilms() {
    //effacer la recherche précédente avant
    this.page = 0;
    this.totalPages = 0;
    // setState(updater[, callback]) permet d'appliquer une fonction, une fois que le setState(qui est asynchrone) est effectué :
    this.setState(
      {
        films: [],
      },
      () => {
        this._loadFilms();
      }
    );
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  //la méthode render() retourne un élément graphique:
  render() {
    return (
      // sans JSX :
      // React.createElement(View, {},
      //   React.createElement(TextInput, {placeholder: "titre du film"}),
      //   React.createElement(Button, {title : "Rechercher", onPress={() => {}}})
      // );
      <View style={styles.main_container}>
        {/* On ne peut styliser qu'un component react native */}
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          // ajouter la possibilité de rechercher en tapant sur 'entrer' :
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
          // On va définir  onEndReachedThreshold  à  0.5   pour que l'évènement  onReachEnd  se déclenche quand il ne reste plus qu'une moitié de longueur de notre FlatList à afficher:
          onEndReachedThreshold={0.5}
          // http://api.themoviedb.org/3/search/movie?api_key=VOTRE_TOKEN_ICI&language=fr&query=Star render :
          // {
          //   page: 1,
          //   total_results: 1981,
          //   total_pages: 100,
          //   results: [
          //       {...}
          //   ]
          // }
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
        />
        {/* fonction loading tout à la fin pour etre sur que tout s'est affiché : */}
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
