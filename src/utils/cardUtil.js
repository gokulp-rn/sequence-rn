import { CLUBS, DIAMONDS, HEARTS, SPADES } from "../constants";
import { clubs, diamonds, hearts, spades } from "../data/cards";

export const getCardType = (card) => {
  const cardCharCode = card.charCodeAt(1);

  switch (true) {
    case cardCharCode >= 56514 && cardCharCode <= 56526:
      return DIAMONDS;
    case cardCharCode >= 56482 && cardCharCode <= 56494:
      return SPADES;
    case cardCharCode >= 56498 && cardCharCode <= 56510:
      return HEARTS;
    case cardCharCode >= 56530 && cardCharCode <= 56542:
      return CLUBS;
  }
};

export const getCardColorByType = (cardType) => {
  switch (cardType) {
    default:
    case HEARTS:
    case DIAMONDS:
      return "#F00";
    case SPADES:
    case CLUBS:
      return "#000";
  }
};

export const getCardColor = (card) => {
  return getCardColorByType(getCardType(card));
};

export const isOneEyedJack = (card)=>{
  return [spades.J, hearts.J].includes(card)
}

export const isTwoEyedJack = (card)=>{
  return [clubs.J, diamonds.J].includes(card)
}
