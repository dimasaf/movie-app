import React from "react";
import { ScrollView, StyleSheet, StatusBar, View } from "react-native";
import type { MovieListProps } from "../types/app";
import MovieList from "../components/movies/MovieList";

const movieLists: MovieListProps[] = [
  {
    title: "Now Playing in Theater",
    path: "movie/now_playing?language=en-US&page=1",
    coverType: "backdrop",
  },
  {
    title: "Upcoming Movies",
    path: "movie/upcoming?language=en-US&page=1",
    coverType: "poster",
  },
  {
    title: "Top Rated Movies",
    path: "movie/top_rated?language=en-US&page=1",
    coverType: "poster",
  },
  {
    title: "Popular Movies",
    path: "movie/popular?language=en-US&page=1",
    coverType: "poster",
  },
];

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {movieLists.map((movie) => (
          <MovieList
            title={movie.title}
            path={movie.path}
            coverType={movie.coverType}
            key={movie.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
});
