import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// to use redux, à connecter avec l'export default :
import { connect } from "react-redux";

import { getFilmDetailFromApi, getImageFromAPI } from "../API/TMDBApi";
// npm install --save moment
import moment from "moment";
// npm install --save numeral
import numeral from "numeral";

const FilmDetails = ({ route, navigation, dispatch, favoriteFilms }) => {
  // rajouter (props) et {...props} sur le screen dans App :
  const { filmID } = route.params;
  // si props = l'objet entier {film},
  // Object.entries = array de tab de paires : [key, value]
  // const keysTab = Object.entries(film);
  // et on affiche {keysTab.map((film, i) => {
  //   return (
  //     <View key={i}>
  //       <Text>
  //         {film[0]} : {film[1]}
  //       </Text>
  //     </View>
  //   );
  // })}
  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState();

  // componentDidMount() {}:
  useEffect(() => {
    // ici async fetchData + await response est impossible car getFilmDetailFromApi est async avec then/catch already
    getFilmDetailFromApi(filmID).then((data) => {
      //console.log("data ===> ", data);
      setFilm(data);
    });

    setIsLoading(false);
  }, []);

  console.log(favoriteFilms);
  const displayLoading = () => {
    if (isLoading)
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
  };

  const toggleFavorite = () => {
    const action = {
      type: "TOGGLE_FAVORITE",
      value: film,
    };
    // on fait passer l'action au store Redux avec la fonction dispatch, le reducer le reçoit dans configure store avec toggleFavorite
    dispatch(action);
    // console.log(favoriteFilms); OK
  };

  const displayFilm = () => {
    if (!isLoading && film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromAPI(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            title="Favori"
            onPress={() => toggleFavorite()}
          >
            {displayFavoriteIcon()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{" "}
            {film.genres
              .map(function (genre) {
                return genre.name;
              })
              .join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{" "}
            {film.production_companies
              .map(function (company) {
                return company.name;
              })
              .join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  };

  const displayFavoriteIcon = () => {
    var sourceImage = require("../assets/ic_favorite_border.png");
    if (favoriteFilms.findIndex((item) => item.id === film.id) !== -1)
      sourceImage = require("../assets/ic_favorite.png");
    return <Image source={sourceImage} style={styles.heart} />;
  };

  return (
    <View style={styles.main_container}>
      {displayLoading()}
      {displayFilm()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  favorite_container: {
    alignItems: "center",
  },
  heart: {
    width: 40,
    height: 40,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});
// mapper = associer les données du state global aux props du component FilmDetails:
// vraiment utile en hooks ?
const mapStateToProps = (state) => {
  // pas besoin de retourner tout le store/state :
  return {
    favoriteFilms: state.favoriteFilms,
  };
};

export default connect(mapStateToProps)(FilmDetails);
