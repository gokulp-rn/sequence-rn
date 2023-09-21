import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PlayingCard from "./PlayingCard";
import { GameContext } from "../contexts/GameContext";
import Coin from "./Coin";

const styles = StyleSheet.create({});

const PlayingBoardCard = ({ item, path, onPress }) => {
  const [isLastPlayedCard, setIsLastPlayedCard] = useState(false);
  const { boardMapStatus, currentCard, userDeck } = useContext(GameContext);

  const occupiedCoin = boardMapStatus && boardMapStatus[path]?.occupiedCoin;
  const isCurrentCardSpace = !occupiedCoin && item === currentCard;
  const isCardInDeck = !occupiedCoin && userDeck?.includes(item);

  useEffect(() => {
    if (occupiedCoin && occupiedCoin !== "all") {
      setIsLastPlayedCard(true);
      setTimeout(() => {
        setIsLastPlayedCard(false);
      }, 5000);
    }
  }, [occupiedCoin]);

  const getCardBgColor = () => {
    switch (true) {
      case isLastPlayedCard:
        return "#FF9F29";
      case isCurrentCardSpace:
        return "#A0D995";
      case isCardInDeck:
        return "#BEF0CB";
      default:
        return "#FFFFFF";
    }
  };
  const coin = boardMapStatus?.[path]?.occupiedCoin;
  const isCornerCoin = coin === "all";
  const showCoin = !isCornerCoin && coin;

  const onPressBoardCard = () => {
    onPress({
      card: item,
      path,
    });
  };

  return (
    <View>
      <PlayingCard
        item={item}
        cardBgColor={getCardBgColor()}
        onPress={onPressBoardCard}
      />
      {showCoin && <Coin color={coin === "blue" ? "#0D1282" : "#D71313"} />}
    </View>
  );
};

export default PlayingBoardCard;
