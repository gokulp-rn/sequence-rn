import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import PlayingCard from "./PlayingCard";
import { GameContext } from "../contexts/GameContext";
import { isOneEyedJack, isTwoEyedJack } from "../utils/cardUtil";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26577C",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginTop: 16,
    borderColor: "#E5D283",
    borderWidth: 4,
    borderRadius: 2,
  },
  card: {
    fontSize: 62,
    lineHeight: 68,
    marginBottom: -14,
  },
  helperText:{
    paddingTop: 2,
    alignItems: 'center'
  }
});

const UserCardDeck = ({ deck, onPress }) => {
  const { currentCard } = useContext(GameContext);

  return (
    <View>
      <View style={styles.container}>
        {deck?.map((card, cardIndex) => {
          const isCardSelected = currentCard === card;
          return (
            <PlayingCard
              item={card}
              key={cardIndex.toString()}
              cardBgColor={isCardSelected ? "#A0D995" : "#FFF"}
              onPress={() =>
                onPress({
                  card,
                  path: cardIndex.toString(),
                })
              }
            />
          );
        })}
      </View>
      <View style={styles.helperText}>
        {isOneEyedJack(currentCard) && <Text>One Eyed Jack</Text>}
        {isTwoEyedJack(currentCard) && <Text>Two Eyed Jack</Text>}
        </View>
    </View>
  );
};

export default UserCardDeck;
