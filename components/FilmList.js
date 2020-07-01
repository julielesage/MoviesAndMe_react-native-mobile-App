import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import FilmItem from "./FilmItem";

class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        // rajoute une autre data pour prendre en compte les favoris ET la BDD movie, et surtout s'updater si l'une des data change, on aurait pu connecter le store redux favoris à FilmItem mais c'est pas optimisé ca appelle redux des milliers de fois à chaque FilmItem...
        extraData={this.props.favoriteFilms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            isFavoriteFilm={
              this.props.favoriteFilms.findIndex(
                (film) => film.id === item.id
              ) !== -1
                ? true
                : false
            }
          />
        )}
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
          if (
            !this.props.favoriteList &&
            this.props.page < this.props.totalPages
          ) {
            //problem ici avec undefined searchText: loadfilms est dans les props du component FlatList mais il appelle le searchText des props du component Search avec this, et this = FilmList donc ca crash si on fait défiler longtemps ==> il faut faire du data-binding dans la class (ou du useCallback dans les hooks)
            // On ajoute this._loadFilms = this._loadFilms.bind(this) dans Search pour associer loadFilm de <FilmList /> à SearchText de <Search />
            this.props.loadFilms();
          }
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(FilmList);
