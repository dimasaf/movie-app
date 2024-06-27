/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { API_ACCESS_TOKEN } from "@env";
import { Movie } from "../types/app";
import MovieItem from "../components/movies/MovieItem";
import { coverImageSize } from "../components/movies/MovieList";

interface MovieDetailType {
  original_title: string;
  overview: string;
}

const MovieDetail = ({ route }: { route: RouteProp<any> }) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetailType>({
    original_title: "-",
    overview: "-",
  });
  const [movieRecommendation, setMovieRecommendation] = useState<Movie[]>([]);

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
        setMovieDetail(response);
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

  useEffect(() => {
    getMovieDetail();
    getMovieRecommendation();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ marginBottom: 4, fontSize: 24 }}>
        {movieDetail.original_title}
      </Text>
      <Text style={{ marginBottom: 50 }}>{movieDetail.overview}</Text>

      <Text>Recomendation</Text>
      <FlatList
        style={{
          flex: 1,
        }}
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
    </View>
  );
};

export default MovieDetail;
