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
  SafeAreaView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import FilmList from "../components/FilmList";
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
    //data-binding
    this._loadFilms = this._loadFilms.bind(this);
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
          // console.log(this.state.films); OK
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
      // <SafeAreaView
      //   style={
      //     Platform.OS === "android" ? { marginTop: 20, flex: 1 } : { flex: 1 }
      //   }
      // >
      <SafeAreaView style={styles.main_container}>
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
          <FilmList
            films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
            page={this.page}
            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
          />

          {/* fonction loading tout à la fin pour etre sur que tout s'est affiché : */}
          {this._displayLoading()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
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
