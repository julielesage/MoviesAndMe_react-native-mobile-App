import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { getImageFromAPI } from "../API/TMDBApi";
import FadeIn from "../animations/FadeIn";

// to use useNavigation >> function component is mandatory
const FilmItem = ({ film, isFavoriteFilm }) => {
  const navigation = useNavigation();

  const displayHeart = () => {
    if (isFavoriteFilm)
      return (
        <Image
          source={require("../assets/ic_favorite.png")}
          style={styles.heart}
        />
      );
  };

  return (
    <FadeIn>
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => navigation.navigate("Film Details", { filmID: film.id })}
      >
        <Image
          style={styles.image}
          source={{ uri: getImageFromAPI(film.poster_path) }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {displayHeart()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
};

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  heart: {
    width: 30,
    height: 30,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    // permet de faire passer le texte à la ligne si trop long :
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

export default FilmItem;
