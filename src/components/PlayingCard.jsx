import React from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { getCardColor } from "../utils/cardUtil";
const { fontScale } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    margin: 2,
  },
  card: {
    fontSize: 50 / fontScale,
    lineHeight: 55/ fontScale,
    marginBottom: -14,
  },
});

const PlayingCard = ({ item, cardBgColor, onPress }) => {
  const cardColor = getCardColor(item);

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container, { backgroundColor: cardBgColor }]}>
        <Text style={[styles.card, { color: cardColor }]}>{item}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default PlayingCard;
