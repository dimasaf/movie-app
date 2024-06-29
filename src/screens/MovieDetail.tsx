/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { API_ACCESS_TOKEN } from "@env";
import { Movie } from "../types/app";
import MovieItem from "../components/movies/MovieItem";
import { coverImageSize } from "../components/movies/MovieList";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieDetail = ({ route }: { route: RouteProp<any> }) => {
  const [movieDetail, setMovieDetail] = useState<Movie | null>();
  const [movieRecommendation, setMovieRecommendation] = useState<Movie[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${route.params?.id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetail(response as Movie);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  const getMovieRecommendation = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${route.params?.id}/recommendations`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieRecommendation(response.results);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      console.log(initialData);

      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      const parsedDataLocalStorage: Movie[] = JSON.parse(initialData as string);
      console.log("initialdata, id", parsedDataLocalStorage, id);
      // 1. filter data by id
      const removedData = parsedDataLocalStorage.filter(
        (movie) => movie.id !== id
      );
      console.log("removedData", removedData);

      // 2. set localStoragenya
      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(removedData));

      // 3. jangan lupa setFavorite jadi false
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFavorite = async (id: number) => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        "@FavoriteList"
      );
      const parsedData: Movie[] = JSON.parse(initialData as string);

      if (initialData !== null) {
        const checkFavorite = parsedData.find((movie) => movie.id === id);
        if (checkFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieDetail();
    getMovieRecommendation();
  }, []);

  useEffect(() => {
    checkIsFavorite(movieDetail?.id as number);
  }, [movieDetail]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ marginBottom: 4, fontSize: 24 }}>
        {movieDetail?.original_title}
      </Text>
      <Text style={{ marginBottom: 50 }}>{movieDetail?.overview}</Text>

      <Text>Recomendation</Text>
      <FlatList
        style={styles.movieList}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movieRecommendation}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize["poster"]}
            coverType={"poster"}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() =>
            !isFavorite
              ? addFavorite(movieDetail as Movie)
              : removeFavorite(movieDetail?.id as number)
          }
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={60}
            color={"blue"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
    marginBottom: 20,
    maxHeight: 160,
  },
});
