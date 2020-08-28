import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { purple, white, red, green } from "../utils/colors";

function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

class Card extends Component {
  state = {
    showAnswer: false,
  };

  flipCard = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer,
    }));
  };

  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      this.setState({
        showAnswer: false,
      });
    }
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>
          {this.state.showAnswer ? this.props.answer : this.props.question}
        </Text>
        <TextButton onPress={this.flipCard}>
          <Text>{this.state.showAnswer ? "See Question" : "See Answer"}</Text>
        </TextButton>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.props.onCorrect}
            style={[styles.button, styles.correct]}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onIncorrect}
            style={[styles.button, styles.incorrect]}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  cardText: {
    fontSize: 24,
    alignSelf: "center",
  },
  buttonContainer: {},
  button: {
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
    marginBottom: 4,
    marginTop: 4,
  },
  buttonText: {
    alignSelf: "center",
    color: white,
    fontSize: 20,
  },
  correct: {
    backgroundColor: green,
  },
  incorrect: {
    backgroundColor: red,
  },
  reset: {
    textAlign: "center",
    color: purple,
  },
});

export default Card;
