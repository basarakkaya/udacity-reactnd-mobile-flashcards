import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { gray, white } from "../utils/colors";

export default function Deck({ deck, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deck}>
      <View>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} Cards</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deck: {
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
  title: {
    fontSize: 24,
  },
  cardCount: {
    fontSize: 16,
    color: gray,
  },
});
