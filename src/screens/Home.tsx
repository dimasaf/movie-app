import { API_ACCESS_TOKEN, API_URL } from "@env";
import React from "react";
import { Button, View } from "react-native";

const Home = ({ navigation }: { navigation: any }) => {
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
      .catch(() => console.error);
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

export default Home;
