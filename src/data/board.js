import { clubs, diamonds, hearts, spades, trumps } from "./cards";

export const boardData = [
  [trumps.back, spades[2], spades[3], spades[4], spades[5], spades[6],spades[7], spades[8], spades[9], trumps.back],
  [clubs[6], clubs[5],clubs[4],clubs[3], clubs[2], hearts.A, hearts.K, hearts.Q, hearts[10], spades[10]],
  [clubs[7], spades.A, diamonds[2], diamonds[3], diamonds[4], diamonds[5], diamonds[6], diamonds[7], hearts[9], spades.Q],
  [clubs[8], spades.K, clubs[6], clubs[5],clubs[4],clubs[3],clubs[2],diamonds[8],hearts[8],spades.K],
  [clubs[9], spades.Q, clubs[7],hearts[6],hearts[5], hearts[4],hearts.A, diamonds[9],hearts[7], spades.A],
  [clubs[10], spades[10],clubs[8], hearts[7], hearts[2], hearts[3], hearts.K, diamonds[10], hearts[6], diamonds[2]],
  [clubs.Q, spades[9], clubs[9], hearts[8], hearts[9],hearts[10],hearts.Q,diamonds.Q,hearts[5],diamonds[3]],
  [clubs.K, spades[8], clubs[10],clubs.Q, clubs.K, clubs.A, diamonds.A, diamonds.K, hearts[4],diamonds[4]],
  [clubs.A, spades[7], spades[6], spades[5], spades[4],spades[3], spades[2], hearts[2], hearts[3], diamonds[5]],
  [trumps.back, diamonds.A, diamonds.K, diamonds.Q, diamonds[10], diamonds[9], diamonds[8],diamonds[7],diamonds[6], trumps.back]
]

export const cardDeck = [
  ...Object.values(clubs),
  ...Object.values(diamonds),
  ...Object.values(hearts),
  ...Object.values(spades),
]