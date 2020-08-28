import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { purple, white, gray } from "../utils/colors";

class DeckView extends Component {
  setTitle = (deckId) => {
    if (!deckId) return;

    this.props.navigation.setOptions({
      title: `Deck - ${deckId}`,
    });
  };

  render() {
    const { deckId, deck } = this.props;
    this.setTitle(deckId);

    return (
      <View style={styles.container}>
        <Text style={styles.deckName}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} Cards</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NewCard", { deckId })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("QuizView", { deckId })}
          style={[
            styles.button,
            deck.questions.length === 0 ? styles.disabled : "",
          ]}
          disabled={deck.questions.length === 0}
        >
          <Text style={styles.buttonText}>Take a Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  deckName: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 18,
    textAlign: "center",
    color: gray,
    marginBottom: 16,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
    margin: 8,
  },
  buttonText: {
    color: white,
    fontSize: 20,
    alignSelf: "center",
  },
  disabled: {
    opacity: 0.7,
  },
});

function mapStateToProps(decks, { route }) {
  return {
    deck: decks[route.params.deckId],
    deckId: route.params.deckId,
  };
}

export default connect(mapStateToProps)(DeckView);
