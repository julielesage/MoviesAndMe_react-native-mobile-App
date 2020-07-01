import React from "react";
import FilmList from "../components/FilmList";
import { View } from "react-native";
import { connect } from "react-redux";

class Favorites extends React.Component {
  render() {
    console.log(this.props.favoriteFilms);
    console.log("done");
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <FilmList
          films={this.props.favoriteFilms}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Favorites);
