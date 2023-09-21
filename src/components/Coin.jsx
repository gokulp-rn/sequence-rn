import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { trumps } from "../data/cards";
const { fontScale } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -2,
    bottom: 0,
    alignItems: "center",
  },
  card: {
    fontSize: 50 / fontScale,
    lineHeight: 56 / fontScale,
    marginBottom: -14,
  },
});

const Coin = ({ color }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <Text style={[styles.card, { color }]}>{trumps.coin}</Text>
    </View>
  );
};

export default Coin;
