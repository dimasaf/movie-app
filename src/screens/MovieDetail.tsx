import { View, Text, Button } from "react-native";
import React from "react";

const MovieDetail = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Button
        title="onDetail"
        onPress={() => navigation.navigate("MovieList")}
      />
    </View>
  );
};

export default MovieDetail;
