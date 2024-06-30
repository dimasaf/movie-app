import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import KeywordSearch from "../components/search/KeywordSearch";
import CategorySearch from "../components/search/CategorySearch";

const BUTTON_TAB = ["keyword", "category"];

const Search = () => {
  const [selectedBar, setSelectedbar] = useState("keyword");

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {BUTTON_TAB.map((item: string, index: number) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.9}
              style={{
                ...styles.topBar,
                backgroundColor: item === selectedBar ? "#8978A4" : "#C0B4D5",
                borderTopLeftRadius: index === 0 ? 100 : 0,
                borderBottomLeftRadius: index === 0 ? 100 : 0,
                borderTopRightRadius: index === 1 ? 100 : 0,
                borderBottomRightRadius: index === 1 ? 100 : 0,
              }}
              onPress={() => {
                setSelectedbar(item);
              }}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedBar === "keyword" ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  topBar: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 60,
  },
  topBarLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
    textTransform: "capitalize",
  },
});
