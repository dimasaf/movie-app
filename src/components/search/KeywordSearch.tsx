import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { API_ACCESS_TOKEN } from "@env";

interface SearchDataType {
  id: number;
  name: string;
}

const KeywordSearch = () => {
  const [searchData, setSearchDta] = useState<SearchDataType[]>([]);

  const getSearchMovie = (search: string) => {
    const url = `https://api.themoviedb.org/3/search/keyword?query=${search}`;
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
        setSearchDta(response.results);
      })
      .catch((errorResponse) => {
        console.error(errorResponse);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => getSearchMovie(text)}
        style={{ borderWidth: 1, padding: 16, borderRadius: 40, marginTop: 20 }}
      />

      <View>
        {searchData.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 80 }}>No data</Text>
        ) : (
          searchData.map((data) => <Text key={data.id}>{data.name}</Text>)
        )}
      </View>
    </View>
  );
};

export default KeywordSearch;
