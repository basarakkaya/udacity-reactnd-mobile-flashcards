import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { Foundation } from "@expo/vector-icons";
import Deck from "./Deck";
import { handleGetDecks } from "../redux/actions";

class DecksList extends Component {
  renderItem = ({ item }) => {
    const { deckId, deck } = item;

    return (
      <Deck
        deck={deck}
        deckId={deckId}
        onPress={() => this.props.navigation.navigate("DeckView", { deckId })}
      />
    );
  };

  componentDidMount() {
    this.props.dispatch(handleGetDecks());
  }

  render() {
    const { decks } = this.props;

    if (!Object.keys(decks).length) {
      return (
        <View style={styles.center}>
          <Foundation name="alert" size={50} />
          <Text>You don't have any decks. Please create one!</Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={Object.keys(decks).map((deckId) => ({
            deckId,
            deck: decks[deckId],
          }))}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.deckId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});

const mapStateToProps = (decks) => ({ decks });

export default connect(mapStateToProps)(DecksList);
