import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { boardData } from "../data/board";
import PlayingBoardCard from "./PlayingBoardCard";

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    justifyContent: "space-between",
    backgroundColor: "#EEE",
    flex: 1,
    borderColor: "#E5D283",
    borderWidth: 8,
    borderRadius: 2,
  },
});

const RenderRow = ({ item: cardsRow, index, onPressBoardCard }) => (
  <View style={styles.cardsRow} key={index}>
    {cardsRow.map((card, cardIndex) => (
      <PlayingBoardCard
        item={card}
        path={`${index}_${cardIndex}`}
        key={`${index}_${cardIndex}`}
        onPress={onPressBoardCard}
      />
    ))}
  </View>
);

const PlayingBoard = ({ onPressBoardCard, isMyTurn }) => {
  return (
    <FlatList
      data={boardData}
      renderItem={({ item, index }) => (
        <RenderRow
          item={item}
          index={index}
          onPressBoardCard={onPressBoardCard}
        />
      )}
      contentContainerStyle={[
        styles.contentContainer,
        { borderColor: isMyTurn ? "#A0D995" : "#E5D283" },
      ]}
    />
  );
};

export default PlayingBoard;
