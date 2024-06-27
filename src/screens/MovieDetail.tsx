import { View, Button } from "react-native";
import React from "react";

const MovieDetail = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Button title="go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MovieDetail;
