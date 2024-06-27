import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../types/app";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const getFavoriteFromLocalStorage = async () => {
    const initialData: string | null = await AsyncStorage.getItem(
      "@FavoriteList"
    );

    const parsedData = JSON.parse(initialData as string);

    setFavoriteMovies(parsedData);
  };

  useEffect(() => {
    getFavoriteFromLocalStorage();
  }, [favoriteMovies]);

  return (
    <View>
      {favoriteMovies.map((movie) => (
        <View key={movie.id} style={{ marginBottom: 20 }}>
          <Text>{movie.original_title}</Text>
        </View>
      ))}
    </View>
  );
};

export default Favorites;
