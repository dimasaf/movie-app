import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { API_ACCESS_TOKEN } from "@env";

interface CategoryList {
  id: number;
  name: string;
}

interface MovieGenre {
  adult: boolean;
  id: 538831;
  original_title: string;
  poster_path: "/arpocKRbENtPc3ywxlzG7XVTPeG.jpg";
}

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
  const [movieGenre, setDataMovieGenre] = useState<MovieGenre[]>([]);

  const getCategoryList = () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list";
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
        setCategoryList(response.genres);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  const getBygenre = (id: number) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar`;
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
        setDataMovieGenre(response.results);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  console.log("movieGenre:", movieGenre);

  return (
    <View>
      {
        <View>
          {movieGenre?.length === 0 ? (
            categoryList.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 80 }}>
                No data
              </Text>
            ) : (
              categoryList.map((category) => {
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => getBygenre(category.id)}
                    style={{
                      padding: 10,
                      flexWrap: "wrap",
                      flexDirection: "row",
                    }}
                  >
                    <Text>{category.name}</Text>
                  </TouchableOpacity>
                );
              })
            )
          ) : null}

          {movieGenre?.map((genre) => {
            return (
              <View key={genre.id}>
                <Text>{genre.original_title}</Text>
              </View>
            );
          })}
        </View>
      }
    </View>
  );
};

export default CategorySearch;
