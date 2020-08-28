import { GET_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [...state[action.deckId].questions].concat(action.card),
        },
      };
    default:
      return state;
  }
}

export default decks;
