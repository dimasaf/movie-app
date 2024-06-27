import { View, Text, Button } from "react-native";
import React from "react";
import { API_URL, API_ACCESS_TOKEN } from "@env"; // Ditambahkan

const MovieList = ({ navigation }: { navigation: any }) => {
  function fetchDataDetail() {
    if (API_URL == null || API_ACCESS_TOKEN.length == null) {
      throw new Error("ENV not found");
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((response) => {
        console.log("response >", response);
      })
      .catch((err) => console.error);
  }

  return (
    <View>
      <Button
        title="onDetail"
        onPress={() => navigation.navigate("MovieDetail")}
      />
      <Button title="fetch Data" onPress={fetchDataDetail} />
    </View>
  );
};

export default MovieList;
