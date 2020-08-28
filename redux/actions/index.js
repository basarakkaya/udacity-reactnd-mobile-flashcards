import * as API from "../../utils/api";
import { formatCard, formatDeck } from "../../utils/helpers";

export const GET_DECKS = "GET_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

/**
 * @description Handles getting all of the decks from AsyncStorage
 * and setting the redux store with them
 */
export function handleGetDecks() {
  return (dispatch) => {
    return API.getDecks().then((decks) => {
      dispatch(getDecks(decks));
    });
  };
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

/**
 * @description Handles adding the new deck to AsyncStorage and
 * concatenating the new deck to the redux store
 * @param {string} title  - Title of the new Deck
 */
export function handleAddDeck(title) {
  const deckObj = formatDeck(title);
  return (dispatch) => {
    return API.saveDeck(deckObj).then((deck) => {
      dispatch(addDeck(deck));
    });
  };
}

function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card,
  };
}

/**
 * @description Handles adding a new card o a specific deck within AsyncStorage
 * and concatenating the new card to that deck within redux store
 * @param {string} deckId - ID of the Deck that the Card is wanted to be added
 * @param {string} question  - Question of the Card
 * @param {string} answer - Answer of the Card
 */
export function handleAddCard(deckId, question, answer) {
  const cardObj = formatCard(question, answer);
  return (dispatch) => {
    return API.saveCardToDeck(deckId, cardObj).then((card) => {
      dispatch(addCardToDeck(deckId, card));
    });
  };
}
