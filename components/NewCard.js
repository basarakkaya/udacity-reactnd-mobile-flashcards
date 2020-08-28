import React, { Component } from "react";
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { handleAddCard } from "../redux/actions";
import { CommonActions } from "@react-navigation/native";
import { white, purple, gray } from "../utils/colors";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  setTitle = (deckId) => {
    if (!deckId) return;

    this.props.navigation.setOptions({
      title: `New Card - ${deckId}`,
    });
  };

  submit = () => {
    const { dispatch, deckId } = this.props;
    const { question, answer } = this.state;

    dispatch(handleAddCard(deckId, question, answer));
    this.setState({ question: "", answer: "" });
    this.toDeck();
  };

  toDeck = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
  };

  render() {
    const { question, answer } = this.state;
    this.setTitle(this.props.deckId);

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>New Card</Text>
        <TextInput
          style={[styles.input, styles.question]}
          onChangeText={(text) => this.setState({ question: text })}
          value={question}
          placeholder="Question"
        />
        <TextInput
          style={[styles.input, styles.answer]}
          onChangeText={(text) => this.setState({ answer: text })}
          value={answer}
          placeholder="Answer"
        />
        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 8,
    fontSize: 18,
  },
  question: {
    marginTop: 24,
    marginBottom: 4,
  },
  answer: {
    marginTop: 4,
    marginBottom: 24,
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

export default connect((decks, { route }) => ({
  deckId: route.params.deckId,
}))(NewCard);
