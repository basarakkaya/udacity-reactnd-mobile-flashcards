import { AsyncStorage } from "react-native";

const STORAGE_KEY = "MobileFlashcards:Decks";

/**
 * @description Returns all of the decks
 */
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((res) => {
    return JSON.parse(res);
  });
}

/**
 * @description Creates a new deck with a specific title
 * @param {object} deck - Deck Object
 */
export function saveDeck(deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck)).then(
    () => deck
  );
}

/**
 * @description Adds a card to a specific deck
 * @param {string} deckId - Title of the deck which is added a card
 * @param {object} card - Card object, which contains the attributes "question" and "answer"
 */
export function saveCardToDeck(deckId, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      let decks = JSON.parse(results);

      AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
          ...decks,
          [deckId]: {
            ...decks[deckId],
            questions: [...decks[deckId].questions, card],
          },
        })
      );
    })
    .then(() => card);
}
