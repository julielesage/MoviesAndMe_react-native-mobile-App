import React from "react";
import FilmList from "../components/FilmList";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Avatar from "../components/Avatar";

class Favorites extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <FilmList
          films={this.props.favoriteFilms}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar_container: {
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.toggleFavorite.favoriteFilms,
  };
};

export default connect(mapStateToProps)(Favorites);
