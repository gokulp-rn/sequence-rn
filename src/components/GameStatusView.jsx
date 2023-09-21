import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import PlayingCard from "./PlayingCard";
import { GameContext } from "../contexts/GameContext";
import { TEAM_BLUE, TEAM_RED } from "../constants";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    marginTop: 16,
    borderColor: "#E5D283",
    borderWidth: 4,
    borderRadius: 2,
  },
  round: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  roundContainer: {
    alignItems: "center",
  },
  active: {
    borderWidth: 3,
    borderColor: "#A0D995",
  },
});

const GameStatusView = ({ team, currentPlayer }) => {
  const isUserRed = team === TEAM_RED;
  const isUserCurrentPlayer = currentPlayer === team;
  return (
    <View style={styles.container}>
      <View style={styles.roundContainer}>
        <View
          style={[
            styles.round,
            { backgroundColor: isUserRed ? "#D71313" : "#0D1282" },
            isUserCurrentPlayer && styles.active,
          ]}
        />
        <Text>You</Text>
      </View>
      <View style={styles.roundContainer}>
        <View
          style={[
            styles.round,
            { backgroundColor: !isUserRed ? "#D71313" : "#0D1282" },
            !isUserCurrentPlayer && styles.active,
          ]}
        />
        <Text>Opponent</Text>
      </View>
    </View>
  );
};

export default GameStatusView;
