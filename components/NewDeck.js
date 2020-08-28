import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { handleAddDeck } from "../redux/actions";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { white, gray, purple } from "../utils/colors";

class NewDeck extends Component {
  state = {
    value: "",
  };

  submit = () => {
    const { dispatch } = this.props;
    const { value } = this.state;

    dispatch(handleAddDeck(value));
    this.setState({ value: "" });
    this.toDecks();
  };

  toDecks = () => {
    this.props.navigation.dispatch(
      CommonActions.goBack({
        key: "Decks",
      })
    );
  };

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Deck</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ value: text })}
          value={value}
          placeholder="Deck Title"
        />
        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  input: {
    marginTop: 24,
    marginBottom: 24,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 8,
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
  },
  buttonText: {
    color: white,
    fontSize: 20,
    alignSelf: "center",
  },
});

export default connect((decks) => ({
  decks,
}))(NewDeck);
