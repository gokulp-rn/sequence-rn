import { StyleSheet, View, Dimensions } from "react-native";
import PlayingBoard from "../components/PlayingBoard";
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  Snackbar,
  Text,
} from "react-native-paper";
import { GameContext } from "../contexts/GameContext";
import { getBoardMap } from "../utils/boardUtil";
import { useState, useEffect } from "react";
import UserCardDeck from "../components/UserCardDeck";
import { cardDeck } from "../data/board";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { TEAM_BLUE, TEAM_RED } from "../constants";
import GameStatusView from "../components/GameStatusView";
import * as Application from "expo-application";
import { isOneEyedJack, isTwoEyedJack } from "../utils/cardUtil";

const firebaseConfig = {
  apiKey: "AIzaSyCeFc5e8CTbkqM8P5xBNWDE8lJhJPasYrQ",
  authDomain: "sequence-rn.firebaseapp.com",
  projectId: "sequence-rn",
  storageBucket: "sequence-rn.appspot.com",
  messagingSenderId: "644562031751",
  appId: "1:644562031751:web:719960c523988a7e199422",
};
initializeApp(firebaseConfig);

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const deviceId = Application.androidId;

export default function Home() {
  const [possibleBoardPatterns, setPossibleBoardPatterns] = useState();
  const [newGameDialogVisible, setNewGameDialogVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState();
  const [team, setTeam] = useState();
  const [snackBarMessage, setSnackBarMessage] = useState();
  const [gameData, setGameData] = useState();

  const userDeck = gameData?.userDeck?.[team];
  const adminData = gameData?.adminData;
  const remainingDeck = gameData?.remainingDeck;
  const currentPlayer = gameData?.nextPlayer;
  const boardMapStatus = gameData?.boardStatus;

  const isRedTeam = team === TEAM_RED;
  const opponent = isRedTeam ? TEAM_BLUE : TEAM_RED;
  const isMyTurn = currentPlayer && currentPlayer === team;

  useEffect(() => {
    listenFirebaseDbChange();
  }, []);

  const listenFirebaseDbChange = () => {
    const db = getDatabase();
    const gameRef = ref(db, "game_0");

    onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      const adminData = gameData?.adminData;
      const isAdmin = adminData?.id === deviceId;
      const adminTeam = adminData?.team;
      const team = isAdmin
        ? adminTeam
        : adminTeam === TEAM_RED
        ? TEAM_BLUE
        : TEAM_RED;

      setTeam(team);
      setGameData(gameData);
    });
  };

  const createBoard = (adminTeam) => {
    const boardMap = getBoardMap(true);
    const opponent = adminTeam === TEAM_RED ? TEAM_BLUE : TEAM_RED;
    setPossibleBoardPatterns(boardMap.possibleBoardPatterns);
    const deck = boardMap.cardDeck;
    const initialUserDeck = deck
      .splice(0, 7)
      .map((cardIndex) => cardDeck[cardIndex]);

    const initialOpponentDeck = deck
      .splice(0, 7)
      .map((cardIndex) => cardDeck[cardIndex]);

    updateFirebaseData({
      boardStatus: boardMap.boardMapStatus,
      remainingDeck: boardMap.cardDeck,
      nextPlayer: opponent,
      userDeck: {
        [adminTeam]: initialUserDeck,
        [opponent]: initialOpponentDeck,
      },
      adminData: { id: deviceId, team: adminTeam },
    });
  };

  const updateFirebaseData = (gData) => {
    const db = getDatabase();
    return set(ref(db, "game_0"), gData);
  };

  const createNewGame = (team) => {
    setTeam(team);
    createBoard(team);
    setNewGameDialogVisible(false);
  };

  const handleDeckCardOnPress = ({ card }) => {
    setCurrentCard(card);
  };

  const handleBoardCardPress = ({ card, path }) => {
    if (isMyTurn) {
      let newBoardMapStatus = null,
        nextUserDeckCard,
        newRemainingDeck,
        newUserDeck;

      if (isOneEyedJack(currentCard)) {
        const isOpponentSpace =
          boardMapStatus && boardMapStatus[path]?.occupiedCoin === opponent;
        if (isOpponentSpace) {
          newBoardMapStatus = boardMapStatus;
          newBoardMapStatus[path] = {
            occupiedCoin: "",
          };
        } else {
          setSnackBarMessage("You can't use one eye jack here");
        }
      } else if (isTwoEyedJack(currentCard)) {
        const isAvailableSpace =
          boardMapStatus && !boardMapStatus[path]?.occupiedCoin;
        if (isAvailableSpace) {
          newBoardMapStatus = boardMapStatus;
          newBoardMapStatus[path] = {
            occupiedCoin: team,
          };
        } else {
          setSnackBarMessage("You can't use two eye jack here");
        }
      } else {
        const isAvailableSpace =
          boardMapStatus &&
          !boardMapStatus[path]?.occupiedCoin &&
          card === currentCard;

        if (isAvailableSpace) {
          newBoardMapStatus = boardMapStatus;
          newBoardMapStatus[path] = {
            occupiedCoin: team,
          };
        }
      }

      if (newBoardMapStatus) {
        newRemainingDeck = remainingDeck;
        nextUserDeckCard = newRemainingDeck.shift();
        const usedCardIndex = userDeck?.findIndex(
          (uCard) => uCard === currentCard
        );
        userDeck?.splice(usedCardIndex, 1);
        newUserDeck = [...userDeck, cardDeck[nextUserDeckCard]];

        const newGameData = {
          ...gameData,
          boardStatus: newBoardMapStatus,
          remainingDeck,
          nextPlayer: opponent,
          adminData,
          userDeck: {
            ...gameData.userDeck,
            [team]: newUserDeck,
          },
        };

        updateFirebaseData(newGameData);
        setCurrentCard(null);
      }
    } else if (!currentPlayer) {
      setSnackBarMessage("Please start a new game");
    } else {
      setSnackBarMessage("Wait for opponent's move");
    }
  };

  return (
    <GameContext.Provider
      value={{
        userDeck,
        boardMapStatus,
        possibleBoardPatterns,
        setPossibleBoardPatterns,
        currentCard,
        team,
      }}
    >
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Sequence" />
          <Appbar.Action
            icon="plus"
            onPress={() => setNewGameDialogVisible(true)}
          />
        </Appbar.Header>
        <View style={styles.board}>
          <PlayingBoard onPressBoardCard={handleBoardCardPress} isMyTurn={isMyTurn} />
        </View>
        {!!currentPlayer && (
          <GameStatusView team={team} currentPlayer={currentPlayer} />
        )}
        <View style={styles.deck}>
          {userDeck?.length && <UserCardDeck deck={userDeck} onPress={handleDeckCardOnPress} />}
        </View>
        <Portal>
          <Dialog
            visible={newGameDialogVisible}
            onDismiss={() => setNewGameDialogVisible(false)}
          >
            <Dialog.Title style={styles.title}>New Game</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Select the color</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => createNewGame(TEAM_BLUE)}
                textColor="#0D1282"
              >
                Blue
              </Button>
              <Button
                onPress={() => createNewGame(TEAM_RED)}
                textColor="#D71313"
              >
                Red
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
          visible={!!snackBarMessage}
          onDismiss={() => setSnackBarMessage(null)}
          action={{
            label: "Dismiss",
            onPress: () => setSnackBarMessage(null),
          }}
        >
          {snackBarMessage}
        </Snackbar>
      </View>
    </GameContext.Provider>
  );
}

const styles = StyleSheet.create({
  board: {
    height: SCREEN_HEIGHT - 320,
    width: SCREEN_WIDTH - 16,
  },
  container: {
    padding: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  deck: {
    height: 300,
    width: SCREEN_WIDTH - 16,
  },
  team: {},
});
